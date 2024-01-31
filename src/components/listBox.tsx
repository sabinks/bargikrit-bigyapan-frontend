import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FaIcons } from "react-icons/fa";

type selected = { name: string; id: number };


export default function ListBox({
    label,
    people,
    selected,
    setSelected,
    placeholder,
    ...props
}:
    {
        label?: string,
        people: any[],
        selected?: selected,
        setSelected: any,
        placeholder?: string,
        [key: string]: any,
    }) {
    return (
        <div className='w-full  '>
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        {label && (
                            <Listbox.Label className='block text-sm font-semibold text-gray-700'>
                                {label}
                            </Listbox.Label>
                        )}
                        <div className='relative mt-1'>
                            <Listbox.Button
                                className='relative w-full  cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300  focus:outline-none  sm:text-sm '
                                {...props}
                            >
                                <span className='block truncate'>
                                    {selected?.name ? selected?.name : placeholder ? placeholder : "Select-one"}
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                    <FaIcons
                                        className='h-5 w-5 text-gray-400'
                                        aria-hidden='true'
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <Listbox.Options className='z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    {people?.map((person: any, I: number) => (
                                        <Listbox.Option
                                            key={I}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-secondary text-white font-bold" : "text-gray-900"
                                                }`
                                            }
                                            value={person}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                            }`}
                                                    >
                                                        {person.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                            <CheckIcon
                                                                className='h-5 w-5'
                                                                aria-hidden='true'
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}
