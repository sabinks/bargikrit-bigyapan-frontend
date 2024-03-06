import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Button from './Button'
import { classNames } from '@/utils'



export default function Modal({
    isVisible = false,
    isButtonVisible = true,
    isPrimaryButtonVisible = true,
    isSecondaryButtonVisible = true,
    primaryButtonLabel = "Confirm",
    primaryButtonAction,
    secondaryButtonLabel = "Cancel",
    title,
    secondaryButtonAction,
    bodyAlign = "text-left",
    // HandleFormSubmit,
    onClose,
    children
}: {
    isVisible: boolean,
    isButtonVisible?: boolean,
    isPrimaryButtonVisible?: boolean,
    isSecondaryButtonVisible?: boolean,
    primaryButtonLabel?: string,
    primaryButtonAction?: () => void,
    secondaryButtonLabel?: string,
    secondaryButtonAction?: () => void,
    bodyAlign?: string,
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
                                <Dialog.Panel className={`w-full md:max-w-5xl transform rounded-lg bg-white p-6 ${bodyAlign} align-middle shadow-xl transition-all`}>
                                    <Dialog.Title
                                        as="h3"
                                        className={classNames("text-2xl leading-6 text-gray-900", !title ? 'text-red-500' : '')}
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
                                    <div className="flex justify-end gap-3">
                                        {
                                            isButtonVisible && isPrimaryButtonVisible &&
                                            <Button
                                                label={primaryButtonLabel}
                                                type={primaryButtonAction ? "submit" : "button"}
                                                // buttonType="secondary"
                                                onClick={primaryButtonAction}
                                            />
                                        }
                                        {
                                            isSecondaryButtonVisible &&

                                            <Button
                                                label={secondaryButtonLabel}
                                                type="button"
                                                buttonType="danger"
                                                onClick={secondaryButtonAction ? secondaryButtonAction : onClose}
                                            />

                                        }
                                    </div>

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
