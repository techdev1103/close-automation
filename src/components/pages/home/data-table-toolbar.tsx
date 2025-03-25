"use client";

import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/custom/table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  syncSheet: () => void;
}

export function DataTableToolbar<TData>({
  table,
  syncSheet,
}: DataTableToolbarProps<TData>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex w-full justify-between">
      <div>
        <Input
          placeholder="Filter lead name..."
          value={
            (table.getColumn("leadName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("leadName")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={async () => {
            setIsLoading(true);
            await syncSheet();
            setIsLoading(false);
          }}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Sync with Sheet
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
