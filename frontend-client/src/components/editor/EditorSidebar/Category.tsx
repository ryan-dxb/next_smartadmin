"use client";

import { Combobox, Transition } from "@headlessui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

interface CategoryProps {}

const people: { id: Number; name: string }[] = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const Category: NextPage<CategoryProps> = () => {
  const [selectedPeople, setSelectedPeople] = useState<{
    id?: number;
    name?: string;
  }>();
  const [query, setQuery] = useState("");

  const handleSearch = (e: any) => {
    setQuery(e.target.value);
  };

  const filteredOptions = query
    ? people.filter((option) =>
        option.name?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (query === "") {
    }
  }, [query]);

  return (
    <div>
      <h4 className="p-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
        Category:
        {selectedPeople && (
          <span className="inline-flex items-center px-2 py-1 mx-2 my-1 text-xs font-medium tracking-tight text-gray-700 bg-gray-100 rounded-full">
            {selectedPeople.name}
            <button
              type="button"
              className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              onClick={() => {}}
            >
              <span className="sr-only">Remove person</span>
              <RxCross2 className="w-4 h-4 font-semibold" aria-hidden="true" />
            </button>
          </span>
        )}
      </h4>
      {/* <div className="w-full mb-2">
        {selectedPeople && (
          <span className="inline-flex items-center px-2 py-1 mx-2 my-1 text-xs font-medium tracking-tight text-gray-700 bg-gray-100 rounded-full">
            {selectedPeople.name}
            <button
              type="button"
              className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              onClick={() => {}}
            >
              <span className="sr-only">Remove person</span>
              <RxCross2 className="w-4 h-4 font-semibold" aria-hidden="true" />
            </button>
          </span>
        )}
      </div> */}

      <Combobox
        as="div"
        value={selectedPeople}
        onChange={setSelectedPeople}
        className="relative mx-2 border rounded-md border-input hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center px-4">
          <BiSearch className="w-6 h-6 text-gray-600 " aria-hidden="true" />
          <Combobox.Input
            onChange={handleSearch}
            className="w-full h-10 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-0 focus:ring-0"
            placeholder="Search..."
          />
        </div>
        {filteredOptions.length > 0 && (
          <Combobox.Options className="pt-2 overflow-y-auto text-sm rounded-b-md max-h-96">
            {filteredOptions.map((option, index) => (
              <Combobox.Option key={option.name} value={option}>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-indigo-600 text-white" : "bg-white"
                    } px-4 py-2 `}
                  >
                    {option.name}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {query && query !== "" && filteredOptions.length === 0 && (
          <p className="px-4 py-2 text-sm">
            No results for "{query}". Try something else?
          </p>
        )}
      </Combobox>
    </div>
  );
};

export default Category;
