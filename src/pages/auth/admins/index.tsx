import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteById, getQueryData, showQueryData, toggleIsActive } from "../../../../api";
import { addAdmin } from "../../../../api/admin";
import { Button, CheckBox, NewTable, PageTitle, SidePanel } from "../../../../component";
import Link from "next/link";
import { PencilSquareIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import Search from "../../../../component/search";
import AdminForm from "./admin-form";
import { useAuth } from "../../../../hooks/auth";

export default function Admins() {
    const { isAuthenticated } = useAuth()

    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'created_at',
        desc: true
    }])
    const [page, setPage] = useState<number>(1);
    const [adminId, setAdminId] = useState<number>(0)
    const columnHelper = createColumnHelper();
    const [isVisible, toggleIsVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>({})
    const [edit, setEdit] = useState(false)

    const { isFetching, isLoading, data, refetch } = useQuery(
        ["clients", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10],
        getQueryData, {
        onSuccess: (res) => {
            setTableData(res.admins.data);
        },
        enabled: isAuthenticated
    })

    useQuery(['admin', adminId], showQueryData, {
        onSuccess: (res: any) => {
            const { domain, user, image_path } = res.data
            setState({ ...user, domain, image_path })
            setAdminId(0)
        },
        enabled: adminId ? true : false
    })
    const { isLoading: creatingPackage, mutate } = useMutation<any, Error>(addAdmin,
        {
            onSuccess: () => {
                refetch();
                toggleIsVisible(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            }
        }

    );


    const { mutate: deletePackage } = useMutation(deleteById, {
        onSuccess: () => refetch()
    })
    const { mutate: toggleActive }: any = useMutation<any>(toggleIsActive,
        {
            onSuccess: () => {
                refetch();
            }
        }
    );

    const handleClick = (id: number) => {
        setEdit(true)
        setAdminId(id)
        toggleIsVisible(!isVisible)
    }

    const handleChange = (e: any, id: number) => {
        const { checked } = e.target
        toggleActive({ id, is_active: checked })
    }
    const columns = [
        columnHelper.accessor((row: any) => row.name, {
            id: "name",
            cell: (info) => info.getValue(),
            header: "Name",
        }),
        columnHelper.accessor((row: any) => row.email, {
            id: "email",
            cell: (info) => info.getValue(),
            header: "Email",
        }),
        columnHelper.accessor((row: any) => row.is_active, {
            id: "is_active",
            cell: (info: any) => <span ><CheckBox label="" checked={info.getValue()} onChange={(e: any) => handleChange(e, info?.row?.original?.id)} /> </span>,
            header: "Status",
        }),
        columnHelper.accessor((row: any) => row.created_at, {
            id: "created_at",
            cell: (info) => info.getValue(),
            header: "Created At",
        }),
        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { id } = info?.row.original
                return (
                    <div className='flex items-center space-x-2'>
                        <Link href={`${id}/profile`}>
                            <Button
                                label=''
                                buttonType="primary"
                                icon={<UserIcon className="w-5 h-5" />}
                            />
                        </Link>
                        <Button
                            label=''
                            buttonType="success"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={() => handleClick(id)}
                        />
                        <Button
                            label=''
                            buttonType="danger"
                            icon={<TrashIcon className="w-5" />}
                            onClick={() => deletePackage({ name: "admin", id })}
                        />
                    </div>
                );
            },
            enableSorting: false
        }),
    ];


    const handleSearch = (value: any) => {
        setPage(1)
        setQuery(value)
    }

    const handlePaginationActon = (currentPage: any | void) => {
        setPage(currentPage.selected + 1)
    }


    return (
        <div className="">
            <div className='flex flex-row justify-between items-center'>
                <PageTitle title='Admins ' />
                <Button
                    label='Add Admin'
                    buttonType="success"
                    onClick={() => {
                        toggleIsVisible(true);
                        setState({});
                        setEdit(false)
                    }}
                />
            </div>

            <div className='shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg'>
                <Search query={query} placeholder="Search admins" handleSearch={handleSearch} />

                <NewTable
                    data={tableData}
                    columns={columns}
                    sorting={sorting}
                    setSorting={setSorting}
                    pageCount={data?.admins?.last_page}
                    Page={page}
                    handlePaginationActon={handlePaginationActon}
                    isloading={isFetching}
                />
            </div>

            <SidePanel
                isVisible={isVisible}
                onClose={() => {
                    toggleIsVisible(!isVisible);
                    setFormErrors({});
                }}
                title={edit ? 'Edit Admin' : 'Add Admin'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    mutate({ ...state, route: "admin" })
                }}
                primaryButtonLoading={creatingPackage}
            >
                <React.Suspense fallback='loading'>
                    <AdminForm state={state} setState={setState} error={formerrors} edit={edit} />
                </React.Suspense>
            </SidePanel>
        </div>
    )
}
