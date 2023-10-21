import { doodles } from "@safiranugroho/doodles/metadata";
import { Doodle } from "./types";
import { IndexItem } from "../_components/IndexItem";
import { IndexListPage } from "../_components/IndexListPage";

export default async function Page() {
  return (
    <IndexListPage title="Doodles" description="A collection of non-responsive, non-accessible, completely messy doodles.">
      {doodles.map((d: Doodle, i: number) => (
        <IndexItem
          key={i}
          href={`/doodles/${d.slug}`}
          title={d.title}
          description={d.description}
        />
      ))}
    </IndexListPage>
  );
}