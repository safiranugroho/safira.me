<script lang="ts">
  import { onMount } from 'svelte';

  const keys = ['`1234567890-=', 'qwertyuiop[]\\', "asdfghjkl;'", 'zxcvbnm,./'];
  const modifiers = ['backspace', 'tab', 'enter', 'capslock', 'enter', 'shift'];
  const allKeys = keys.flatMap((row) => row.toLowerCase().split('')).concat(modifiers);

  let prev = Math.random() * allKeys.length;
  const getRandomIndex = () => {
    let randomIndex = prev;

    while (randomIndex == prev) {
      randomIndex = Math.floor(Math.random() * allKeys.length);
    }

    prev = randomIndex;
    return randomIndex;
  };

  const map: { [key: string]: string } = {};
  const getSelector = (id: string) => {
    if (map[id]) return map[id];

    if (id.length > 1 || ('a' <= id && 'z' >= id)) {
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

    key?.classList.add('jiggle');
  };

  const removeJiggle = (id: string) => {
    const selector = getSelector(id);
    const prevKey = document.querySelector(selector);
    prevKey?.classList.remove('jiggle');
  };

  onMount(() => {
    addJiggle();

    document.addEventListener('keydown', (e) => {
      if (allKeys[prev] == e.key.toLowerCase()) {
        removeJiggle(e.key.toLowerCase());
        addJiggle();
      }
    });
  });
</script>

<svelte:options tag="doodles-keyboard" />

<div class="keyboard">
  <div class="row">
    {#each keys[0] as char}
      <div class="key" id={char}>{char}</div>
    {/each}
    <div class="key modifier" id="backspace">del</div>
  </div>
  <div class="row">
    <div class="key modifier" id="tab">tab</div>
    {#each keys[1] as char}
      <div class="key" id={char}>{char}</div>
    {/each}
  </div>
  <div class="row">
    <div class="key modifier" id="capslock">caps</div>
    {#each keys[2] as char}
      <div class="key" id={char}>{char}</div>
    {/each}
    <div class="key modifier" id="enter">enter</div>
  </div>
  <div class="row">
    <div class="key modifier" id="shift">shift</div>
    {#each keys[3] as char}
      <div class="key" id={char}>{char}</div>
    {/each}
    <div class="key modifier" id="shift">shift</div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');

  .keyboard {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 24px;

    background: #f6f6f6;
    border-radius: 40px;

    padding: 36px 48px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    text-transform: uppercase;

    width: 1200px;
  }

  .row {
    display: grid;
    gap: 12px;
  }

  .row:nth-of-type(1) {
    grid-template-columns: repeat(13, 1fr) 1.67fr;
  }

  .row:nth-of-type(2) {
    grid-template-columns: 1.67fr repeat(13, 1fr);
  }

  .row:nth-of-type(3) {
    grid-template-columns: 2fr repeat(11, 1fr) 1.8fr;
  }

  .row:nth-of-type(4) {
    grid-template-columns: 2.5fr repeat(10, 1fr) 2.5fr;
  }

  .key {
    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    background: #ffffff;
    border-radius: 16px;
    height: 65px;
    color: #60c1b6;
  }

  .modifier {
    color: #868888;
  }

  :global(.jiggle) {
    animation: jiggle 0.25s infinite;
  }

  @keyframes jiggle {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(5px, 5px) rotate(5deg);
    }
    50% {
      transform: translate(0, 0) rotate(0eg);
    }
    75% {
      transform: translate(-5px, 5px) rotate(-5deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }

  @media screen and (min-width: 768px) {
    .keyboard {
      transform: unset;
    }
  }
</style>
