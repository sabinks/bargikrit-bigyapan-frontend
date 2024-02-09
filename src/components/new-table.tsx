import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    OnChangeFn,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { classNames } from "../../utils";
import ReactPaginate from "react-paginate";
import Spinner from "@/components/spinner";
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function NewTable({
    data,
    columns,
    sorting,
    setSorting,
    pageCount,
    Page,
    handlePaginationActon,
    isloading
}: {
    data: any[];
    columns: ColumnDef<any, any>[];
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pageCount: number
    Page: number
    handlePaginationActon: (value: any) => void;
    isloading?: boolean
}) {
    const [sort, setSort] = React.useState<SortingState>(sorting)
    React.useEffect(() => {
        if (sort.length) {
            setSorting(sort)
        } else {
            let data = sorting[0]
            setSorting([
                { ...data, desc: !data.desc }
            ])
        }
    }, [sort])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        manualPagination: true,
        onSortingChange: setSort,
        // getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });
    const [currentPage, setCurrentPage] = React.useState<number>(Page + 1)
    const rlength = data.length
    const hlength = table.getHeaderGroups()
    return (
        <div>
            <div className=" w-full flex flex-col">
                <div className="relative  overflow-x-auto ">
                    <table className=" divide-y  w-full divide-gray-200 border-separate border-spacing-0">
                        <thead className="bg-primary1">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="bg-primary">
                                    {headerGroup.headers.map((header, index) => (
                                        <th
                                            scope="col"
                                            key={header.id}
                                            className={classNames("px-2	 py-2 text-left text-xs font-medium text-white uppercase tracking-wider")}
                                            style={{
                                                width: header.getSize(),
                                            }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? "flex cursor-pointer select-none "
                                                            : "",
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: <ArrowUpIcon width={15} />,
                                                        desc: <ArrowDownIcon width={15} />,
                                                    }[header.column.getIsSorted() as string] ?? null}
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
                        {
                            true &&
                            <tbody className="relative">
                                {table.getRowModel().rows.map((row, idx) => (
                                    <tr
                                        key={row.id}
                                        className={classNames('hover:bg-slate-300', idx % 2 === 0 ? "bg-white" : "bg-slate-200")}
                                    >
                                        {row.getVisibleCells().map((cell, index) => (
                                            <td

                                                key={cell.id}
                                                className={classNames("px-2  py-1 whitespace-nowrap text-sm text-gray-700", index == 0 ? "relative" : "")}
                                            >

                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {
                                    isloading &&
                                    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                        <Spinner size={12} /><span className="sr-only">Loading...</span>
                                    </div>
                                }
                            </tbody>
                        }


                    </table>

                </div>

                <div className='flex py-6 whitespace-normal grow    min-h-inherit rounded-lg mt-2 '>
                    <div className="">
                        <ReactPaginate
                            pageCount={pageCount}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            onPageChange={(value: any) => {
                                setCurrentPage(value?.selected + 1)
                                handlePaginationActon(value)
                            }}
                            breakLabel="..."
                            forcePage={currentPage - 1}
                            previousLabel={<ChevronLeftIcon className="w-4" />}
                            nextLabel={<ChevronRightIcon className="w-4" />}
                            pageClassName="border  w-6 h-6 text-center mx-2 rounded-full flex items-center justify-center "
                            previousClassName="flex mr-1  px-2   h-7  text-gray-500 justify-center items-center font-semibold   hover:cursor-pointer"
                            nextClassName="flex ml-1  h-7 px-2  text-gray-500 justify-center items-center font-semibold hover:cursor-pointer"
                            breakClassName="text-gray-500"
                            containerClassName="flex items-center -mt-4    justify-evenly  ml-5"
                            activeClassName="bg-secondary font-semibold text-white"
                        />
                    </div>
                </div>

            </div >

        </div>
    );
}