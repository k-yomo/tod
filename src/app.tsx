import {createRef, h} from "preact";
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import './styles/globals.css'

export function App() {
    const editorRef = createRef();
    return (
        <>
            <Editor
                initialValue=""
                initialEditType="markdown"
                previewStyle="tab"
                height="100vh"
                useCommandShortcut
                hideModeSwitch
                extendedAutolinks
                theme='dark'
                ref={editorRef}
            />
        </>
    )
}
