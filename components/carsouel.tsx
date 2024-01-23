import React from 'react'
import Carousel from 'react-multi-carousel';


export const responsiveType = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1536 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1536, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 660 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 660, min: 0 },
        items: 1
    }
};


export default function Carsouel({ children }: { children: JSX.Element }) {
    return (
        <Carousel
            ssr={true}
            swipeable={false}
            draggable={false}
            responsive={responsiveType}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            showDots={false}
            slidesToSlide={1}
            rewindWithAnimation={true}
            centerMode={false}
            arrows={true}
            containerClass=""
            itemClass=""
            dotListClass="text-bg-secondary"
        >
            {children}
        </Carousel>
    )
}
