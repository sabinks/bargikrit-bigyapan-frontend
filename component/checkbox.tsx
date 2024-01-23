import { camalize, classNames } from "../utils";

type CheckboxProps = {
    label: string;
    className?: string;
    labelClassName?: string;
    [key: string]: any;
};

export default function CheckBox({
    label,
    className = "",
    labelClassName = "",
    ...props
}: CheckboxProps) {
    const labelId = label && camalize(label);
    return (
        <div className='flex items-center w-full'>
            <input
                id={labelId}
                name={labelId}
                type='checkbox'
                className={classNames(
                    "h-4 w-4 text-primary1 focus:ring-transparent border-gray-300 rounded cursor-pointer",
                    className,
                )}
                {...props}
            />
            <label
                htmlFor={labelId}
                className={classNames(
                    "ml-2 block text-sm text-gray-900",
                    labelClassName,
                )}
            >
                {label}
            </label>
        </div>
    );
}
