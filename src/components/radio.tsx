import { classNames } from "@/utils";

type Option = {
    label: string,
    value: string
}

type RadioProps = {
    label: string;
    name: string;
    className?: string;
    labelClassName?: string;
    required?: boolean;
    options: Option[];
    error?: string | undefined;
    value?: string,
    [key: string]: any;
};

export default function Radio({
    label,
    name,
    className = "",
    labelClassName = "",
    required,
    options = [],
    error,
    value,
    ...rest
}: RadioProps) {
    const errorClass = error ? "border-red-500 " : "";
    return (
        <div>
            {label && (
                <>
                    <label
                        className={classNames(
                            "text-base font-medium text-gray-900",
                            labelClassName
                        )}
                    >
                        {label}
                    </label>
                </>
            )}
            <fieldset className="mt-4">
                {label && <legend className="sr-only">{label}</legend>}
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                id={option.value + name}
                                name={name}
                                type="radio"
                                value={option.value}
                                className={classNames(
                                    "focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300",
                                    className,
                                    errorClass
                                )}
                                {...rest}
                                checked={option.value == value}
                            />
                            <label
                                htmlFor={option.value + name}
                                className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <div className="text-red-500 text-xs my-2 px-1">{error}</div>
        </div>
    );
}
