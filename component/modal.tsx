import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { classNames } from '../utils'
import Button from './Button'



export default function Modal({
    isVisible = false,
    isButtonVisible = true,
    primaryButtonLabel = "Confirm",
    primaryButtonAction,
    secondaryButtonLabel = "Cancel",
    title,
    secondaryButtonAction,
    // HandleFormSubmit,
    onClose,
    children
}: {
    isVisible: boolean,
    isButtonVisible?: boolean
    primaryButtonLabel?: string,
    primaryButtonAction?: () => void,
    secondaryButtonLabel?: string,
    secondaryButtonAction?: () => void,
    // HandleFormSubmit?: () => void,
    onClose: () => void,
    title?: string,
    children: JSX.Element,
}) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>

            <Transition appear show={isVisible} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black  bg-opacity-60 backdrop-blur-sm transition-opacity " />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full md:max-w-5xl transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className={classNames("text-lg font-semibold leading-6 text-gray-900", !title ? 'text-red-500' : '')}
                                    >
                                        {children ? title :
                                            <span>
                                                Are you Sure ,You want to delete??
                                            </span>
                                        }
                                    </Dialog.Title>
                                    {/* <form onSubmit={(e: any) => {
                                        e.preventDefault();
                                        HandleFormSubmit
                                    }}> */}
                                    <div className="mt-2">
                                        {children}
                                    </div>
                                    {
                                        isButtonVisible &&
                                        <div className="flex justify-end gap-3">
                                            <Button
                                                label={primaryButtonLabel}
                                                type={primaryButtonAction ? "submit" : "button"}
                                                // buttonType="secondary"
                                                onClick={primaryButtonAction}
                                            />

                                            <Button
                                                label={secondaryButtonLabel}
                                                type="button"
                                                buttonType="danger"
                                                onClick={secondaryButtonAction ? secondaryButtonAction : onClose}
                                            />

                                        </div>
                                    }

                                    {/* </form> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
