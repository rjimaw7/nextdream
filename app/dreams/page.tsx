import { fetchDreams } from "@/lib/data";
import { ColumnDef } from "@tanstack/react-table";
import { Dreams } from "@/lib/definitions";
import DataTable from "./data-table";

export const columns: ColumnDef<Dreams>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Dream Date",
  },
  {
    accessorKey: "dream",
    header: "Dream",
  },
];

export default async function Home() {
  const dreams = await fetchDreams();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dreams} />
    </div>
  );
}
