import { Doodle } from "./_components/Doodle";

type PageParams = {
  slug: string;
};

export type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  return <Doodle name={slug} />;
}