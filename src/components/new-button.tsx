import { useEffect, useLayoutEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { classNames } from "@/utils";


type ButtonProps = {
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    label?: string;
    className?: string;
    fullWidth?: boolean;
    labelOnLeft?: boolean;
    icon?: JSX.Element;
    disable?: boolean;
    tooltip?: string;
    tooltipId?: string;
    [key: string]: any;
};
export default function NewButton({
    type = "button",
    loading = false,
    label,
    fullWidth = false,
    labelOnLeft = false,
    className = "",
    disable = false,
    icon,
    tooltip,
    tooltipId,
    ...props
}: ButtonProps) {
    // const [show, setShow] = useState(false)


    return (
        <div className="">
            <button
                id={tooltipId}
                type={type}
                disabled={disable}
                className={classNames(
                    fullWidth ? "w-full" : "",
                    "flex items-center border border-transparent shadow-sm text-sm font-medium disabled:opacity-75 disabled:cursor-not-allowed scale-100 hover:scale-105 hover:drop-shadow-md transition transform duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    labelOnLeft ? " justify-start" : " justify-center",
                    label ? "px-2" : '',
                    className
                )}
                {...props}
            >
                <div className="flex items-center">
                    {loading && (
                        <span className="m-1">
                            <svg
                                className='animate-spin  h-4 w-4 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                ></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                ></path>
                            </svg>
                        </span>
                    )}
                    {icon && (
                        <div
                            className="m-1"
                        >
                            {icon}
                        </div>
                    )}
                    {
                        label && <span>{label}</span>
                    }

                </div>
            </button>


            {
                <Tooltip anchorSelect={`#${tooltipId}`} place="bottom-start" className="bg-primary bg-opacity-80 z-50" >
                    {tooltip}
                </Tooltip>
            }

            <div></div>
        </div>
    );
}
