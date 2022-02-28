import {h} from "preact";
import {useEffect, useState} from "preact/hooks";
import {getMarkdown} from "./services/storage";
import Editor from "./components/Editor";
import './styles/globals.css'

export function App() {
    const [markdownText, setMarkdown] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMarkdown().then(markdown => {
            setMarkdown(markdown)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <Editor initialText={markdownText} />
    )
}
