import React from 'react'

function AdvertisementCard({ advertisement }: any) {
    return (
        <div className="p-3 bg-white">
            <div className='  border-4 border-black shadow-xl hover:shadow-2xl transition duration-500 p-4 pl-8 cursor-pointer shadow-indigo-100 hover:shadow-indigo-300' id="advertisement-card">
                <div className="" key={advertisement?.id}>
                    {/* <h1>{advertisement?.data}</h1> */}
                    <p className='relative right-4'>Category: {advertisement?.advertisementType?.name}</p>
                    <div dangerouslySetInnerHTML={{ __html: advertisement?.data }}></div>
                    <div className="flex md:justify-between pt-4">
                        <p>Province: {advertisement?.province?.name}</p>
                        <p>District: {advertisement?.district?.name}</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AdvertisementCard