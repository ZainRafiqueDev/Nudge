import { useMemo, useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StageBadge } from "@/components/dashboard/StageBadge"
import { contactById } from "@/data/contacts"
import { repById } from "@/data/reps"
import { formatCompactCurrency, daysSince } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Deal, DealStage } from "@/types"

interface DealRow extends Deal {
  ownerName: string
  ownerAvatar: string
  contactName: string
  staleDays: number
}

const stageOptions: { value: DealStage | "all"; label: string }[] = [
  { value: "all", label: "All stages" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "negotiation", label: "Negotiation" },
  { value: "stalled", label: "Stalled" },
  { value: "closed_won", label: "Closed won" },
  { value: "closed_lost", label: "Closed lost" },
]

export function DealTable({ deals, showOwnerFilter = true }: { deals: Deal[]; showOwnerFilter?: boolean }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState<DealStage | "all">("all")
  const [ownerFilter, setOwnerFilter] = useState<string>("all")

  const rows: DealRow[] = useMemo(
    () =>
      deals.map((deal) => {
        const owner = repById.get(deal.ownerId)
        const contact = contactById.get(deal.contactId)
        return {
          ...deal,
          ownerName: owner?.name ?? "Unassigned",
          ownerAvatar: owner?.avatar ?? "",
          contactName: contact?.name ?? "Unknown",
          staleDays: daysSince(deal.lastActivityAt),
        }
      }),
    [deals],
  )

  const filtered = useMemo(() => {
    return rows
      .filter((row) => {
        if (stageFilter !== "all" && row.stage !== stageFilter) return false
        if (ownerFilter !== "all" && row.ownerId !== ownerFilter) return false
        if (search && !`${row.name} ${row.company} ${row.contactName}`.toLowerCase().includes(search.toLowerCase())) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        const aOpen = a.stage !== "closed_won" && a.stage !== "closed_lost"
        const bOpen = b.stage !== "closed_won" && b.stage !== "closed_lost"
        if (aOpen !== bOpen) return aOpen ? -1 : 1
        return b.staleDays - a.staleDays
      })
  }, [rows, stageFilter, ownerFilter, search])

  const columns = useMemo<ColumnDef<DealRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Deal
            <ArrowUpDown className="size-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium leading-tight">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.contactName}</p>
          </div>
        ),
      },
      {
        accessorKey: "ownerName",
        header: "Owner",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={row.original.ownerAvatar} alt={row.original.ownerName} />
              <AvatarFallback>{row.original.ownerName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{row.original.ownerName}</span>
          </div>
        ),
      },
      {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }) => <StageBadge stage={row.original.stage} />,
      },
      {
        accessorKey: "valueCents",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Value
            <ArrowUpDown className="size-3.5" />
          </Button>
        ),
        cell: ({ row }) => <span className="font-medium">{formatCompactCurrency(row.original.valueCents)}</span>,
      },
      {
        accessorKey: "staleDays",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Last activity
            <ArrowUpDown className="size-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const isClosed = row.original.stage === "closed_won" || row.original.stage === "closed_lost"
          const stale = !isClosed && row.original.staleDays >= 5
          return (
            <span className={cn("text-sm", stale && "font-medium text-rose-600 dark:text-rose-400")}>
              {row.original.staleDays === 0 ? "Today" : `${row.original.staleDays} days ago`}
            </span>
          )
        },
      },
      {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.source}</span>,
      },
    ],
    [],
  )

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const owners = useMemo(() => Array.from(repById.values()), [])

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search deals, companies, or contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={stageFilter} onValueChange={(v) => setStageFilter(v as DealStage | "all")}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {stageOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showOwnerFilter && (
          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All owners</SelectItem>
              {owners.map((owner) => (
                <SelectItem key={owner.id} value={owner.id}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <p className="ml-auto text-sm text-muted-foreground">{filtered.length} deals</p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No deals match these filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
