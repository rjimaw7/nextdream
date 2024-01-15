"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Dreams } from "./definitions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteDream } from "./actions";
import DeleteButton from "@/app/dreams/components/DeleteButton";

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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Link
            className="border w-full rounded-md text-center items-center flex justify-center"
            href={`/dreams/${row.original.id}/edit`}
          >
            Edit
          </Link>
          <DeleteButton id={row.original.id} />
        </div>
      );
    },
  },
];
