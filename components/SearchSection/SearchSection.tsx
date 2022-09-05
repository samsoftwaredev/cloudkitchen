import { useState } from "react";
import styles from "./search.module.scss";

interface Props {
  onChange: Function;
}

const SearchSection = ({ onChange }: Props) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    onChange(text);
  };

  return (
    <input
      className="ckField"
      type="text"
      placeholder="Search"
      value={searchText}
      onChange={handleChange}
    />
  );
};

export default SearchSection;
