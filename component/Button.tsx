import React from "react";
import { classNames } from "../utils/index";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    buttonType?:
    | "primary"
    | "secondary"
    | "link"
    | "danger"
    | "next_prev"
    | "success"
    | "warning"
    | "submit"
    | "info"
    | "";
    loading?: boolean;
    label?: string;
    className?: string;
    fullWidth?: boolean;
    labelOnLeft?: boolean;
    icon?: JSX.Element;
    disable?: boolean;
    [key: string]: any;
};
export default function Button({
    type = "button",
    buttonType = "primary",
    loading = false,
    label,
    fullWidth = false,
    labelOnLeft = false,
    className = "",
    disable = false,
    icon,
    ...props
}: ButtonProps) {
    let buttonTypeClass = "";
    switch (buttonType) {
        case "primary":
            buttonTypeClass = "p-1.5 rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
            break;
        case "secondary":
            buttonTypeClass = "p-1.5 rounded-md text-white bg-gray-600  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600";
            break;
        case "danger":
            buttonTypeClass = "p-1.5 rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600";
            break;
        case "warning":
            buttonTypeClass = "p-1.5 rounded-md text-white bg-warning hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600";
            break;
        case "info":
            buttonTypeClass = "p-1.5 rounded-md text-white bg-da hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500";
            break;
        case "next_prev":
            buttonTypeClass = "rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600";
            break;
        case "submit":
            buttonTypeClass = "rounded-full text-white bg-submit";
            break;
        default:
            buttonTypeClass = "p-1.5 rounded-md bg-primary text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600";
            break;
    }

    return (
        <>
            <button
                type={type}
                disabled={disable}
                className={classNames(
                    fullWidth ? "w-full" : "",
                    "flex  border border-transparent shadow-sm text-sm font-medium disabled:opacity-75 disabled:cursor-not-allowed scale-100 hover:scale-105 hover:drop-shadow-md transition transform duration-500",
                    buttonTypeClass,
                    labelOnLeft ? " justify-start" : " justify-center",
                    // label ? "px-2" : "",
                    className
                )}
                {...props}
            >
                <div className="flex">
                    <div className="">
                        {
                            loading ? (
                                <svg
                                    className="animate-spin  h-5 w-5 text-white z-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : <>
                                {
                                    icon && (
                                        <div
                                            className={
                                                buttonType == "primary"
                                                    ? ""
                                                    : buttonType == "danger"
                                                        ? "w-5 "
                                                        : buttonType == "next_prev"
                                                            ? "w-5 text-white"
                                                            : "w-5"
                                            }
                                        >
                                            {icon}
                                        </div>
                                    )
                                }
                                {
                                    label &&
                                    <span>{label}</span>
                                }
                            </>
                        }
                    </div>

                </div>
            </button>
        </>
    );
}
