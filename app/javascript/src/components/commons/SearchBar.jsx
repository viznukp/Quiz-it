import React, { useState } from "react";

import { Search as SearchIcon } from "neetoicons";
import { Input } from "neetoui";
import PropTypes from "prop-types";

import useFuncDebounce from "hooks/useFuncDebounce";

const SearchBar = ({ placeholder = "", setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useFuncDebounce(value => setSearchTerm(value));

  return (
    <div>
      <Input
        placeholder={placeholder}
        prefix={<SearchIcon />}
        value={inputValue}
        onChange={event => {
          const value = event.target.value;
          setInputValue(value);
          debouncedSearch(value);
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
