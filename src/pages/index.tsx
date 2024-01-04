import { backedApiUrl } from '@/api/constants';
import axios from 'axios'
import Zoom from 'react-medium-image-zoom'

export default function Home({ quotes, domain }: any) {

    const scrolltoHash = function (element_id: string) {
        const element = document.getElementById(element_id)
        element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
    const loaderProp = ({ src }: any) => {
        return src;
    }
    return (
        <main className={`container mx-auto`}>
            <div className="grid grid-cols-4 gap-4">
                {
                    quotes.map((quote: any, index: number) => {
                        return <ImageZoom key={index} src={`${domain}/${quote.filename}`} alt={"Name"} zoom="500" />
                    })
                }
            </div>
        </main >
    )
}
export const ImageZoom = ({ key, src, alt, width }: any) => (
    <div className="" key={key}>
        <Zoom>
            <img
                alt={alt}
                src={src}
                width={width}
            />
        </Zoom>
    </div>
)
export async function getServerSideProps(context: any) {
    const { } = context
    const response = await axios({
        method: 'get',
        url: backedApiUrl + '/next-wallpaper-quotes',
    });
    return {
        props: {
            quotes: response?.data?.data,
            domain: response?.data?.domain
        }
    }
}	
