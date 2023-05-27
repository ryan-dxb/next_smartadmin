"use client";

import { NextPage } from "next";
import { useCallback } from "react";

interface ImageGalleryProps {
  onClick: (e: any) => void;
  selected?: string;
}

const ImageGallery: NextPage<ImageGalleryProps> = ({ onClick, selected }) => {
  const handleChange = useCallback((e: any) => {
    onClick(e.target.id);
  }, []);

  return (
    <>
      {/* Grid for Images 3 in each row */}
      <div className="grid grid-cols-3 gap-2 m-2 ">
        {(Array.from(Array(20).keys()) as number[]).map((i) => (
          <div
            id={i.toString()}
            key={i}
            onClick={handleChange}
            className="relative flex items-center justify-center bg-gray-400 cursor-pointer aspect-square"
          >
            <span className="text-2xl font-bold text-white">{i}</span>
            {selected === i.toString() && (
              <span className="top-0 right-0 text-2xl font-bold text-white">
                ✓
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
