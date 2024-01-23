import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import * as React from "react";
import Button from "./Button";
import { ArrowDownIcon, ArrowUpIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


export default function Table({
    data,
    columns,
}: {
    data: any[];
    columns: ColumnDef<any, any>[];
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });



    return (
        <>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-primary1'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    scope='col'
                                    key={header.id}
                                    className='px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider'
                                    style={{
                                        position: "relative",
                                        width: header.getSize(),
                                    }}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? "flex cursor-pointer select-none"
                                                    : "",
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: <ArrowUpIcon width={15} />,
                                                desc: <ArrowDownIcon width={15} />,
                                            }[header.column.getIsSorted() as string] ?? null}
                                            {/* {!header.column.getIsSorted() && (
                        <ChevronUpDownIcon width={15} />
                      )} */}
                                        </div>
                                    )}
                                    {header.column.getCanResize() && (
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""
                                                }`}
                                        ></div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            className="even:bg-slate-200"

                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className='px-6 py-1 whitespace-nowrap text-sm text-gray-500'
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
                <div className='flex-1 flex justify-between sm:hidden'>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        label='Previous'
                        className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    ></Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        label='Next'
                        className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    ></Button>
                </div>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                    <div>
                        <p className='text-sm text-gray-700'>
                            Showing page{" "}
                            <span className='font-medium'>
                                {table.getState().pagination.pageIndex + 1}
                            </span>{" "}
                            of <span className='font-medium'>{table.getPageCount()}</span>{" "}
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                            aria-label='Pagination'
                        >
                            <Button
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                label=""
                                icon={
                                    <ChevronDoubleLeftIcon
                                        className='h-4 w-4 text-slate-600'
                                        aria-hidden='true'
                                    />
                                }
                                className='relative inline-flex items-center px-2 py-2 rounded-none rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50'
                            >
                                <span className='sr-only'>First</span>
                            </Button>
                            <Button
                                label=''
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                icon={
                                    <ChevronLeftIcon
                                        className='h-4 w-4 text-slate-600'
                                        aria-hidden='true'
                                    />
                                }
                                className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-none'
                            >
                                <span className='sr-only'>Previous</span>
                            </Button>
                            <Button
                                label=''
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                icon={
                                    <ChevronRightIcon
                                        className='h-4 w-4 text-slate-600'
                                        aria-hidden='true'
                                    />
                                }
                                className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-none'
                            >
                                <span className='sr-only'>Next</span>
                            </Button>
                            <Button
                                label=''
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                icon={
                                    <ChevronDoubleRightIcon
                                        className='h-4 w-4 text-slate-600'
                                        aria-hidden='true'
                                    />
                                }
                                className='relative inline-flex items-center px-2 py-2 rounded-none rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                            >
                                <span className='sr-only'>Last</span>
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}