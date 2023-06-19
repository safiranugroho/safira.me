import { Doodle } from "./Doodle";

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