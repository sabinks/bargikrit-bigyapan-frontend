import { Dialog, Menu, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import { checkSubset, classNames } from "../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { AcademicCapIcon, BanknotesIcon, Bars3Icon, BookmarkIcon, BookmarkSlashIcon, BookmarkSquareIcon, BuildingLibraryIcon, ChatBubbleBottomCenterIcon, ChatBubbleLeftIcon, ChatBubbleLeftRightIcon, CircleStackIcon, Cog6ToothIcon, HomeIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, StarIcon, UserCircleIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import { logout } from "../api/auth";
import { searchUser } from "../api";
import io from 'socket.io-client';
import { APP_NAME } from "@/constants";
import { poppins } from "@/fonts";
import Image from "next/image";
import { setCookie } from "cookies-next";
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const navigation = [
    {
        name: "Dashboard",
        href: '/auth/dashboard',
        icon: HomeIcon,
        roles: ['SUPERADMIN', 'ADMIN', 'PARTNER', 'USER'],
        permission: ''
    },
    {
        name: "Advertisements",
        href: '/auth/advertisements',
        icon: HomeIcon,
        roles: ['SUPERADMIN', 'ADMIN', 'PARTNER'],
        permission: ''
    },
    {
        name: "Advertisement Type",
        href: '/auth/advertisement-type',
        icon: HomeIcon,
        roles: ['SUPERADMIN', 'ADMIN'],
        permission: ''
    },
    {
        name: "Advertisements",
        href: '/auth/member/advertisements',
        icon: HomeIcon,
        roles: ['USER'],
        permission: ''
    },
    {
        name: "Admin",
        href: '/auth/admins',
        icon: AcademicCapIcon,
        roles: ['SUPERADMIN',],
        permission: ''
    },
    {
        name: "Partner",
        href: '/auth/partners',
        icon: HomeIcon,
        roles: ['SUPERADMIN', 'ADMIN'],
        permission: ''
    },
    {
        name: "Users",
        href: '/auth/users ',
        icon: UserCircleIcon,
        roles: ['SUPERADMIN', 'ADMIN'],
        permission: ''
    },
    {
        name: "Role",
        href: '/auth/role',
        icon: BuildingLibraryIcon,
        roles: ['SUPERADMIN'],
        permission: ''
    },

    {
        name: "Favorite",
        href: '/auth/favirate',
        icon: StarIcon,
        roles: ['Super Admin', 'Client'],
        permission: 'menu-favirate'
    },
    {
        name: "Account",
        href: '/auth/account',
        icon: CircleStackIcon,
        roles: ['Super Admin', 'Admin', 'Subagency'],
        permission: 'menu-account'
    },
];


const userNavigation = [
    { name: "Your Profile", href: "/auth/profile" },
    { name: "Sign out" },
];

export default function AuthLayout({ props }: any) {
    const { roles, signout, permissions, show, user, user: { name }, access_token }: any = useAuth();
    console.log(roles);

    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");


    // const { processNotification } = useNotification()const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

    // useEffect(() => {

    //     if (user_id && access_token) {

    //         let ioClient = io(`${SOCKET_URL}`)
    //         ioClient.on("connect_error", (err) => {
    //             console.log(`connect_error due to ${err}`);
    //         });
    //         ioClient.on('connect', () => {
    //             ioClient.emit('salutations', { access_token, user_id });
    //         });
    //         ioClient.on('connection-success', (payload) => {
    //             console.log(payload == '3.141592654' ? 'Connected' : 'Not connected');
    //         })
    //         ioClient.on('new-notification', function (data) {
    //             console.log(data);

    //         })
    //     }
    // }, [user_id])

    // const { mutate } = useMutation<any, Error>(logout,
    //     {
    //         onSuccess: () => {
    //             signout(() => {

    //             });
    //         },
    //         onError: (err: any) => {
    //             console.log("logout Error: ", err);
    //         },
    //     }
    // );
    // useEffect(() => {
    //     if (!checkSubset(['Client'], roles) && query != "") {
    //         refetchSearch()
    //     }
    // }, [query])

    // const { data: searchdata, refetch: refetchSearch }: any = useQuery([query], searchUser,
    //     {
    //         enabled: query != "" ? true : false
    //     }
    // )



    const handleSearch = (id: any, role: string) => {
        setQuery("")
        router.push(`${role.toLocaleLowerCase()}/${id}/profile`)

    }

    function handleSignout() {
        setCookie('token', '')
        setCookie('role', '')
        router.push('/login')
    }

    return (
        <>
            <div onClick={() => setQuery("")} className={`${poppins.className}`}>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as='div'
                        className='hidden fixed inset-0 z-40 md:hidden'
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter='transition-opacity ease-linear duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition-opacity ease-linear duration-300'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'
                        >
                            <div className='relative flex-1 flex  flex-col max-w-xs w-full pt-5 pb-4 bg-primary'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='ease-in-out duration-300'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='ease-in-out duration-300'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                >
                                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                                        <button
                                            type='button'
                                            className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className='sr-only'>Close sidebar</span>
                                            <XMarkIcon
                                                className='h-6 w-6 text-white'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <Link href="/">
                                    <div className='flex-shrink-0 flex items-center px-4'>
                                        <img
                                            className='h-8 w-auto'
                                            src='/assets/bb-250.png'
                                            alt={APP_NAME}
                                        />
                                        <p className='font-extrabold text-white px-3 text-xl'>
                                            {APP_NAME}
                                        </p>
                                    </div>
                                </Link>
                                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                                    {
                                        <>
                                            <nav className='px-2 space-y-1'>
                                                {
                                                    navigation.map((item: any) => (
                                                        // show(item?.permission) &&
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className={
                                                                classNames(
                                                                    router?.asPath === item.href
                                                                        ? "bg-secondary text-white font-semibold"
                                                                        : "text-primary2 hover:text-white hover:secondary hover:font-semibold",
                                                                    "group text-white flex items-center px-1 py-1.5 text-base rounded-md"
                                                                )
                                                            }

                                                        >
                                                            <item.icon
                                                                className='mr-4 flex-shrink-0 h-6 w-6  '
                                                                aria-hidden='true'
                                                            />
                                                            {item.name}

                                                        </Link>
                                                    )
                                                    )}

                                            </nav>

                                            <Link

                                                href={'/auth/setting'}
                                                className={
                                                    classNames(
                                                        router?.asPath === '/auth/setting'
                                                            ? "bg-secondary text-white font-semibold"
                                                            : "text-primary2 hover:text-white hover:secondary hover:font-semibold",
                                                        "group text-white flex items-center px-2 mb-3 py-1 space-x-2 text-base rounded-md"
                                                    )
                                                }

                                            >
                                                <Cog6ToothIcon className="w-5" />
                                                <span>Setting</span>
                                            </Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className='hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0'>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className='flex flex-col  flex-grow pt-5 bg-primary overflow-y-auto'>
                        <Link href="/">
                            <div className='flex items-center flex-shrink-0 px-2'>
                                <Image
                                    className='h-8 w-auto'
                                    src='/assets/bb-250.png'
                                    alt={APP_NAME ? APP_NAME : ''}
                                    width="100"
                                    height="100"
                                />
                                <p className='font-extrabold text-secondary px-3 text-xl'>
                                    {APP_NAME}
                                </p>
                            </div>
                        </Link>

                        <div className='mt-5 flex-1 flex flex-col'>
                            {
                                <>
                                    <nav className='flex-1 px-1 pb-2 space-y-1'>
                                        {
                                            navigation.map(
                                                (item: any) => (
                                                    checkSubset(item.roles, roles) &&
                                                    // show(item?.permission) &&
                                                    < Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={
                                                            classNames(
                                                                router?.asPath === item.href
                                                                    ? "bg-secondary text-white"
                                                                    : "text-primary2 hover:text-gray-dark",
                                                                "group text-white flex items-center px-2 py-1.5 rounded-md hover:bg-secondary transition duration-300"
                                                            )
                                                        }

                                                    >
                                                        <>
                                                        </>
                                                        <item.icon
                                                            className='mr-3 flex-shrink-0 h-5 w-5 '
                                                            aria-hidden='true'
                                                        />
                                                        {item.name}
                                                    </Link>

                                                ))
                                        }
                                    </nav>
                                    <Link
                                        href={'/auth/setting'}
                                        className={
                                            classNames(
                                                router?.asPath === '/auth/setting'
                                                    ? "bg-secondary text-white font-semibold"
                                                    : "text-primary2 hover:text-white hover:secondary hover:font-semibold",
                                                "group text-white flex items-center px-2 mb-3 py-1 space-x-2 text-base rounded-md"
                                            )
                                        }
                                    >
                                        <Cog6ToothIcon className="w-5" />
                                        <span>Setting</span>
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>

                <div className='md:pl-60 flex flex-col'>
                    <div className='sticky top-0 z-10 flex-shrink-0 flex h-12 bg-white shadow'>
                        <button
                            type='button'
                            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cerulean-500 md:hidden'
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className='sr-only'>Open sidebar</span>
                            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                        </button>

                        <div className='flex-1 px-4 flex justify-between'>
                            <div className="flex-1 flex items-center">
                                {!roles.includes('USER') &&

                                    <div>
                                        {/* <label htmlFor="search-field" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                                <MagnifyingGlassCircleIcon className="h-7 w-7" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search-field1"
                                                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                                placeholder="Search"
                                                type="text"
                                                value={query}
                                                autoComplete="off"
                                                onChange={(e) => setQuery(e.target.value)}
                                                name="search"
                                                defaultValue={query}
                                            />
                                        </div> */}
                                    </div>
                                }
                            </div>
                            {/* {
                                searchdata?.data.length > 0 &&

                                <div className={classNames("absolute top-16 bg-white w-2/3 h-64 z-10 p-3 overflow-y-auto border border-gray-100 shadow-lg rounded-bl-lg rounded-br-lg", !searchdata?.data.length ? "h-40 flex justify-center items-center" : "")}>
                                    {
                                        searchdata.data.length > 0 ?
                                            <>
                                                {
                                                    searchdata?.data?.map((el: any) => (
                                                        <div key={el.id}
                                                            className="py-3 hover:bg-primary text-gray-800  group hover:text-white rounded-md pl-2 cursor-pointer"
                                                            onClick={() => handleSearch(el.id, el.roles[0]?.name)}
                                                        >
                                                            <span className="flex gap-x-2 items-center">
                                                                <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-400 group-hover:text-white" aria-hidden="true" />
                                                                <span className=" group-hover:text-white">
                                                                    {el.name}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                            :
                                            <div className="text-center text-red-400  font-medium">
                                                <h1>!! No Data Found !!</h1>
                                            </div>
                                    }
                                </div>
                            } */}
                            <div className='ml-4 flex items-center md:ml-6'>

                                {/* <span className='sr-only'>View notifications</span> */}
                                {/* <NotificationPopOver /> */}

                                {/* Profile dropdown */}
                                <Menu as='div' className='ml-6 relative'>
                                    <div className="flex items-center gap-x-4">
                                        <h1 className="font-bold text-gray-dark">{name}</h1>
                                        <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500'>
                                            <span className='sr-only'>Open user menu</span>
                                            <img
                                                className='h-8 w-8 rounded-full'
                                                src={user?.profile_image != null ? `${user?.path}${user?.profile_image}` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                                alt=''
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }: { active: boolean }) => (
                                                        <div >
                                                            {item.href ? (
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={
                                                                        () => { console.log("helo") }
                                                                    }
                                                                    className={classNames(
                                                                        active ? "bg-secondary text-white" : "",
                                                                        "block px-4 py-2 text-sm text-gray-dark rounded-t-md transition duration-300"
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ) : (
                                                                <span className={classNames(
                                                                    active ? "bg-secondary text-white" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-b-md"
                                                                )} onClick={() => {
                                                                    handleSignout()
                                                                }}>{item.name}</span>

                                                            )}
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className='py-2 px-4 max-w-full'>
                        {props}
                    </main>
                </div>
            </div >
            {/* <ToastContainer /> */}
        </>
    );
}
