"use client";

import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortControl({ sort }: { sort: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="hidden text-xs font-medium text-muted-foreground sm:inline"
      >
        Sort by
      </label>

      <div className="relative">
        <ArrowUpDown
          className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <select
          id="sort"
          name="sort"
          value={sort}
          onChange={handleChange}
          className="field-control appearance-none py-1.5 pl-8 pr-8 text-xs"
        >
          <option value="due_date">Due date</option>
          <option value="topic">Topic</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
}