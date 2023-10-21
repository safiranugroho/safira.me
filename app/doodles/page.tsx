import { doodles } from "@safiranugroho/doodles/metadata";
import { Doodle } from "./types";
import { IndexItem } from "../_components/IndexItem";
import { IndexPage } from "../_components/IndexPage";

export default async function Page() {
  return (
    <IndexPage>
      <h1>Doodles</h1>
      <p>A collection of non-responsive, non-accessible, completely messy doodles.</p>
      {doodles.map((d: Doodle, i: number) => (
        <IndexItem
          key={i}
          href={`/doodles/${d.slug}`}
          title={d.title}
          description={d.description}
        />
      ))}
    </IndexPage>
  );
}