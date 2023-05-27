"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Popover, Transition } from "@headlessui/react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { NextPage } from "next";
import { Fragment, useState } from "react";

interface EditLinkProps {
  editor: Editor;
}

const EditLink: NextPage<EditLinkProps> = ({ editor }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive("link")}
      editor={editor}
      tippyOptions={{
        onHide: () => {
          setShowEditForm(false);
        },
        appendTo: "parent",
      }}
    >
      <Popover className="relative">
        <Transition
          //   afterLeave={resetForm}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 z-10 flex items-center w-auto px-4 py-2 mt-3 bg-white rounded-md top-full">
            {({ close }) => (
              <div className="flex flex-row w-auto space-x-2">
                {/* <div className="flex flex-col space-y-3"> */}
                {/* <Input
                    className="w-auto"
                    value={link.url}
                    onChange={(e) => setLink({ ...link, url: e.target.value })}
                    placeholder="https://example.com"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tab" onCheckedChange={handleCheckboxChange} />

                    <label
                      htmlFor="tab"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Open in new tab
                    </label>
                  </div>
                </div> */}

                <Button
                  onClick={() => {
                    // handleSubmit();
                    close();
                  }}
                  width="fullWidth"
                  variant="outline"
                  className="justify-start w-auto px-2"
                >
                  Apply
                </Button>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </BubbleMenu>
  );
};

export default EditLink;
