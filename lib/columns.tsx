"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Dreams } from "./definitions";
import { Button } from "@/components/ui/button";

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
          <Button
            variant="outline"
            onClick={() => console.log(row.original.id)}
          >
            Edit
          </Button>
          <Button onClick={() => console.log(row.original.id)}>Delete</Button>
        </div>
      );
    },
  },
];
