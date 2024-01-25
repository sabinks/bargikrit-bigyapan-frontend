"use client"
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiClient } from '../api';
function AdvertisementListing() {

    const getAdvertisements = async () => {
        const response = await apiClient.get('/next/advertisements')
        console.log('data', response.data)
        const { content } = response.data
    }
    return (
        <div>
            <div>
                <InfiniteScroll
                    dataLength={2}
                    next={getAdvertisements}
                    hasMore={true} // Replace with a condition based on your data source
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more data to load.</p>}
                >
                    <ul>
                        {/* {items.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))} */}
                    </ul>
                </InfiniteScroll>
                {/* {error && <p>Error: {error.message}</p>} */}
            </div>
        </div>
    )
}

export default AdvertisementListing