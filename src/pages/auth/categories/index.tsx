import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteById, getQueryData, showQueryData, toggleIsActive } from "../../../api";
import { Button, NewTable, PageTitle, SidePanel } from "../../../components";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Search from "../../../components/search";
import { useAuth } from "../../../../hooks/auth";
import CategoryForm from "./categoryForm";
import { addCategory } from "@/api/advertisement/category";

export default function Category() {
    const { isAuthenticated } = useAuth()

    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'created_at',
        desc: true
    }])
    const [page, setPage] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<number>(0)
    const columnHelper = createColumnHelper();
    const [isVisible, toggleIsVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>({})
    const [edit, setEdit] = useState(false)

    const { isFetching, isLoading, data, refetch } = useQuery(
        ["categories", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10],
        getQueryData, {
        onSuccess: (data) => {
            setTableData(data);
        },
        enabled: isAuthenticated
    })

    useQuery(['categories', categoryId], showQueryData, {
        onSuccess: (res: any) => {
            const { name } = res.data
            setState({ name })
            setCategoryId(0)
        },
        enabled: categoryId ? true : false
    })
    const { isLoading: creatingCategory, mutate } = useMutation<any, Error>(addCategory,
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


    const { mutate: deleteCategory } = useMutation(deleteById, {
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
        setCategoryId(id)
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

        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { id } = info?.row.original
                return (
                    <div className='flex items-center space-x-2'>
                        <Button
                            label=''
                            buttonType="primary"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={() => handleClick(id)}
                        />
                        <Button
                            label=''
                            buttonType="danger"
                            icon={<TrashIcon className="w-5" />}
                            onClick={() => deleteCategory({ name: "categories", id })}
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
                <PageTitle title='Category' />
                <Button
                    label='Add Category'
                    buttonType="primary"
                    onClick={() => {
                        toggleIsVisible(true);
                        setState({});
                        setEdit(false)
                    }}
                />
            </div>

            <div className='shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg'>
                <Search query={query} placeholder="Search category" handleSearch={handleSearch} />

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
                title={edit ? 'Edit Category' : 'Add Category'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    mutate({ ...state, route: "categories" })
                }}
                primaryButtonLoading={creatingCategory}
            >
                <React.Suspense fallback='loading'>
                    <CategoryForm state={state} setState={setState} error={formerrors} edit={edit} />
                </React.Suspense>
            </SidePanel>
        </div>
    )
}
