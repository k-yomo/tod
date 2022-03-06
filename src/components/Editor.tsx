import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useCodeMirror } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { getCM, vim } from '@replit/codemirror-vim';
import { languages } from '@codemirror/language-data';
import { oneDark } from '../lib/codemirrorutil/themes/atomOneDark';
import { useDebounce } from '../lib/debounce';
import { saveMarkdown } from '../services/storage';
import { hyperLinkPlugin } from '../lib/codemirrorutil/view/hyperLinkPlugin';

interface Props {
  initialMarkdown: string;
}

export default function Editor({ initialMarkdown }: Props) {
  const editorRef = useRef<HTMLDivElement>();
  const [curView, setView] = useState<EditorView | undefined>();
  const [markdownText, setMarkdown] = useState('');
  const debouncedMarkdown = useDebounce(markdownText, 1000);

  const { setContainer, view } = useCodeMirror({
    value: initialMarkdown,
    basicSetup: false,
    container: editorRef.current,
    onUpdate: (viewUpdate) => {
      setMarkdown(viewUpdate.state.doc.toJSON().join('\n'));
    },
    extensions: [
      EditorView.domEventHandlers({
        beforeinput: (e) => {
          const preventInputModes = ['normal', 'visual', 'visual block'];
          if (
            curView &&
            (!getCM(curView)?.state?.vim.mode ||
              preventInputModes.includes(getCM(curView)?.state?.vim.mode))
          ) {
            e.preventDefault();
          }
        },
      }),
      vim(),
      basicSetup,
      markdown({
        addKeymap: true,
        base: markdownLanguage,
        codeLanguages: languages,
      }),
      hyperLinkPlugin,
    ],
    theme: oneDark,
  });
  setView(view);

  useEffect(() => {
    saveMarkdown(debouncedMarkdown);
  }, [debouncedMarkdown]);

  useEffect(() => {
    if (editorRef.current) {
      setContainer(editorRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current]);

  return <div id="editor" ref={editorRef as any} />;
}
