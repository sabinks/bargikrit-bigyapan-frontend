import { CheckBox, NewTable, PageTitle } from "../../../components";
import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addAdvertisement, advertisementStatusChange, deleteAdvertisement, showAdvertisement, updateAdvertisement } from "@/api/advertisement";
import { useAuth } from "../../../../hooks/auth";
import { getQueryData } from "../../../api";
import { checkSubset } from "@/utils";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Search from "../../../components/search";
import AdvertisementsForm from "./advertisementsForm";
import SidePanel from "../../../components/sidePanel";
import Button from "../../../components/Button";

const initialState = {
    name: "",
    content: "",
    adImages: []
};
export default function ListingView() {
    const { roles, user: { email, canPublish } } = useAuth()
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

    const { isLoading, data, refetch, isFetching } = useQuery(
        ["advertisements", query, sorting[0].id, sorting[0].desc ? 'DESC' : 'ASC', page, 10],
        getQueryData, {
        onSuccess: (data) => {
            setTableData(data.content);
        }
    })

    useQuery(['advertisements', adsId], showAdvertisement, {
        onSuccess: (res) => {
            const { name, data, id, advertisementType, country, province, district, companyName, email, contactNumber } = res.data
            setState({
                name: name, id: id, data: data, companyName, email, contactNumber,
                advertisementType, advertisementTypeId: advertisementType?.id,
                country, countryId: country?.id,
                province, provinceId: province?.id,
                district, districtId: district?.id,
            })
            setAdsId(0)
        },
        enabled: adsId ? true : false
    })
    const { isLoading: creatingAdvertisement, mutate } = useMutation<any, Error>(addAdvertisement,
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
            },
        }
    );
    const { mutate: update, isLoading: updatingAdvertisement } = useMutation<any, Error>(updateAdvertisement,
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
            },
        }
    );

    const { mutate: mutateDeleteAdvertisement } = useMutation(deleteAdvertisement, {
        onSuccess: () => refetch()
    })

    const handleClick = (id: number) => {
        setAdsId(id)
        setEdit(true)
        toggleIsVisible(!isVisible)
    }
    const columns = [
        columnHelper.accessor((row: any) => row, {
            id: "name",
            cell: ({ row }) => row.original.name,
            header: "Ads Name",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "companyName",
            cell: ({ row }) => row.original.companyName,
            header: "Company Name",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "advertisementType",
            cell: ({ row }) =>
                <div className="">{row.original.advertisementType?.name}</div>
            ,
            header: "Advertisement Type",
            enableSorting: false,
        }),
        columnHelper.accessor((row: any) => row, {
            id: "country",
            cell: ({ row }) =>
                <div className="">{row.original.country?.name}</div>
            ,
            header: "Country",
            enableSorting: false,
        }),
        columnHelper.accessor((row: any) => row, {
            id: "province",
            cell: ({ row }) =>
                <div className="">{row.original.province?.name}</div>
            ,
            header: "Province/State",
            enableSorting: false,
        }),
        columnHelper.accessor((row: any) => row, {
            id: "createdBy",
            cell: ({ row }) =>
                <div className="">{row.original.user?.name}({row.original.user?.email})</div>,
            header: "Created By",
            enableSorting: false,
        }),
        columnHelper.accessor((row: any) => row, {
            id: "createdAt",
            cell: ({ row }) => row.original.createdAt,
            header: "Created At",
        }),
        columnHelper.accessor((row: any) => row.publish, {
            id: "pubish",
            cell: (info: any) => <span>
                {
                    checkSubset(['SUPERADMIN', 'ADMIN', 'PARTNER', 'USER'], roles) ?
                        <CheckBox label="" checked={info.getValue()} onChange={(e: any) => handleAdsPublishStatus(e, info?.row?.original?.id)} />
                        :
                        <CheckBox label="" checked={info.getValue()} disabled />
                }
            </span>,
            header: "Publish",
        }),

        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { id, user, publish } = info?.row.original

                return (
                    <div className='flex items-center space-x-2'>
                        {
                            (checkSubset(["SUPERADMIN", "ADMIN"], roles) || (user?.email == email && !publish)) &&
                            <Button
                                label=''
                                buttonType="primary"
                                icon={<PencilSquareIcon className="w-5" />}
                                onClick={() => handleClick(id)}
                                tooltipMsg="Edit Advertisement"
                            />
                        }

                        {(checkSubset(["SUPERADMIN"], roles) || user?.email == email) &&
                            <Button
                                label=''
                                buttonType="danger"
                                icon={<TrashIcon className="w-5" />}
                                onClick={() => mutateDeleteAdvertisement({ id })}
                                tooltipMsg="Delete Advertisement"
                            />
                        }
                    </div>
                );
            },
        }),
    ];
    const handleAdsPublishStatus = (e: any, id: number) => {
        const { checked } = e.target
        changeAdsPublishStatus({ id, status: checked })
    }
    const { mutate: changeAdsPublishStatus }: any = useMutation<any>(advertisementStatusChange,
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
            <div className='flex flex-col sm:px-6 lg:px-8'>
                <div className='flex flex-row justify-between items-center'>
                    <PageTitle title='Advertisement' />
                    {
                        (checkSubset(['SUPERADMIN', 'ADMIN', 'USER'], roles) || canPublish) &&
                        <Button
                            label='Add Advertisement'
                            buttonType=""
                            className="bg-primary"
                            onClick={() => {
                                toggleIsVisible(true);
                                setState(initialState);
                                setEdit(false)
                            }}
                        />
                    }
                </div>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full '>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <Search query={query} placeholder="Search advertisement" handleSearch={handleSearch} />
                            <div className="">
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
                        </div>
                    </div>
                </div>
                <SidePanel
                    isVisible={isVisible}
                    onClose={() => {
                        toggleIsVisible(!isVisible);
                        setFormErrors({});
                    }}
                    wide="2xl"
                    title={edit ? 'Edit Advertisement' : 'Add Advertisement'}
                    primaryButtonAction={() => {
                        setFormErrors({});
                        state?.id ? update(state) :
                            mutate(state)
                    }}
                    primaryButtonLoading={creatingAdvertisement || updatingAdvertisement}
                >
                    <React.Suspense fallback='loading'>
                        <AdvertisementsForm state={state} setState={setState} error={formerrors} edit={edit} />
                    </React.Suspense>
                </SidePanel>
            </div>
        </>
    )
}
