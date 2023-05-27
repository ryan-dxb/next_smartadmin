import { NextPage } from "next";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import SelectedImage from "./SelectedImage";
import ImageGallery from "./ImageGallery";
import { useState } from "react";
import { Input } from "@/components/ui/Input";

interface GalleryModalProps {
  isModalOpen?: boolean;
  onClose: () => void;
}

const GalleryModal: NextPage<GalleryModalProps> = ({
  isModalOpen,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Use index of selected div to set selected image
  const handleChange = (e: any) => {
    setSelectedImage(e);
  };

  return (
    <Modal large modalTitle="Gallery" isOpen={isModalOpen} onClose={onClose}>
      <div className="flex mt-2 max-h-[75vh] h-[75vh] space-x-1">
        <div className="w-3/4 overflow-y-scroll scrollbar-thin">
          <ImageGallery onClick={handleChange} selected={selectedImage} />
        </div>
        <div className="flex flex-col w-1/4 p-2 border">
          <div className="flex flex-col space-y-8">
            <Button variant="outline" className="w-full">
              Upload Image
            </Button>
            <div className="flex flex-col space-y-2">
              <SelectedImage onChange={() => {}} />

              <Input placeholder="Alt Text" className="" />
              <Button variant="default" className="w-full">
                Select Image
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GalleryModal;
