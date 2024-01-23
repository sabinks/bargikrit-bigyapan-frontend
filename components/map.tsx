import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"


import dynamic from 'next/dynamic';


export default function Map({ label, lat, lng, onPin }: any) {
    const defaultLocation = { lat: 27.7172, lng: 85.3240 }

    const [map, setMap] = useState<any>(/**@type google.maps.Map */(null))
    const [marker, setMarker] = useState<any>()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
        libraries: ['places']
    })

    const containerStyle = {
        width: '100%',
        height: '600px'
    };

    useEffect(() => {
        if (lat && lng) {
            lat = parseFloat(lat)
            lng = parseFloat(lng)
            setMarker({ lat, lng })
        }
    }, [lat, lng])





    return (
        <div className='space-y-4'>
            {
                isLoaded &&
                <>
                    <label className={"block text-sm font-semibold text-gray-700"}>{label}</label>

                    <GoogleMap
                        center={marker ? marker : defaultLocation}
                        mapContainerStyle={containerStyle}
                        zoom={marker ? 13 : 10}
                        onLoad={(map: any) => setMap(map)}
                        onClick={(data: any) => {
                            onPin && onPin(data.latLng?.lat(), data.latLng?.lng())
                        }
                        }



                    >
                        {
                            marker &&
                            <MarkerF
                                position={marker}
                            />
                        }
                    </GoogleMap>

                </>
            }

        </div>
    )
}
