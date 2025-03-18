"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITask } from "@/types/task";
import { DataTableColumnHeader } from "@/components/custom/table/data-table-column-header";

export const columns: ColumnDef<ITask>[] = [
  {
    accessorKey: "leadName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Lead Name" />;
    },
    cell: ({ row }) => {
      return <div className="">{row.getValue("leadName")}</div>;
    },
  },
  {
    accessorKey: "text",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Text" />;
    },
    cell: ({ row }) => {
      return <div>{row.getValue("text")}</div>;
    },
  },
  {
    accessorKey: "createdByName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      return <div>{row.getValue("createdByName")}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="date" />;
    },
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue("date")}</div>;
    },
  },
];
