import { FC } from "react";
import NextImage from "next/image";
import CheckMark from "../CheckMark";

interface Props {
  src: string;
  selected?: boolean;
  alt?: string;
  onClick?(): void;
}

const Image: FC<Props> = ({ src, alt, selected, onClick }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded cursor-pointer"
    >
      <NextImage
        src={src}
        width={200}
        height={200}
        alt={alt as string}
        className="transition bg-cover bg-secondary-light hover:scale-110"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
