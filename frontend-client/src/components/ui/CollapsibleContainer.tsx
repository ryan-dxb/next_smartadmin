import { Disclosure, Transition } from "@headlessui/react";

import { NextPage } from "next";

interface CollapsibleContainerProps {
  ContainerHeader: React.ReactNode;
  children: React.ReactNode;
}

const CollapsibleContainer: NextPage<CollapsibleContainerProps> = ({
  ContainerHeader,
  children,
}) => {
  return (
    <div className="py-3 mx-2">
      <Disclosure>
        <Disclosure.Button className="w-full h-10 px-2 py-2 text-sm font-medium text-left bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
          {ContainerHeader}
        </Disclosure.Button>

        <Transition
          enter="transition duration-300 ease-out delay-100"
          enterFrom="transform scale-y-90  opacity-0"
          enterTo="transform scale-y-100  opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-y-100 opacity-100"
          leaveTo="transform scale-y-90 opacity-0"
        >
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
};

export default CollapsibleContainer;
