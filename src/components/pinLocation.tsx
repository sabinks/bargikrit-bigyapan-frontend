import { MapPinIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function PinLocation({ text }: any) {
    return (
        <div className="pin ">
            <MapPinIcon className='h-10' fill='#f54842' stroke='white' />
            <p className="pin-text text-white w-40 mt-2 p-2 border">{text}</p>
        </div>
    )
}
