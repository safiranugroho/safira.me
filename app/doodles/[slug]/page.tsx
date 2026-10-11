import { Doodle } from "./_components/Doodle";

type PageParams = {
  slug: string;
};

export type PageProps = {
  params: Promise<PageParams>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <Doodle name={slug} />;
}