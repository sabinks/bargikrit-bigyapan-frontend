import React, { useEffect, useState } from 'react'
import { getPlaiceholder } from "plaiceholder";
import Image from 'next/image';

async function getBlurData(src: string) {
    const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
    );

    const data = await getPlaiceholder(buffer);
    return data;
}

export default function NextImage({ src }: any) {

    const [base64, setBase64] = useState("")

    useEffect(() => {
        const getBase64 = async () => {
            const { base64 } = await getBlurData(src);
            setBase64(base64)
        }

        getBase64()

    }, [])


    return (
        <>{
            base64 &&
            <Image
                src={src}
                alt={src}
                fill
                className="object-center"
                placeholder="blur"
                blurDataURL={base64}
            />
        }
        </>
    )
}
