
import React from "react";
import { classNames } from "../utils";

interface InputProps {
    label?: string;
    labelClassName?: string;
    name: string;
    type: string;
    placeholder: string;
    className?: string;
    value: string | number;
    onChange?: any;
    error?: string[] | string | undefined | any;
}
const Input = ({
    label,
    labelClassName = "",
    name,
    type,
    placeholder,
    className = "",
    value,
    onChange,
    error,
    ...rest
}: InputProps) => {
    return (
        <div className="flex flex-col md:flex-row space-x-2 md:items-center">
            {label && (
                <label
                    className={classNames(
                        "block text-sm font-semibold text-gray-700 w-1/2",
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}
            {
                type == 'textarea' ? <div>
                    < textarea
                        {...rest}
                        onChange={onChange}
                        rows={7}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        className={classNames(className,
                            "appearance-none block w-2/3 px-3 py-2 border border-primary rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-primaryGreen focus:border-primaryGreen sm:text-sm")}
                    ></textarea>
                    <div className="py-1">
                        {error && <p className="text-red-500 text-xs ">{error[0]}
                        </p>}
                    </div>
                </div> : <div>
                    <input
                        {...rest}
                        type={type}
                        onChange={onChange}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        className={classNames(className,
                            "appearance-none block w-2/3 px-3 py-2 border border-primary rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-primaryGreen focus:border-primaryGreen sm:text-sm")}
                    />
                    <div className="py-1">
                        {error && <p className="text-red-500 text-xs ">{error[0]}
                        </p>}
                    </div>
                </div>
            }
        </div>
    );
};

export default Input;
