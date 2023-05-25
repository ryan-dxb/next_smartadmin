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
import { useEffect, useState } from "react";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import EditLink from "./Link/EditLink";

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
  const [selectionRange, setSelectionRange] = useState<Range | undefined>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);

  console.log(selectionRange);

  // Image Upload
  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    // const { data } = await axios.post("/api/image", formData);
    console.log("image uploaded", formData);

    setUploading(false);

    // setImages([data, ...images]);
  };

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
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },

      attributes: {
        class: "prose  focus:outline-none w-full max-w-full mx-auto h-full",
      },
    },
  });

  // Image Selection
  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  // Selection Range Link
  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  return (
    <>
      <div className="flex flex-col flex-1 mx-4 my-2 space-y-6">
        <Input type="text" placeholder="Title" className="w-full" />
        <div className="flex flex-col w-full ">
          <div className="flex flex-col flex-1 bg-white border-2 rounded-md">
            <ToolBar
              editor={editor}
              onOpenImageClick={() => setShowGallery(true)}
            />
            <div className="flex w-full max-h-[400px] min-h-[400px] mb-4  overflow-y-auto scrollbar-none">
              {editor ? <EditLink editor={editor} /> : null}
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
      </div>
      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default MarkdownEditor;
