import React from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



type InputProps = {
    min?: number;
    max?: number;
    value: number;
    disabled?: boolean;
    vertical?: boolean;
    reverse?: boolean;
    tooltip?: boolean;
    error?: string | undefined;
    [key: string]: any;
    range?: boolean;
    handleChange: any
};

export default function SliderInput({
    min = 0,
    max = 100,
    value = 0,
    disabled = false,
    vertical = false,
    reverse = false,
    label,
    range = true,
    handleChange
}: InputProps
) {
    return (
        <div>
            {
                label &&
                <label htmlFor="">{label}</label>
            }
            <Slider
                min={min}
                max={max}
                disabled={disabled}
                vertical={vertical}
                reverse={reverse}
                value={value}
                range={range}
                allowCross={false}
                draggableTrack
                keyboard={true}
                onChange={handleChange}
                count={1}
            />


        </div>
    )
}
