import {createRef, h} from "preact";
import {useEffect, useState} from "preact/hooks";
import {Editor} from '@toast-ui/react-editor';
import {getMarkdown, saveMarkdown} from "./services/storage";
import {useDebounce} from "./lib/debounce";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import './styles/globals.css'

export function App() {
    const editorRef = createRef();
    const [markdown, setMarkdown] = useState('')
    const [loading, setLoading] = useState(true)
    const debouncedMarkdown = useDebounce(markdown, 1000);

    const onChangeMarkdown = () => {
        const editor = editorRef.current.editorInst
        const markdown = editor.getMarkdown();
        setMarkdown(markdown)
    }

    const onBlur = () => {
        saveMarkdown(markdown)
    }

    useEffect(() => {
        getMarkdown().then(markdown => {
            setMarkdown(markdown)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        saveMarkdown(debouncedMarkdown)
    }, [debouncedMarkdown])

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <>
            <Editor
                initialValue={markdown}
                initialEditType="markdown"
                previewStyle="tab"
                height="100vh"
                useCommandShortcut
                hideModeSwitch
                extendedAutolinks
                onChange={onChangeMarkdown}
                onBlur={onBlur}
                theme='dark'
                ref={editorRef}
            />
        </>
    )
}
