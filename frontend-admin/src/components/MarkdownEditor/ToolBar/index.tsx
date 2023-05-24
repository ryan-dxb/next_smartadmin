import { FC } from "react";
import { Editor } from "@tiptap/react";
import { AiFillCaretDown } from "react-icons/ai";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
  BsLink45Deg,
  BsYoutube,
} from "react-icons/bs";

import { NextPage } from "next";
import { getFocusedEditor } from "../EditorUtils";
import DropdownOptions from "@/components/ui/DropDownOptions";
import Button from "@/components/ui/Button";
import ToolBarButton from "./ToolBarButton";

import { Separator } from "@/components/ui/seperator";

interface ToolBarProps {
  editor: Editor | undefined | null;
}

const ToolBar: NextPage<ToolBarProps> = ({ editor }) => {
  if (!editor) return null;

  const options = [
    {
      label: "Paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];

  const getLabel = (): string => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";

    return "Paragraph";
  };

  const Head = () => {
    return (
      <div className="flex items-center">
        <p>{getLabel()}</p>
        <AiFillCaretDown />
      </div>
    );
  };

  // heading 1, 2, 3 "bold" "italic" "underline" "strike" "quote" "code" "code-block" "insert-link" "lists (ol and ul)" "embed youtube" "insert image"

  console.log(editor);

  return (
    <div className="flex flex-col justify-center w-full py-2 pl-4 space-y-4 bg-gray-100 border-b-2 md:space-y-0 md:space-x-4 md:justify-start md:items-center md:flex-row ">
      {/* paragraph, heading 1, 2, 3 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 ">
          <ToolBarButton
            active={editor.isActive("bold")}
            onClick={() => getFocusedEditor(editor).toggleBold().run()}
          >
            <BsTypeBold />
          </ToolBarButton>

          <ToolBarButton
            active={editor.isActive("italic")}
            onClick={() => getFocusedEditor(editor).toggleItalic().run()}
          >
            <BsTypeItalic />
          </ToolBarButton>

          <ToolBarButton
            active={editor.isActive("underline")}
            onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
          >
            <BsTypeUnderline />
          </ToolBarButton>

          <ToolBarButton
            active={editor.isActive("strike")}
            onClick={() => getFocusedEditor(editor).toggleStrike().run()}
          >
            <BsTypeStrikethrough />
          </ToolBarButton>
        </div>

        <Separator
          orientation="vertical"
          className=" inline-flex h-6 w-[1px]  bg-gray-950/20"
        />

        <DropdownOptions options={options} head={<Head />} />

        <Separator
          orientation="vertical"
          className=" hidden h-6 w-[1px] md:inline-flex  bg-gray-950/20"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <ToolBarButton
            active={editor.isActive("blockquote")}
            onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
          >
            <RiDoubleQuotesL />
          </ToolBarButton>

          <ToolBarButton
            active={editor.isActive("code")}
            onClick={() => getFocusedEditor(editor).toggleCode().run()}
          >
            <BsCode />
          </ToolBarButton>

          <ToolBarButton
            active={editor.isActive("codeBlock")}
            onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
          >
            <BsBraces />
          </ToolBarButton>

          {/* <InsertLink onSubmit={handleLinkSubmit} /> */}

          <ToolBarButton
            active={editor.isActive("orderedList")}
            onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
          >
            <BsListOl />
          </ToolBarButton>

          <ToolBarButton
            active={editor.isActive("bulletList")}
            onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
          >
            <BsListUl />
          </ToolBarButton>
        </div>

        <Separator
          orientation="vertical"
          className=" inline-flex h-6 w-[1px]  bg-gray-950/20"
        />
        {/* <div className="flex items-center space-x-3">
        <EmbedYoutube onSubmit={handleEmbedYoutube} /> */}

        <ToolBarButton>
          <BsImageFill />
        </ToolBarButton>
      </div>
    </div>
  );
};

export default ToolBar;
