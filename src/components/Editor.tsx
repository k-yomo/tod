import {h} from "preact";
import {useEffect, useRef, useState} from "preact/hooks";
import {useCodeMirror} from "@uiw/react-codemirror";
import {EditorView} from "@codemirror/view";
import {basicSetup} from "@codemirror/basic-setup";
import {markdown, markdownLanguage} from "@codemirror/lang-markdown";
import {getCM, vim} from "@replit/codemirror-vim";
import {languages} from "@codemirror/language-data";
import {oneDark} from "@codemirror/theme-one-dark";
import {useDebounce} from "../lib/debounce";
import {saveMarkdown} from "../services/storage";

export default function Editor({ initialText }: { initialText: string }) {
    const editorRef = useRef<HTMLDivElement>();
    const [curView, setView] = useState<EditorView | undefined>()
    const [markdownText, setMarkdown] = useState("")
    const debouncedMarkdown = useDebounce(markdownText, 1000);

    const {setContainer, view} = useCodeMirror({
        value: initialText,
        basicSetup: false,
        container: editorRef.current,
        onUpdate: (viewUpdate) => {
            setMarkdown(viewUpdate.state.doc.toJSON().join("\n"))
        },
        extensions: [
            EditorView.domEventHandlers({
                beforeinput: (e) => {
                    if (curView && getCM(curView)?.state?.vim.mode == "normal") {
                        e.preventDefault()
                    }
                },
            }),
            vim(),
            basicSetup,
            markdown({
                addKeymap: true,
                base: markdownLanguage,
                codeLanguages: languages
            })
        ],
        theme: oneDark,
    });
    setView(view)

    useEffect(() => {
        saveMarkdown(debouncedMarkdown)
    }, [debouncedMarkdown])

    useEffect(() => {
        if (editorRef.current) {
            setContainer(editorRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorRef.current]);

    return (
        <div>
            <div id="editor" ref={editorRef as any}/>
        </div>
    )
}