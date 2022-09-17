import { memo, useState } from "react";
import { css } from "utils";
import styles from "./search.module.scss";

interface Props {
  onChange: Function;
}

const SearchSection = ({ onChange }: Props) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event: any) => {
    const text = event.target.value;
    setSearchText(text);
    onChange(text);
  };

  return (
    <input
      className={css([styles.searchBox])}
      type="text"
      // TODO: remove specific filter
      placeholder="Search By Price"
      value={searchText}
      onChange={handleChange}
    />
  );
};

export default memo(SearchSection);
