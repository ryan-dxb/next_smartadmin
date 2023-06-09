"use client";

import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { ChangeEventHandler, FC, useEffect, useState } from "react";

interface ThumbnailSelectorProps {
  initialValue?: string;
  onChange(file: File): void;
}

const commonClass = "rounded cursor-pointer aspect-video text-gray-400";

const ThumbnailSelector: NextPage<ThumbnailSelectorProps> = ({
  initialValue,
  onChange,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");

  // Change Event Handler for Thumbnail Selector
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    setSelectedThumbnail(URL.createObjectURL(file));
    onChange(file);
  };

  useEffect(() => {
    if (typeof initialValue === "string") setSelectedThumbnail(initialValue);
  }, [initialValue]);

  return (
    <div className="divide-y divide-gray-300">
      <div className="flex justify-between p-2">
        <h4 className="text-xs font-semibold tracking-tight text-gray-500 uppercase divide-y">
          Thumbnail
        </h4>
        {selectedThumbnail && (
          <button
            type="button"
            className="text-xs font-semibold tracking-tight uppercase text-rose-500"
            onClick={() => setSelectedThumbnail("")}
          >
            Remove
          </button>
        )}
      </div>
      <div className="flex items-center justify-center w-full h-40 p-2 bg-gray-100">
        <div className="w-40 h-full">
          <input
            type="file"
            hidden
            accept="image/jpg, image/png, image/jpeg"
            id="thumbnail"
            onChange={handleChange}
            className="h-full"
          />
          <label htmlFor="thumbnail">
            {selectedThumbnail ? (
              <div className="flex items-center justify-center h-full">
                <img
                  src={selectedThumbnail}
                  alt=""
                  className={cn(commonClass, "object-cover")}
                />
              </div>
            ) : (
              <PosterUI
                label="Thumbnail"
                className="flex items-center justify-center h-full text-gray-400 cursor-pointer "
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

//  Component for Poster UI
const PosterUI: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <span>{label}</span>
    </div>
  );
};

export default ThumbnailSelector;
