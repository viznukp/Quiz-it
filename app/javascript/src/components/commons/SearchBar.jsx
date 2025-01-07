import React, { useEffect, useState } from "react";

import { Search as SearchIcon } from "neetoicons";
import { Input } from "neetoui";
import PropTypes from "prop-types";

import useFuncDebounce from "hooks/useFuncDebounce";

const SearchBar = ({ placeholder = "", searchTerm = "", setSearchTerm }) => {
  const debouncedSearch = useFuncDebounce(value => setSearchTerm(value));

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const [inputValue, setInputValue] = useState(searchTerm);

  return (
    <div>
      <Input
        placeholder={placeholder}
        prefix={<SearchIcon />}
        type="search"
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
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
