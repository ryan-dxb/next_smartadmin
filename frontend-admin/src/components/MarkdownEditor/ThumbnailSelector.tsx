import { cn } from "@/lib/utils";
import { ChangeEventHandler, FC, useEffect, useState } from "react";

interface Props {
  initialValue?: string;
  onChange(file: File): void;
}

const commonClass = "rounded cursor-pointer  aspect-video text-gray-400";

const ThumbnailSelector: FC<Props> = ({
  initialValue,
  onChange,
}): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState("");
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
  );
};

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
