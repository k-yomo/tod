import { EditorView } from "@codemirror/view"
import { Extension } from "@codemirror/state"
import { HighlightStyle, tags as t } from "@codemirror/highlight"

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const slate = {
  '100': "#f1f5f9",
  '300': "#cbd5e1"
}

const cyan = {
  '500': "#06b6d4",
}

const amber = {
  '500': "#eab308",
}

const chalky = "#e5c07b",
  coral = "#e06c75",
  invalid = "#ffffff",
  ivory = "#abb2bf",
  stone = "#7d8799", // Brightened compared to original to increase contrast
  malibu = "#61afef",
  whiskey = "#d19a66",
  violet = "#c678dd",
  darkBackground = "#21252b",
  highlightBackground = "#2c313a",
  background = "#252b33",
  tooltipBackground = "#353a42",
  selection = "#3E4451",
  cursor = "#528bff"

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme({
  "&": {
    color: slate['300'],
    backgroundColor: background,
  },

  ".cm-content": {
    caretColor: cursor,
  },

  ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },

  ".cm-panels": { backgroundColor: darkBackground, color: ivory },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff",
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f",
  },

  ".cm-activeLine": { backgroundColor: highlightBackground },
  ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847",
    outline: "1px solid #515a6b",
  },

  ".cm-gutters": {
    backgroundColor: background,
    color: stone,
    border: "none",
  },

  ".cm-activeLineGutter": {
    backgroundColor: highlightBackground,
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd",
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: tooltipBackground,
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground,
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: highlightBackground,
      color: ivory,
    },
  },
}, { dark: true })

/// The highlighting style for code in the One Dark theme.
export const oneDarkHighlightStyle = HighlightStyle.define([
  {
    tag: t.keyword,
    color: violet,
  },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: coral,
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: malibu,
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: whiskey,
  },
  {
    tag: [t.definition(t.name), t.separator],
    color: ivory,
  },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: chalky,
  },
  {
    tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
    color: cyan['500'],
  },
  {
    tag: [t.meta, t.comment],
    color: stone,
  },
  {
    tag: t.strong,
    fontWeight: "bold",
  },
  {
    tag: t.emphasis,
    fontStyle: "italic",
  },
  {
    tag: t.strikethrough,
    textDecoration: "line-through",
  },
  {
    tag: t.link,
    color: cyan['500'],
    textDecoration: "underline",
  },
  {
    tag: t.heading,
    fontWeight: "bold",
  },
  {
    tag: t.heading1,
    display: "inline-block",
    marginBottom: "3px",
    paddingBottom: "1px",
    borderBottom: "1px solid #475569",
    fontSize: "1.6rem",
    color: slate['100'],
  },
  {
    tag: t.heading2,
    display: "inline-block",
    marginBottom: "3px",
    paddingBottom: "1px",
    borderBottom: "1px solid #475569",
    fontSize: "1.4rem",
    color: slate['100'],
  },
  {
    tag: t.heading3,
    fontSize: "1.25rem",
    color: slate['100'],
  },
  {
    tag: t.heading4,
    fontSize: "1.1rem",
    color: slate['100'],
  },
  {
    tag: [t.atom, t.bool, t.special(t.variableName)],
    color: amber['500'],
  },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: stone,
  },
  {
    tag: t.invalid,
    color: invalid,
  },
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const oneDark: Extension = [oneDarkTheme, oneDarkHighlightStyle]
