"use client";

import { Combobox } from "@headlessui/react";
import { NextPage } from "next";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface TagsProps {}

const people: { id: Number; name: string }[] = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const Tags: NextPage<TagsProps> = () => {
  const [selectedPeople, setSelectedPeople] = useState<
    [{ id?: number; name?: string }]
  >([]);
  const [query, setQuery] = useState("");

  const handleSearch = (e: any) => {
    setQuery(e.target.value);
    console.log("query", query);
  };

  const filteredOptions = query
    ? people.filter((option) =>
        option.name?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  console.log("filteredOptions", filteredOptions);
  console.log("selectedPeople", selectedPeople);

  return (
    <div>
      <h4 className="p-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
        Tags:
      </h4>
      <Combobox
        as="div"
        value={selectedPeople}
        onChange={setSelectedPeople}
        multiple
        className="relative mx-2 border rounded-md border-input hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center px-4">
          <BiSearch className="w-6 h-6 text-gray-600 " aria-hidden="true" />
          <Combobox.Input
            onChange={handleSearch}
            className="w-full h-12 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-0 focus:ring-0"
            placeholder="Search..."
          />
        </div>
        {filteredOptions.length > 0 && (
          <Combobox.Options
            className="py-4 overflow-y-auto text-sm max-h-96"
            static
          >
            {filteredOptions.map((option, index) => (
              <Combobox.Option key={option.id} value={option}>
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
        {query && filteredOptions.length === 0 && (
          <p className="px-4 py-2 text-sm">
            No results for "{query}". Try something else?
          </p>
        )}
      </Combobox>
    </div>
  );
};

export default Tags;
