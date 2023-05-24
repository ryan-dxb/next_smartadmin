import { FC, ReactNode, useState } from "react";

export type dropDownOptions = { label: string; onClick(): void }[];

interface Props {
  options: dropDownOptions;
  head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onMouseDown={() => setShowOptions(!showOptions)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="absolute z-40 mt-4 text-left border-2 rounded min-w-max top-full right-2 border-primary-dark dark:border-primary bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => {
              return (
                <li
                  className="text-primary-dark dark:text-primary"
                  key={label + index}
                  onMouseDown={onClick}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;
