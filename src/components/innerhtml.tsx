import React from 'react'

export default function ParsedContent({ content }: any) {
    return (
        <div dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    )
}
