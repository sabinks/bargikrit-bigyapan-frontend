import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { remark } from "remark";
import remarkHtml from "remark-html";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import dynamic from "next/dynamic";
import { read } from "fs";

export interface EditorContentChanged {
    html: string;
    markdown: string;
}

export interface EditorProps {
    label?: string;
    value?: string;
    defaultValue?: string;
    charLimit: number;
    onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ 'color': ['#000000', '#e76f51', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }],
    [{ 'background': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }],
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
    const [value, setValue] = useState<string>("");
    const { charLimit } = props
    const [currentChart, setCurrentChar] = useState(0)
    useEffect(() => {
        setValue(props?.value ? props.value : "")
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
            <div className="h-96">
                <label className="block text-sm font-semibold text-gray-700">{props?.label}<span className="text-xs"> (Note: Only {charLimit} characters is allowed)</span></label>
                <ReactQuill
                    className="h-72 overflow-y-visible mt-1"
                    theme="snow"
                    placeholder="Fill advertisement information here..."
                    modules={{
                        toolbar: {
                            container: TOOLBAR_OPTIONS
                        },
                    }}

                    value={value}
                    onChange={(value, delta, source, editor) => {
                        setCurrentChar(editor.getLength())
                        if (editor.getLength() <= charLimit) {
                            onChange(value)
                        }
                    }}
                    defaultValue={props.defaultValue}
                />
            </div>
            <p className="text-sm text-right text-red-500">Remaining Character: {charLimit - currentChart}</p>
            {/* {<p className="text-red-500 text-xs">Characters limit: {charLimit - value?.length}, extra characters will be omitted.  </p>} */}
        </div>
    );
}
