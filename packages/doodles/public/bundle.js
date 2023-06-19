(function(exports){'use strict';function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 */
function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
}
const outroing = new Set();
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        flush_render_callbacks($$.after_update);
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}/* ball/index.svelte generated by Svelte v3.59.1 */

function create_fragment$1(ctx) {
	let div1;

	return {
		c() {
			div1 = element("div");
			div1.innerHTML = `<div class="ball"></div>`;
			this.c = noop;
			attr(div1, "class", "container");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

class Ball extends SvelteElement {
	constructor(options) {
		super();
		const style = document.createElement('style');
		style.textContent = `.container{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none}.ball{width:50px;height:50px;background:red;border-radius:50%;cursor:move;animation:bounce-all-over 15s;animation-iteration-count:infinite;animation-timing-function:linear}@keyframes bounce-all-over{0%{transform:translate3d(0, 100vh, 0)}10%{transform:translate3d(5vw, 0, 0)}20%{transform:translate3d(15vw, 100vh, 0)}30%{transform:translate3d(65vw, 0, 0)}40%{transform:translate3d(100vw, 50vh, 0)}50%{transform:translate3d(75vw, 100vh, 0)}60%{transform:translate3d(25vw, 0, 0)}70%{transform:translate3d(0, 75vh, 0)}80%{transform:translate3d(10vw, 100vh, 0)}90%{transform:translate3d(35vw, 0, 0)}100%{transform:translate3d(0, 100vh, 0)}}`;
		this.shadowRoot.appendChild(style);

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			null,
			create_fragment$1,
			safe_not_equal,
			{},
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}
		}
	}
}

customElements.define("doodles-ball", Ball);/* keyboard/index.svelte generated by Svelte v3.59.1 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (55:4) {#each keys[0] as char}
function create_each_block_3(ctx) {
	let div;
	let t_value = /*char*/ ctx[9] + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "key");
			attr(div, "id", /*char*/ ctx[9]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (62:4) {#each keys[1] as char}
function create_each_block_2(ctx) {
	let div;
	let t_value = /*char*/ ctx[9] + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "key");
			attr(div, "id", /*char*/ ctx[9]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (68:4) {#each keys[2] as char}
function create_each_block_1(ctx) {
	let div;
	let t_value = /*char*/ ctx[9] + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "key");
			attr(div, "id", /*char*/ ctx[9]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (75:4) {#each keys[3] as char}
function create_each_block(ctx) {
	let div;
	let t_value = /*char*/ ctx[9] + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "key");
			attr(div, "id", /*char*/ ctx[9]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment(ctx) {
	let div10;
	let div1;
	let t0;
	let div0;
	let t2;
	let div3;
	let div2;
	let t4;
	let t5;
	let div6;
	let div4;
	let t7;
	let t8;
	let div5;
	let t10;
	let div9;
	let div7;
	let t12;
	let t13;
	let div8;
	let each_value_3 = /*keys*/ ctx[0][0];
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_3[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	let each_value_2 = /*keys*/ ctx[0][1];
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value_1 = /*keys*/ ctx[0][2];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*keys*/ ctx[0][3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div10 = element("div");
			div1 = element("div");

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].c();
			}

			t0 = space();
			div0 = element("div");
			div0.textContent = "del";
			t2 = space();
			div3 = element("div");
			div2 = element("div");
			div2.textContent = "tab";
			t4 = space();

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t5 = space();
			div6 = element("div");
			div4 = element("div");
			div4.textContent = "caps";
			t7 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t8 = space();
			div5 = element("div");
			div5.textContent = "enter";
			t10 = space();
			div9 = element("div");
			div7 = element("div");
			div7.textContent = "shift";
			t12 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t13 = space();
			div8 = element("div");
			div8.textContent = "shift";
			this.c = noop;
			attr(div0, "class", "key modifier");
			attr(div0, "id", "backspace");
			attr(div1, "class", "row");
			attr(div2, "class", "key modifier");
			attr(div2, "id", "tab");
			attr(div3, "class", "row");
			attr(div4, "class", "key modifier");
			attr(div4, "id", "capslock");
			attr(div5, "class", "key modifier");
			attr(div5, "id", "enter");
			attr(div6, "class", "row");
			attr(div7, "class", "key modifier");
			attr(div7, "id", "shift");
			attr(div8, "class", "key modifier");
			attr(div8, "id", "shift");
			attr(div9, "class", "row");
			attr(div10, "class", "keyboard");
		},
		m(target, anchor) {
			insert(target, div10, anchor);
			append(div10, div1);

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				if (each_blocks_3[i]) {
					each_blocks_3[i].m(div1, null);
				}
			}

			append(div1, t0);
			append(div1, div0);
			append(div10, t2);
			append(div10, div3);
			append(div3, div2);
			append(div3, t4);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(div3, null);
				}
			}

			append(div10, t5);
			append(div10, div6);
			append(div6, div4);
			append(div6, t7);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(div6, null);
				}
			}

			append(div6, t8);
			append(div6, div5);
			append(div10, t10);
			append(div10, div9);
			append(div9, div7);
			append(div9, t12);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div9, null);
				}
			}

			append(div9, t13);
			append(div9, div8);
		},
		p(ctx, [dirty]) {
			if (dirty & /*keys*/ 1) {
				each_value_3 = /*keys*/ ctx[0][0];
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_3(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(div1, t0);
					}
				}

				for (; i < each_blocks_3.length; i += 1) {
					each_blocks_3[i].d(1);
				}

				each_blocks_3.length = each_value_3.length;
			}

			if (dirty & /*keys*/ 1) {
				each_value_2 = /*keys*/ ctx[0][1];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_2(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(div3, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_2.length;
			}

			if (dirty & /*keys*/ 1) {
				each_value_1 = /*keys*/ ctx[0][2];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div6, t8);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*keys*/ 1) {
				each_value = /*keys*/ ctx[0][3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div9, t13);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div10);
			destroy_each(each_blocks_3, detaching);
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self) {
	const keys = ['`1234567890-=', 'qwertyuiop[]\\', "asdfghjkl;'", 'zxcvbnm,./'];
	const modifiers = ['backspace', 'tab', 'enter', 'capslock', 'enter', 'shift'];
	const allKeys = keys.flatMap(row => row.toLowerCase().split('')).concat(modifiers);
	let prev = Math.random() * allKeys.length;

	const getRandomIndex = () => {
		let randomIndex = prev;

		while (randomIndex == prev) {
			randomIndex = Math.floor(Math.random() * allKeys.length);
		}

		prev = randomIndex;
		return randomIndex;
	};

	const map = {};

	const getSelector = id => {
		if (map[id]) return map[id];

		if (id.length > 1 || 'a' <= id && 'z' >= id) {
			map[id] = `#${id}`;
		} else if ('0' <= id && '9' >= id) {
			map[id] = `#\\3${id}`;
		} else {
			map[id] = `#\\${id}`;
		}

		return map[id];
	};

	const addJiggle = () => {
		const randomIndex = getRandomIndex();
		const selector = getSelector(allKeys[randomIndex]);
		const key = document.querySelector(selector);

		key === null || key === void 0
		? void 0
		: key.classList.add('jiggle');
	};

	const removeJiggle = id => {
		const selector = getSelector(id);
		const prevKey = document.querySelector(selector);

		prevKey === null || prevKey === void 0
		? void 0
		: prevKey.classList.remove('jiggle');
	};

	onMount(() => {
		addJiggle();

		document.addEventListener('keydown', e => {
			if (allKeys[prev] == e.key.toLowerCase()) {
				removeJiggle(e.key.toLowerCase());
				addJiggle();
			}
		});
	});

	return [keys];
}

class Keyboard extends SvelteElement {
	constructor(options) {
		super();
		const style = document.createElement('style');
		style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');.keyboard{font-family:'Inter', sans-serif;font-weight:700;font-size:24px;background:#f6f6f6;border-radius:40px;padding:36px 48px;display:flex;flex-direction:column;gap:12px;text-transform:uppercase;width:1200px}.row{display:grid;gap:12px}.row:nth-of-type(1){grid-template-columns:repeat(13, 1fr) 1.67fr}.row:nth-of-type(2){grid-template-columns:1.67fr repeat(13, 1fr)}.row:nth-of-type(3){grid-template-columns:2fr repeat(11, 1fr) 1.8fr}.row:nth-of-type(4){grid-template-columns:2.5fr repeat(10, 1fr) 2.5fr}.key{display:flex;flex-direction:column;justify-content:center;text-align:center;background:#ffffff;border-radius:16px;height:65px;color:#60c1b6}.modifier{color:#868888}:global(.jiggle){animation:jiggle 0.25s infinite}@keyframes jiggle{0%{transform:translate(0, 0) rotate(0deg)}25%{transform:translate(5px, 5px) rotate(5deg)}50%{transform:translate(0, 0) rotate(0eg)}75%{transform:translate(-5px, 5px) rotate(-5deg)}100%{transform:translate(0, 0) rotate(0deg)}}@media screen and (min-width: 768px){.keyboard{transform:unset}}`;
		this.shadowRoot.appendChild(style);

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance,
			create_fragment,
			safe_not_equal,
			{},
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}
		}
	}
}

customElements.define("doodles-keyboard", Keyboard);exports.Ball=Ball;exports.Keyboard=Keyboard;return exports;})({});