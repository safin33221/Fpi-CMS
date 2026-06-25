"use client";

import React from "react";

import {
    Blocks,
    Edit,
    Eye,
    Loader2,
    MoreHorizontal,
    Shield,
    Trash,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export interface columns<T> {
    header: string;
    accessor:
        | keyof T
        | ((row: T) => React.ReactNode);
    className?: string;
    sortKey?: string;
}

interface ManagementTableProps<T> {
    data: T[];

    columns: columns<T>[];

    onView?: (row: T) => void;

    onEdit?: (row: T) => void;

    onDelete?: (row: T) => void;

    onToggleBlock?: (
        row: T
    ) => void;

    isRowBlocked?: (
        row: T
    ) => boolean;

    updateRole?: (
        row: T
    ) => void;

    getRowKey: (
        row: T
    ) => string;

    EmptyMessage?: string;

    isRefreshing?: boolean;
}

export default function ManagementTable<T>({
    data = [],
    columns = [],
    onView,
    onEdit,
    onDelete,
    onToggleBlock,
    isRowBlocked,
    updateRole,
    EmptyMessage = "No records found",
    getRowKey,
    isRefreshing = false,
}: ManagementTableProps<T>) {
    const hasAction =
        onEdit ||
        onView ||
        onDelete ||
        onToggleBlock ||
        updateRole;

    return (
        <div className="relative overflow-hidden md:rounded-3xl border bg-card shadow-sm mt-3 ">
            {/* Refresh Overlay */}
            {isRefreshing && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-5 shadow-xl">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />

                        <p className="text-sm font-medium text-muted-foreground">
                            Refreshing data...
                        </p>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <Table>
                    {/* Header */}
                    <TableHeader>
                        <TableRow className="border-b bg-muted/40 hover:bg-muted/40">
                            {columns.map(
                                (col, idx) => (
                                    <TableHead
                                        key={idx}
                                        className={`h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${col.className || ""
                                            }`}
                                    >
                                        {col.header}
                                    </TableHead>
                                )
                            )}

                            {hasAction && (
                                <TableHead className="w-20 text-center">
                                    Action
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length ===
                            0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length +
                                        (hasAction
                                            ? 1
                                            : 0)
                                    }
                                    className="h-62.5"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                                            <Eye className="h-6 w-6 text-primary" />
                                        </div>

                                        <div className="text-center">
                                            <h3 className="font-semibold">
                                                No Data Found
                                            </h3>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {
                                                    EmptyMessage
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map(
                                (
                                    item,
                                    rowIndex
                                ) => (
                                    <TableRow
                                        key={getRowKey(
                                            item
                                        )}
                                        className={`
                      transition-all
                      hover:bg-primary/5
                      hover:shadow-inner
                      ${rowIndex %
                                                2 ===
                                                0
                                                ? "bg-background"
                                                : "bg-muted/10"
                                            }
                    `}
                                    >
                                        {columns.map(
                                            (
                                                col,
                                                idx
                                            ) => (
                                                <TableCell
                                                    key={
                                                        idx
                                                    }
                                                    className={`py-4 ${col.className ||
                                                        ""
                                                        }`}
                                                >
                                                    {typeof col.accessor ===
                                                        "function"
                                                        ? col.accessor(
                                                            item
                                                        )
                                                        : String(
                                                            item[
                                                            col.accessor
                                                            ]
                                                        )}
                                                </TableCell>
                                            )
                                        )}

                                        {hasAction && (
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="rounded-xl"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48 rounded-2xl"
                                                    >
                                                        {onView && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onView(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </DropdownMenuItem>
                                                        )}

                                                        {onEdit && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onEdit(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                        )}

                                                        {updateRole && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateRole(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Shield className="mr-2 h-4 w-4" />
                                                                Update
                                                                Role
                                                            </DropdownMenuItem>
                                                        )}

                                                        {onToggleBlock &&
                                                            isRowBlocked && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        onToggleBlock(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <Blocks
                                                                        className={`mr-2 h-4 w-4 ${isRowBlocked(
                                                                            item
                                                                        )
                                                                                ? "text-green-500"
                                                                                : "text-destructive"
                                                                            }`}
                                                                    />

                                                                    {isRowBlocked(
                                                                        item
                                                                    )
                                                                        ? "Unblock"
                                                                        : "Block"}
                                                                </DropdownMenuItem>
                                                            )}

                                                        {onDelete && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onDelete(
                                                                        item
                                                                    )
                                                                }
                                                                className="text-destructive focus:text-destructive"
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}