import React, { memo, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import {
    Editable,
    Slate,
    withReact,
} from "slate-react";

import { toggleMark, withImage, withInline } from "@/components/elements/util/TextEditor/TextEditorUtil";
import TextEditorTool from "@/components/elements/util/TextEditor/TextEditorTool";
import { CustomElement, CustomText, EditorType, TextEditorMark } from "@/components/elements/util/TextEditor/TextEditorType";
import { RenderElement } from "@/components/elements/util/TextEditor/TextEditorRender";
import { RenderLeaf } from "@/components/elements/util/TextEditor/TextEditorLeaf";

interface TextEditorProps {
    name: string;
    placeholder: string;
    initialValue: string;
    className?: string;
    isEdit?: boolean;
    onChange: (value: string) => void;
    onReset: () => void
}

declare module "slate" {
    interface CustomTypes {
        Editor: EditorType;
        Element: CustomElement;
        Text: CustomText;
    }
}

const TextEditor = ({ name, placeholder, isEdit = false, onChange, initialValue, className }: TextEditorProps) => {
    const [editor] = useState(withImage(withInline(withHistory(withReact(createEditor())))));
    const defaultValue = [{ type: 'paragraph', children: [{ text: '' }] }]
    const initValue = useMemo(() => {
        if (initialValue) {
            const initValue = JSON.parse(initialValue)
            if (initValue.length === 0 && !isEdit) return defaultValue
            return initValue;
        } else {
            if (!isEdit) return defaultValue
            return []
        }
    }, [initialValue]);
    // const resetEditor = () => {
    //     Transforms.delete(editor, { at: [0] }); // Remove existing content
    //     Transforms.insertNodes(editor, defaultValue, { at: [0] }); // Insert default value
    // };

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        const key = event?.key?.toLowerCase();
        if (key === "b" && event?.ctrlKey) {
            toggleMark(editor, TextEditorMark.Bold);
        }
        if (key === "i" && event?.ctrlKey) {
            toggleMark(editor, TextEditorMark.Italic);
        }
        if (key === "u" && event?.ctrlKey) {
            toggleMark(editor, TextEditorMark.Underline);
        }
        if (key === "z" && event?.ctrlKey) {
            editor.undo();
        }
        if (key === "y" && event?.ctrlKey) {
            editor.redo();
        }
    };
    if (initValue.length === 0) return null
    return (
        <Slate
            editor={editor}
            onValueChange={(value) => {
                const valueString = JSON.stringify(value)
                onChange(valueString);
            }}
            initialValue={initValue.length === 0 ? [{ type: 'paragraph', children: [{ text: '' }] }] : initValue}
        >
            <div>
                <TextEditorTool />
                <Editable
                    disableDefaultStyles
                    className={`border-2 border-black p-2 relative rounded-md ${className}`}
                    name={name}
                    renderPlaceholder={({ attributes }) => <span {...attributes} className="absolute">{placeholder}</span>}
                    placeholder={placeholder}
                    autoFocus
                    renderLeaf={RenderLeaf}
                    renderElement={RenderElement}
                    onKeyDown={onKeyDown}
                />
            </div>
        </Slate >
    );
}

export default memo(TextEditor);