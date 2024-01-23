import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { SortingState, createColumnHelper } from "@tanstack/react-table";
import Search from "../../../../component/search";
import { Button, Input, NewTable, PageTitle, SidePanel, Table } from "../../../../component";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { addRole, deleteRole, listRole, showRole, updateRole } from "../../../../api/role";
import Link from "next/link";
import { getQueryData, showQueryData } from "../../../../api";
import { useAuth } from "../../../../hooks/auth";

export default function Role() {
    const [isVisible, setIsVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [state, setState] = useState<any>("")
    const [errors, setErrors] = useState<any>()
    const [id, setId] = useState(0)
    const [page, setPage] = useState<number>(1);
    const [tableData, setTableData] = React.useState<any>([]);
    const { isAuthenticated } = useAuth()
    const [query, setQuery] = useState("");

    const [sorting, setSorting] = useState<SortingState>([{
        id: 'created_at',
        desc: true
    }])


    const { isFetching, data, refetch } = useQuery(
        ["role", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10],
        getQueryData, {
        onSuccess: (res) => {
            setTableData(res.data);
        },
        enabled: isAuthenticated
    })

    useQuery(['role', id], showQueryData, {
        onSuccess: (data) => {
            setState(data?.data)
        },
        enabled: id ? true : false
    })



    const { mutate: roleDelete } = useMutation(deleteRole, {
        onSuccess: () => refetch(),
    });
    const { mutate: update } = useMutation(updateRole, {
        onSuccess: () => {
            setIsVisible(!isVisible)
            setId(0)
            refetch()
        },
        onError: ({ response }: any) => {
            if (response.status == 422) {
                setErrors(response.data)
            }
        }
    });
    const { mutate: roleAdd, isLoading: creating } = useMutation(addRole, {
        onSuccess: () => {
            setIsVisible(!isVisible)
            refetch()
        },
        onError: ({ response }: any) => {
            if (response.status == 422) {
                setErrors(response.data)
            }
        }
    });



    const columnHelper = createColumnHelper<any>();
    let columns = [
        columnHelper.accessor((row: any) => row.value, {
            id: "id",
            cell: (info) => info.getValue(),
            header: "Role ID",
        }),
        columnHelper.accessor((row: any) => row.label, {
            id: "name",
            cell: (info: any) => info.getValue(),
            header: "Name",
        }),
        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { value: id } = info?.row.original;
                return (
                    <div className="flex items-center space-x-2">
                        {
                            <Button
                                label=""
                                buttonType="secondary"
                                icon={<PencilSquareIcon className="w-5" />}
                                onClick={() => {
                                    setId(id)
                                    setEdit(!edit)
                                    setIsVisible(!isVisible)
                                }}
                            />
                        }
                        {
                            <Button
                                label=""
                                buttonType="danger"
                                icon={<TrashIcon className="w-5" />}
                                onClick={() => roleDelete(id)}
                            />
                        }

                    </div>
                );
            },
            enableSorting: false
        }),
    ];

    const handleSearch = (value: any) => {
        setQuery(value);
    };

    const handlePaginationActon = (currentPage: any | void) => {
        setPage(currentPage.selected + 1)
    }


    return (
        <div className="">
            <div className="flex flex-row justify-between items-center">
                <PageTitle title="Roles Listing" />
                <Button label="Add Role" buttonType="link" onClick={() => {
                    setIsVisible(!isVisible)
                    setState({})
                }
                } />
            </div>
            <Search query={query} placeholder="Search Property" handleSearch={handleSearch} />

            {data && (


                <div className="overflow-x-scroll">
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>

                        {
                            tableData && tableData.length > 0 ? (
                                <div className=''>
                                    <NewTable
                                        data={tableData}
                                        columns={columns}
                                        sorting={sorting}
                                        setSorting={setSorting}
                                        pageCount={data?.last_page}
                                        Page={page}
                                        handlePaginationActon={handlePaginationActon}
                                        isloading={isFetching}
                                    />
                                </div>
                            ) : (
                                <div className='text-center text-red-500 py-20 font-medium'>
                                    <h1>!! NO Data Found !!</h1>
                                </div>
                            )}

                    </div>
                </div>
            )}

            <SidePanel
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(!isVisible);
                    setId(0)
                    setErrors({});
                }}
                title={edit ? "Edit Role" : "Add Role"}
                primaryButtonAction={() => {
                    setErrors({});
                    id ? update({ state, id }) : roleAdd(state);
                }}
                primaryButtonLoading={creating}
            >
                <React.Suspense fallback='loading'>
                    <Input
                        type="text"
                        name="name"
                        value={state?.name}
                        label='Role Name'
                        onChange={(e: any) => setState({ ...state, name: e.target.value })}
                    />
                    <p className='text-red-500 text-sm font-semibold h-6' >{errors?.name}</p>

                </React.Suspense>
            </SidePanel>
        </div>
    );
}
