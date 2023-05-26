import { NextPage } from "next";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import SelectedImage from "./SelectedImage";

interface GalleryModalProps {
  isModalOpen?: boolean;
  onClose: () => void;
}

const GalleryModal: NextPage<GalleryModalProps> = ({
  isModalOpen,
  onClose,
}) => {
  return (
    <Modal large modalTitle="Gallery" isOpen={isModalOpen} onClose={onClose}>
      <div className="flex mt-2  max-h-[75vh] h-[75vh] space-x-1">
        <div className="w-3/4 overflow-y-scroll scrollbar-thin">
          {/* Grid for Images 3 in each row */}
          <div className="grid grid-cols-3 gap-2 m-2 ">
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
            <div className="bg-gray-400 aspect-square"></div>
          </div>
        </div>
        <div className="w-1/4 p-2 border">
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full">
              Upload Image
            </Button>

            <SelectedImage onChange={() => {}} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GalleryModal;
