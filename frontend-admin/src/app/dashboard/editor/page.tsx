import MarkdownEditor from "@/components/MarkdownEditor";
import { NextPage } from "next";

interface EditorProps {}

const Editor: NextPage<EditorProps> = () => {
  return <MarkdownEditor />;
};

export default Editor;
