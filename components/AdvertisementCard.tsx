import { montserrat, nunitoSans } from '@/fonts'
import React from 'react'

function AdvertisementCard({ advertisement }: any) {
    return (
        <div className="p-3 bg-white">
            <div className='  border-4 border-black shadow-xl hover:shadow-2xl transition duration-500 p-4 pl-8 cursor-pointer shadow-indigo-100 hover:shadow-indigo-300' id="advertisement-card">
                <div className="" key={advertisement?.id}>
                    {/* <h1>{advertisement?.data}</h1> */}
                    <h1 className={`${montserrat.className} py-4 text-3xl`}>{advertisement?.companyName}</h1>
                    <h3 className='text-center bg-gray-dark text-white py-2 rounded-tr-2xl rounded-bl-2xl'>{advertisement?.name}</h3>

                    <div dangerouslySetInnerHTML={{ __html: advertisement?.data }}></div>
                    <span className='bg-secondary px-4 py-1 text-white rounded-xl text-sm'>Category: {advertisement?.advertisementType?.name}</span>

                    <div className="flex md:justify-between pt-4">
                        <p className=''>Province: {advertisement?.province?.name}</p>
                        <p className=''>District: {advertisement?.district?.name}</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AdvertisementCard