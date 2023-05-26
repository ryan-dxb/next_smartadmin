import { getFocusedEditor } from "@/lib/EditorUtils";
import { Editor } from "@tiptap/react";
import { NextPage } from "next";
import { useCallback } from "react";
import ToolBarButton from "./ToolBarButton";
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
import { AiFillCaretDown } from "react-icons/ai";
import { RiDoubleQuotesL } from "react-icons/ri";
import DropDown from "@/components/ui/DropDown";

interface EditorToolBarProps {
  editor: Editor | undefined | null;
  onOpenImageClick: () => void;
}

const EditorToolBar: NextPage<EditorToolBarProps> = ({
  editor,
  onOpenImageClick,
}) => {
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

  const getActive = useCallback((): boolean => {
    if (
      editor.isActive("heading", { level: 1 }) ||
      editor.isActive("heading", { level: 2 }) ||
      editor.isActive("heading", { level: 3 })
    )
      return true;
    else return false;
  }, [editor]);

  return (
    <div className="sticky">
      <div className="flex flex-wrap items-center w-full ">
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
          <DropDown />
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

          <div className="flex items-center space-x-3">
            {/* <EmbedYoutube onSubmit={handleEmbedYoutube} /> */}
          </div>

          <ToolBarButton onClick={onOpenImageClick}>
            <BsImageFill />
          </ToolBarButton>
        </div>
      </div>
    </div>
  );
};

export default EditorToolBar;
