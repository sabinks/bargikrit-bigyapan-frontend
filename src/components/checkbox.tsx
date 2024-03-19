import { camalize, classNames } from "@/utils";

type CheckboxProps = {
    label: string;
    labelName?: string;
    name: string;
    className?: string;
    checked?: boolean;
    labelClassName?: string;
    [key: string]: any;
    placeholder?: string;
};

export default function CheckBox({
    label,
    name,
    labelName = "",
    className = "",
    labelClassName = "",
    checked = false,
    placeholder = "",
    ...props
}: CheckboxProps) {
    const labelId = label && camalize(label);
    return (
        <div className='flex items-center w-full'>
            <input
                id={labelId}
                name={name}
                type='checkbox'
                checked={checked}
                className={classNames(
                    "h-4 w-4 text-primary focus:ring-transparent border-primary rounded cursor-pointer",
                    className,
                )}
                placeholder={placeholder}
                {...props}
            />
            <label
                htmlFor={labelId}
                className={classNames(
                    "ml-2 block text-sm text-gray-900",
                    labelClassName,
                )}
            >
                {labelName ? labelName : label}
            </label>
        </div>
    );
}
