import { fetchDreams } from "@/lib/data";
import { ColumnDef } from "@tanstack/react-table";
import { Dreams } from "@/lib/definitions";
import { DataTable } from "./data-table";
import Link from "next/link";
import { columns } from "@/lib/columns";

export default async function Home() {
  const dreams = await fetchDreams();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Link href="./dreams/add-dream" className="border p-5 rounded-md">
        Add a Dream
      </Link>
      <DataTable columns={columns} data={dreams} />
    </div>
  );
}
