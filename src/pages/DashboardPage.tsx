import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { mockRepo } from "@/lib/mock-data";

const cards = [
  { key: "users" as const, label: "Users", to: "/users" },
  { key: "roles" as const, label: "Roles", to: "/roles" },
  { key: "companies" as const, label: "Companies", to: "/companies" },
  { key: "branches" as const, label: "Branches", to: "/branches" },
  { key: "apiKeys" as const, label: "API Keys", to: "/api-keys" },
  { key: "logs" as const, label: "Audit logs", to: "/logs" },
];

export function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: () => mockRepo.counts(),
  });

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Site administration overview. Counts come from the local mock repository."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.key}
            to={card.to}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4 transition-colors hover:bg-[var(--color-muted)]"
          >
            <p className="text-sm text-[var(--color-muted-foreground)]">{card.label}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">
              {data?.[card.key] ?? "—"}
            </p>
          </Link>
        ))}
      </div>
      {data ? (
        <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
          {data.enabledUsers} of {data.users} users enabled.
        </p>
      ) : null}
    </div>
  );
}
