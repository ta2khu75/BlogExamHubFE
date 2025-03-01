"use client"
import Modal from "@/components/elements/util/Modal";
import { TEXT_BLOCKS, TextEditorMark, TEXT_MARKS, HEADINGS, TextEditorBlock } from "@/components/elements/util/TextEditor/TextEditorType";
import { insertImage, insertLink, isBlockActive, isLinkActive, isMarkActive, toggleBlock, toggleMark, unwrapLink } from "@/components/elements/util/TextEditor/TextEditorUtil";
import UploadImage from "@/components/elements/util/TextEditor/UploadImage/UploadImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Link, Redo, Undo, Unlink } from "lucide-react";
import { useState } from "react";
import { useSlate } from "slate-react";
export default function TextEditorTool() {
    const [url, setUrl] = useState<string>("")
    const [openUrl, setOpenUrl] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [openImage, setOpenImage] = useState(false)
    const editor = useSlate();

    const onMarkClick = (id: TextEditorMark) => {
        toggleMark(editor, id);
    };

    const getMarkSelectionProps = (id: TextEditorMark) => {
        if (isMarkActive(editor, id))
            return undefined
        return "outline"
    };

    const onBlockClick = (id: TextEditorBlock) => {
        toggleBlock(editor, id);
    };

    const getBlockSelectionProps = (id: TextEditorBlock) => {
        if (isBlockActive(editor, id))
            return undefined
        return "outline"
    };
    const onAddImage = (url: string) => {
        insertImage(editor, url)
        setOpenImage(false)
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Select defaultValue="paragraph" onValueChange={(value) => toggleBlock(editor, value as TextEditorBlock)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Font size" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {HEADINGS.map((heading) => (
                            <SelectItem key={heading} value={heading}>{heading}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {TEXT_MARKS.map(({ id, icon }) => (
                <Button
                    key={id}
                    onMouseDown={() => onMarkClick(id)}
                    variant={getMarkSelectionProps(id)}
                >
                    {icon}
                </Button>
            ))}
            <Button type="button"
                variant={isLinkActive(editor) ? "default" : "outline"}
                onMouseDown={() => {
                    setOpenUrl(true)
                }}>
                <Link />
            </Button>
            <Button
                type="button" variant="outline" disabled={!isLinkActive(editor)} onMouseDown={() => {
                    if (isLinkActive(editor)) {
                        unwrapLink(editor)
                    }
                }}>
                <Unlink />
            </Button>
            <Button type="button" variant="outline" onMouseDown={() => { setOpenImage(true) }}>
                <Image />
            </Button>
            {TEXT_BLOCKS.map(({ id, icon }) => (
                <Button
                    key={id}
                    variant={getBlockSelectionProps(id)}
                    onMouseDown={() => onBlockClick(id)}
                >{icon}</Button>
            ))}
            <Button disabled={editor.history.undos.length == 0} onMouseDown={() => editor.undo()}><Undo /></Button>
            <Button disabled={editor.history.redos.length == 0} onMouseDown={() => editor.redo()}><Redo /></Button>
            <Modal open={openUrl} onCancel={() => { setOpenUrl(false); setUrl("") }}>
                <form className="flex items-center" onSubmit={(e) => {
                    e.preventDefault();
                    if (!url) return
                    insertLink(editor, url); setOpenUrl(false); setUrl("")
                }}>
                    <Label>URL</Label>
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                    <Button type="submit">Submit</Button>
                </form>
            </Modal>
            <Modal open={openImage} className="max-w-max" onCancel={() => setOpenImage(false)} >
                <UploadImage setOpen={setOpenImage} onAdd={(url) => onAddImage(url)} imageUrls={imageUrls} setImageUrls={setImageUrls} />
            </Modal>
        </div >
    );
}