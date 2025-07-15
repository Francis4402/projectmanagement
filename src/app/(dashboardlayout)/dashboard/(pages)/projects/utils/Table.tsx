
import { Task } from "@/types"
import { ColumnDef } from "@tanstack/react-table"





export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="lowercase truncate">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <div className="lowercase">{row.getValue("priority")}</div>,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => <div className="lowercase">{row.getValue("tags")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const value = row.getValue("startDate");
      const date = typeof value === "string" ? value.slice(0, 10) : "";
      return <div className="lowercase">{date}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const value = row.getValue("dueDate");
      const date = typeof value === "string" ? value.slice(0, 10) : "";
      return <div className="lowercase">{date}</div>
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>

  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
