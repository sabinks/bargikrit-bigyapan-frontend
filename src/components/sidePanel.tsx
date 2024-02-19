import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "@/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
export default function SidePanel({
    isVisible = false,
    title = "Replace your title",
    subtitle,
    wide = "md",
    onClose,
    primaryButtonLabel = "Save",
    primaryButtonAction,
    primaryButtonLoading = false,
    secondaryButtonLabel = "Cancel",
    TertiaryButtonLabel = "Update",
    TertiaryButtonAction,
    secondaryButtonAction,
    children,
}: {
    isVisible: boolean;
    title: string;
    subtitle?: string;
    wide?: "md" | "xl" | "2xl" | "3xl" | "4xl";
    primaryButtonLabel?: string;
    primaryButtonAction?: () => void;
    primaryButtonLoading?: boolean;
    secondaryButtonLabel?: string;
    secondaryButtonAction?: () => void;
    TertiaryButtonLabel?: string;
    TertiaryButtonAction?: () => void;
    onClose: () => void;
    children: JSX.Element;
}) {
    let widthClass;
    switch (wide) {
        case "md":
            widthClass = "max-w-md";
            break;
        case "xl":
            widthClass = "max-w-xl";
            break;
        case "2xl":
            widthClass = "max-w-2xl";
            break;
        case "3xl":
            widthClass = "max-w-3xl";
            break;
        case "4xl":
            widthClass = "max-w-4xl";
            break;
        default:
            widthClass = "max-w-md";
            break;
    }
    return (
        <Transition.Root show={isVisible} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-hidden z-10"
                onClose={onClose}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-90 transition-opacity bg-blend-color-burn" />
                    </Transition.Child>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className={classNames("w-screen", widthClass)}>
                                <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                                    <div className="min-h-0 flex-1 flex flex-col overflow-y-scroll">
                                        <div className="py-6 px-4 bg-primary1 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-xl font-medium text-secondary">
                                                    {title}
                                                </Dialog.Title>
                                                <div className="ml-3 h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="bg-primary1 rounded-md secondary hover:text-accent1 focus:outline-none"
                                                        onClick={onClose}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            {subtitle && (
                                                <div className="mt-1">
                                                    <p className="text-sm text-cerulean-200">
                                                        {subtitle}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            {children}
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-2 px-4 py-4">
                                        <Button
                                            fullWidth
                                            buttonType="danger"
                                            label={secondaryButtonLabel}
                                            onClick={
                                                secondaryButtonAction ? secondaryButtonAction : onClose
                                            }
                                        />
                                        {!TertiaryButtonAction && (
                                            <Button
                                                fullWidth
                                                loading={primaryButtonLoading}
                                                label={primaryButtonLabel}
                                                onClick={primaryButtonAction}
                                            />
                                        )}

                                        {TertiaryButtonAction && (
                                            <Button
                                                fullWidth
                                                loading={primaryButtonLoading}
                                                label={TertiaryButtonLabel}
                                                onClick={TertiaryButtonAction}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
