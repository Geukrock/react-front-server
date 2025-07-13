import { useState } from "react";
import { useEffect } from "react";
import "./dropdown.css";

type Props = {
  initialLabel: string;
  label: string;
  options: string[];
  selectedValue?: string;
  onSelect: (label: string, value: string) => void;
};

export default function Dropdown({ initialLabel, label, options, selectedValue, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(initialLabel);

  useEffect(() => {
    setSelectItem(selectedValue ?? initialLabel);
  }, [selectedValue, initialLabel]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: string) => {
    onSelect(label, value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectItem}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

