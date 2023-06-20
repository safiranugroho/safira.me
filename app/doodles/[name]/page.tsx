import { Doodle } from "./_components/Doodle";

type PageParams = {
  name: string;
};

export type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { name } = params;
  return <Doodle name={name} />;
}