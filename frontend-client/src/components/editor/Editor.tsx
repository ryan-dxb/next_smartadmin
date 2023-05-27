"use client";

import { NextPage } from "next";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/Collapsible";
import { ChevronsUpDown } from "lucide-react";
import EditorToolBar from "./ToolBar";

// Editor Imports
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
import SeoContainer from "./SEO/SeoContainer";
import EditorSidebar from "./EditorSidebar";
import GalleryModal from "./Gallery/GalleryModal";
import CollapsibleContainer from "../ui/CollapsibleContainer";

interface EditorProps {}

const Editor: NextPage<EditorProps> = () => {
  const [selectionRange, setSelectionRange] = useState<Range | undefined>();
  const [showGallery, setShowGallery] = useState<boolean>(false);

  // Editor Settings
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
        class: "prose prose-base mx-auto focus:outline-none h-full",
      },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-7xl flex xl:flex-row flex-col  xl:max-h-[calc(100vh-6rem)] h-full p-2 m-2 space-x-4  overflow-hidden">
        <div
          className="flex flex-col flex-[2] border space-y-2 
        scrollbar-none max-h-full lg:max-h-[calc(100vh-6rem)]"
        >
          <div className="m-2">
            <Input placeholder="Title" className="" />
          </div>

          <div className="relative flex flex-col h-full p-2 m-2 space-y-1 overflow-y-scroll border scrollbar-none">
            <EditorToolBar
              onOpenImageClick={() => setShowGallery(true)}
              editor={editor}
              // onOpenImageClick={() => setShowGallery(true)}
            />
            {editor && (
              <EditorContent
                editor={editor}
                className="h-full px-4 py-4 overflow-y-scroll bg-gray-300 active:border-none focus:border-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300"
              />
            )}
          </div>
          <SeoContainer />
        </div>
        <EditorSidebar />
      </div>

      <GalleryModal
        isModalOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </>
  );
};

export default Editor;
