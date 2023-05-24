"use client";

import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Extensions
import Underline from "@tiptap/extension-underline";

import Placeholder from "@tiptap/extension-placeholder";

import Link from "@tiptap/extension-link";

import Youtube from "@tiptap/extension-youtube";

import TipTapImage from "@tiptap/extension-image";

import { NextPage } from "next";
import ToolBar from "./ToolBar";
import ActionButton from "./ActionButton";
import ThumbnailSelector from "./ThumbnailSelector";
import { Input } from "../ShadeUi/input";
import Button from "../ui/Button";

interface EditorProps {
  initialValue?: string;
  btnTitle?: string;
  busy?: boolean;
  // onSubmit(post: FinalPost): void;
}

const MarkdownEditor: NextPage<EditorProps> = ({
  initialValue,
  btnTitle = "Create Post",
  busy = false,
  // onSubmit,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write something awesome...",
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="flex flex-col flex-1 mx-4 ">
      <div className="flex flex-col flex-1 bg-white border-2 rounded-md">
        <ToolBar editor={editor} />
        <div className="flex w-full  min-h-[400px] mb-4  overflow-y-auto scrollbar-none">
          {editor && (
            <EditorContent
              editor={editor}
              className="w-full h-full px-4 py-4 pt-2 active:border-none focus:border-none"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col p-2 mt-4 space-y-2 bg-gray-100 border-2 rounded-md">
        <div className="flex space-x-4 flex-2 ">
          <div className="flex flex-col border-2 rounded-md ">
            <h4 className="p-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
              Thumbnail
            </h4>
            <ThumbnailSelector onChange={() => {}} />
          </div>
          <div className="flex flex-col w-full p-2 space-y-2 border-2 rounded-md">
            <h4 className="text-xs font-semibold tracking-tight text-gray-500 uppercase">
              SEO Fields
            </h4>
            <Input type="text" placeholder="Slug" className="w-full" />
            <Input type="text" placeholder="Tags" className="w-full" />
            <Input
              type="text"
              placeholder="Meta Description"
              className="w-full"
            />
          </div>

          {/* <div className="flex flex-col justify-between w-40 my-4">
            <Button variant={"outline"} width={"fullWidth"} type="button">
              Save Draft
            </Button>
            <Button variant={"default"} width={"fullWidth"} type="button">
              Publish
            </Button>
          </div> */}
        </div>
        <div className="flex space-x-4">
          <Button variant={"outline"} width={"fullWidth"} type="button">
            Save Draft
          </Button>
          <Button variant={"default"} width={"fullWidth"} type="button">
            Publish
          </Button>
        </div>
      </div>
    </div>

    // <div className="p-3 transition dark:bg-primary-dark bg-primary">
    //   <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
    //     {/* Thumbnail Selector and Submit Button */}
    //     <div className="flex items-center justify-between mb-3">
    //       <ThumbnailSelector
    //         // initialValue={post.thumbnail as string}
    //         // onChange={updateThumbnail}
    //         onChange={() => {}}
    //       />
    //       <div className="inline-block">
    //         <ActionButton
    //           busy={busy}
    //           title={btnTitle}
    //           // onClick={handleSubmit}
    //           disabled={busy}
    //         />
    //       </div>
    //     </div>

    //     {/* Title Input */}
    //     <input
    //       type="text"
    //       className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
    //       placeholder="Title"
    //       // onChange={updateTitle}
    //       // value={post.title}
    //     />
    //     <ToolBar
    //       editor={editor}
    //       // onOpenImageClick={() => setShowGallery(true)}
    //     />
    //     <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
    //   </div>
    // </div>
  );
};

export default MarkdownEditor;
