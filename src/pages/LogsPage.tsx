import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, ErrorState, PageHeader, SearchField } from "@zatgo/ui";
import { mockRepo, type LogRecord } from "@/lib/mock-data";

export function LogsPage() {
  const [search, setSearch] = useState("");
  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "logs"],
    queryFn: () => mockRepo.listLogs(),
  });

  const columns = useMemo<ColumnDef<LogRecord>[]>(
    () => [
      {
        accessorKey: "timestamp",
        header: "When",
        cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
      },
      {
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => (
          <span className="uppercase tracking-wide">{row.original.level}</span>
        ),
      },
      { accessorKey: "actor", header: "Actor" },
      { accessorKey: "action", header: "Action" },
      { accessorKey: "detail", header: "Detail" },
    ],
    [],
  );

  if (isError) {
    return (
      <ErrorState
        title="Could not load logs"
        description={error instanceof Error ? error.message : String(error)}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Audit logs"
        description="Local activity from console mutations (mock). Replace with site audit trail later."
        actions={
          <SearchField value={search} onChange={setSearch} placeholder="Search logs…" />
        }
      />
      <DataTable
        data={data}
        columns={columns}
        globalFilter={search}
        emptyMessage="No logs"
        loading={isLoading}
      />
    </div>
  );
}
