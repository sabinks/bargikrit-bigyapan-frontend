import { Button, CheckBox, NewTable, PageTitle, SidePanel } from "../../../components";
import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteById, getQueryData, userCanPublishChange, userStatusChange } from "../../../api";
import Search from "../../../components/search";
import { useAuth } from "../../../../hooks/auth";

const initialState = {
    name: "",
    content: "",
    district: null,
    districtId: 0,
};
export default function Clients() {
    const { roles } = useAuth()
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'createdAt',
        desc: true
    }])
    const [page, setPage] = useState<number>(0);
    const [adsId, setAdsId] = useState<number>(0)
    const columnHelper = createColumnHelper<any>();
    const [isVisible, toggleIsVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>(initialState)
    const [edit, setEdit] = useState(false)

    const { isLoading, data: response, refetch, isFetching } = useQuery(
        ["partners", query, sorting[0].id, sorting[0].desc ? 'DESC' : 'ASC', page, 5],
        getQueryData, {
        onSuccess: (data) => {
            setTableData(data.content);
        }
    })

    // useQuery(['advertisements', adsId], showAdvertisement, {
    //     onSuccess: (res) => {
    //         const { name, data, id, advertisementType, advertisementTypeId, district, province } = res.data
    //         setState({ name: name, id: id, data: data, advertisementType, advertisementTypeId: advertisementType?.id, district, districtId: district?.id, province, provinceId: province?.id })
    //         setAdsId(0)
    //     },
    //     enabled: adsId ? true : false
    // })
    // const { isLoading: creatingAdvertisement, mutate } = useMutation<any, Error>(addAdvertisement,
    //     {
    //         onSuccess: () => {
    //             refetch();
    //             toggleIsVisible(false);
    //         },
    //         onError: (err: any) => {
    //             const { status, data } = err.response;
    //             if (status == 422) {
    //                 setFormErrors(data);
    //             } else {
    //                 console.log("Course Form Error: ", err);
    //             }
    //         },
    //     }
    // );
    // const { mutate: update, isLoading: updatingAdvertisement } = useMutation<any, Error>(updateAdvertisement,
    //     {
    //         onSuccess: () => {
    //             refetch();
    //             toggleIsVisible(false);
    //         },
    //         onError: (err: any) => {
    //             const { status, data } = err.response;
    //             if (status == 422) {
    //                 setFormErrors(data);
    //             } else {
    //                 console.log("Course Form Error: ", err);
    //             }
    //         },
    //     }
    // );

    // const { mutate: mutateDeleteAdvertisement } = useMutation(deleteAdvertisement, {
    //     onSuccess: () => refetch()
    // })

    // const handleClick = (id: number) => {
    //     setAdsId(id)
    //     setEdit(true)
    //     toggleIsVisible(!isVisible)
    // }
    const columns = [
        columnHelper.accessor((row: any) => row, {
            id: "name",
            cell: ({ row }) => row.original.name,
            header: "Name",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "email",
            cell: ({ row }) => row.original.email,
            header: "Email",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "mobile",
            cell: ({ row }) => row.original.mobile,
            header: "Mobile",
        }),
        columnHelper.accessor((row: any) => row.active, {
            id: "active",
            cell: (info: any) => <span>
                <CheckBox label="" checked={info.getValue()} onChange={(e: any) => handleActiveStatusChange(e, info?.row?.original?.id)} />
            </span>,
            header: "Active",
        }),
        columnHelper.accessor((row: any) => row.canPublish, {
            id: "publish",
            cell: (info: any) => <span>
                <CheckBox label="" checked={info.getValue()} onChange={(e: any) => handleCanPublishChange(e, info?.row?.original?.id)} />
            </span>,
            header: "Publish",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "createdAt",
            cell: ({ row }) => row.original.createdAt,
            header: "Created At",
        }),
        // columnHelper.accessor((row: any) => row.id, {
        //     id: "actions",
        //     cell: (info: any) => {
        //         const { id } = info?.row.original
        //         return (
        //             <div className='flex items-center space-x-2'>
        //                 <Button
        //                     label=''
        //                     buttonType="success"
        //                     icon={<PencilIcon className="w-5" />}
        //                     onClick={() => handleClick(id)}
        //                     tooltipMsg="Edit Advertisement"
        //                 />
        //                 {/* {
        //                     <Button
        //                         label=''
        //                         buttonType="danger"
        //                         icon={<TrashIcon className="w-5" />}
        //                         onClick={() => mutateDeleteAdvertisement({ id })}
        //                         tooltipMsg="Delete Advertisement"
        //                     />
        //                 } */}
        //             </div>
        //         );
        //     },
        // }),
    ];
    const handleActiveStatusChange = (e: any, id: number) => {
        const { checked } = e.target
        mutateUserStatusChange({ id, status: checked })
    }
    const handleCanPublishChange = (e: any, id: number) => {
        const { checked } = e.target
        mutateCanPublishChange({ id, status: checked })
    }
    const { mutate: mutateUserStatusChange }: any = useMutation<any>(userStatusChange,
        {
            onSuccess: () => {
                refetch();
            }
        }
    );
    const { mutate: mutateCanPublishChange }: any = useMutation<any>(userCanPublishChange,
        {
            onSuccess: () => {
                refetch();
            }
        }
    );
    const handleSearch = (value: any) => {
        setPage(0)
        setQuery(value)
    }

    const handlePaginationActon = (currentPage: any | void) => {
        setPage(currentPage.selected)
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <PageTitle title='Users' />
                {/* <Button
                    label='Add Advertisement'
                    buttonType="success"
                    onClick={() => {
                        toggleIsVisible(true);
                        setState(initialState);
                        setEdit(false)
                    }}
                /> */}
            </div>
            <div className='flex flex-col sm:px-6 lg:px-8'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full '>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <Search query={query} placeholder="Search clients" handleSearch={handleSearch} />
                            <div className="">
                                <NewTable
                                    data={tableData}
                                    columns={columns}
                                    sorting={sorting}
                                    setSorting={setSorting}
                                    pageCount={response?.data?.totalPages}
                                    Page={page}
                                    handlePaginationActon={handlePaginationActon}
                                    isloading={isFetching}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <SidePanel
                isVisible={isVisible}
                onClose={() => {
                    toggleIsVisible(!isVisible);
                    setFormErrors({});
                }}
                wide="4xl"
                title={edit ? 'Edit Advertisement' : 'Add Advertisement'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    state?.id ? update(state) :
                        mutate(state)
                }}
                primaryButtonLoading={creatingAdvertisement || updatingAdvertisement}
            >
                <React.Suspense fallback='loading'>
                    <AdvertisementForm state={state} setState={setState} error={formerrors} />
                </React.Suspense>
            </SidePanel> */}
        </>
    )
}
