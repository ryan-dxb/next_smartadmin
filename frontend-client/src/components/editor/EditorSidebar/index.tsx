"use client";

import { NextPage } from "next";
import ThumbnailSelector from "../Thumbnail";
import { useState } from "react";
import Publish from "./Publist";
import Tags from "./Tags";
import Category from "./Category";

interface EditorSidebarProps {}

const EditorSidebar: NextPage<EditorSidebarProps> = () => {
  const [thumbnail, setThumbnail] = useState<File | undefined>();

  // Thumbnail Change
  const updateThumbnail = (file: File) => setThumbnail(file);

  return (
    <div className="flex flex-col flex-1 w-1/5 h-full space-y-6 border ">
      <Publish />

      <ThumbnailSelector onChange={updateThumbnail} />

      <Tags />

      <Category />
    </div>
  );
};

export default EditorSidebar;
