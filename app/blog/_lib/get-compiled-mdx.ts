import fs from 'fs';
import { mdx } from './dir-path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Frontmatter } from './types';
import { normalizeFrontmatter } from './normalize-frontmatter';
import remarkGfm from 'remark-gfm';

export const getCompiledMDX = async (slug: string) => {
  const source = fs.readFileSync(`${mdx}/${slug}.mdx`, "utf-8");
  const compiled = await compileMDX<Frontmatter>({ source, options: { 
      mdxOptions: { remarkPlugins: [remarkGfm] }, 
      parseFrontmatter: true 
    }
  });
  return { ...compiled, frontmatter: normalizeFrontmatter(compiled.frontmatter) };
}
