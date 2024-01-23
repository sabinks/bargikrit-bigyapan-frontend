import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { remark } from "remark";
import remarkHtml from "remark-html";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import dynamic from "next/dynamic";

export interface EditorContentChanged {
    html: string;
    markdown: string;
}

export interface EditorProps {
    label?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ 'color': ['#fff', '#000'] }, { 'background': ['#fff', '#000'] }],
    // ["emoji"],
    ["clean"]
];

export function htmlToMarkdown(htmlText: string) {
    const file = remark()
        .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
        .use(rehypeRemark)
        .use(remarkStringify)
        .processSync(htmlText);

    return String(file);
}
export function markdownToHtml(markdownText: string) {
    const file = remark().use(remarkHtml).processSync(markdownText);
    return String(file);
}

export default function Editor(props: EditorProps) {
    const [value, setValue] = useState<string | undefined>();
    const reactQuillRef = useRef<ReactQuill>(null);
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const onChange = (content: string) => {
        setValue(content);

        if (props.onChange) {
            props.onChange({
                html: content,
                markdown: htmlToMarkdown(content)
            });
        }
    };

    return (
        <div className="">
            <label className="block text-sm font-semibold text-gray-700">{props?.label}</label>
            <ReactQuill
                className="h-64 overflow-y-visible mt-1"
                // ref={reactQuillRef}
                theme="snow"
                placeholder="Fill advertisement information here..."
                modules={{
                    toolbar: {
                        container: TOOLBAR_OPTIONS
                    },
                }}
                value={value}
                onChange={onChange}
                defaultValue={props.defaultValue}
            />
        </div>
    );
}
