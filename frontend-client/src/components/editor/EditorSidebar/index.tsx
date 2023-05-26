"use client";

import { NextPage } from "next";
import ThumbnailSelector from "../Thumbnail";
import { useState } from "react";
import Publish from "./Publist";
import Tags from "./Tags";

interface EditorSidebarProps {}

const EditorSidebar: NextPage<EditorSidebarProps> = () => {
  const [thumbnail, setThumbnail] = useState<File | undefined>();

  // Thumbnail Change
  const updateThumbnail = (file: File) => setThumbnail(file);

  console.log(thumbnail);

  return (
    <div className="flex flex-col flex-1 h-full space-y-6 border ">
      <Publish />

      <ThumbnailSelector onChange={updateThumbnail} />

      <Tags />
    </div>
  );
};

export default EditorSidebar;
