import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteById, getQueryData, showQueryData, toggleIsActive } from "../../../api";
import { Button, CheckBox, NewTable, PageTitle, SidePanel } from "../../../components";
import { PencilSquareIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import Search from "../../../components/search";
import ContryForm from "./countryForm";
import { addNewCountry } from "@/api/country";
import { useAuth } from "../../../../hooks/auth";

export default function Country() {
    const { isAuthenticated } = useAuth()
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'createdAt',
        desc: true
    }])
    const [page, setPage] = useState<number>(0);
    const [countryId, setCountryId] = useState<number>(0)
    const columnHelper = createColumnHelper();
    const [isVisible, toggleIsVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>({})
    const [edit, setEdit] = useState(false)

    const { isLoading, data, refetch, isFetching } = useQuery(
        ["countries", query, sorting[0].id, sorting[0].desc ? 'DESC' : 'ASC', page, 10],
        getQueryData, {
        onSuccess: (data) => {
            setTableData(data?.content);
        },
        enabled: isAuthenticated
    })

    useQuery(['countries', countryId], showQueryData, {
        onSuccess: (res: any) => {
            setState({ ...res?.data })
            setCountryId(0)
        },
        enabled: countryId ? true : false
    })
    const { isLoading: creatingNewCountry, mutate } = useMutation<any, Error>(addNewCountry,
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
                    console.log("Country Form Error: ", err);
                }
            }
        }
    );

    const { mutate: deleteCountry } = useMutation(deleteById, {
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
        setCountryId(id)
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
                            buttonType="success"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={() => handleClick(id)}
                        />
                        <Button
                            label=''
                            buttonType="danger"
                            icon={<TrashIcon className="w-5" />}
                            onClick={() => deleteCountry({ name: "country", id })}
                        />
                    </div>
                );
            },
            enableSorting: false
        }),
    ];


    const handleSearch = (value: any) => {
        setPage(0)
        setQuery(value)
    }

    const handlePaginationActon = (currentPage: any | void) => {
        setPage(currentPage.selected)
    }


    return (
        <div className="">
            <div className='flex flex-row justify-between items-center'>
                <PageTitle title='Countries' />
                <Button
                    label='Add Country'
                    buttonType="success"
                    onClick={() => {
                        toggleIsVisible(true);
                        setState({});
                        setEdit(false)
                    }}
                />
            </div>

            <div className='shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg'>
                <Search query={query} placeholder="Search country" handleSearch={handleSearch} />

                <NewTable
                    data={tableData}
                    columns={columns}
                    sorting={sorting}
                    setSorting={setSorting}
                    pageCount={data?.totalPages}
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
                title={edit ? 'Edit Country' : 'Add Country'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    mutate({ ...state, route: "countries" })
                }}
                primaryButtonLoading={creatingNewCountry}
            >
                <React.Suspense fallback='loading'>
                    <ContryForm state={state} setState={setState} error={formerrors} edit={edit} />
                </React.Suspense>
            </SidePanel>
        </div>
    )
}
