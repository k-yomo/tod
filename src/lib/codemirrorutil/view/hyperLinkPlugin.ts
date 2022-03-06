import {
    Decoration,
    DecorationSet,
    EditorView,
    MatchDecorator,
    ViewPlugin,
    ViewUpdate,
    WidgetType
} from "@codemirror/view";
import  { open } from "@tauri-apps/api/shell"

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

class HyperLinkWidget extends WidgetType {
    public url: string;
    constructor(url: string) {
        super();
        this.url = url
    }
    public toDOM(): HTMLElement {
        const el = document.createElement('a');
        el.classList.add('cmt-url');
        el.href = this.url
        el.innerText = this.url
        el.addEventListener("click", async (e) => {
            e.preventDefault()
            await open(this.url)
        })
        return el;
    }
}

function hyperLink(view: EditorView) {
    let decorator = new MatchDecorator(
        {
            regexp: new RegExp(urlRegex, 'g'),
            decoration: (match) => {
                return Decoration.replace({
                    widget: new HyperLinkWidget(match[0])
                })
            },
        }
    )
    return decorator.createDeco(view)
}

export const hyperLinkPlugin = ViewPlugin.fromClass(class {
    decorations: DecorationSet

    constructor(view: EditorView) {
        this.decorations = hyperLink(view)
    }

    update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged)
            this.decorations = hyperLink(update.view)
    }
}, {
    decorations: v => v.decorations,
})


