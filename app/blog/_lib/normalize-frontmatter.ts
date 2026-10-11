// next-mdx-remote v5+ parses frontmatter dates as strings rather than Date objects.
export const normalizeFrontmatter = <T extends { date: Date | string }>(frontmatter: T) => ({
  ...frontmatter,
  date: new Date(frontmatter.date),
});
