"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";

import Image from "next/image";
// import { toast } from "react-hot-toast";

import { NextPage } from "next";
import Drawer from "@/components/ui/Drawer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type User = {
  name: string;
  image: string;
};

interface SettingDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User | null;
}

const SettingDrawer: NextPage<SettingDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log(data, "&TEST_DATA");
    setIsLoading(false);
    // axios
    //   .post("/api/settings", data)
    //   .then(() => {
    //     router.refresh();
    //     onClose();
    //   })
    //   .catch(() => toast.error("Something went wrong!"))
    //   .finally(() => setIsLoading(false));
  };

  return (
    <Drawer openLeft isOpen={isOpen} onClose={onClose}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <div className="space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>

            <div className="flex flex-col mt-10 gap-y-8">
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900 "
                >
                  Photo
                </label>
                <div className="flex items-center mt-2 gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="pgc9ehd5"
                  >
                    <Button
                      disabled={isLoading}
                      variant={"default"}
                      type="button"
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 gap-x-6">
          <Button disabled={isLoading} variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default SettingDrawer;
