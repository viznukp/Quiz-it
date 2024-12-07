import React, { useState, useEffect, useRef } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

const CategorySelector = ({ onSelect }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);
  const inputRef = useRef();

  const { data: { categories = [] } = {} } = useFetchCategories();

  const findMatchingStrings = (categories, substring) =>
    categories.filter(category =>
      category.toLowerCase().includes(substring.toLowerCase())
    );

  const highlightMatchingSubstring = (string, substring) => {
    const regex = new RegExp(`(${substring})`, "gi");
    const parts = string.split(regex);

    return parts.reduce((highlightedString, part, index) => {
      highlightedString.push(
        part.toLowerCase() === substring.toLowerCase() ? (
          <span className="text-blue-400" key={index}>
            {part}
          </span>
        ) : (
          part
        )
      );

      return highlightedString;
    }, []);
  };

  useEffect(() => {
    setMatches(
      categories?.length ? findMatchingStrings(categories, searchTerm) : []
    );
    inputRef.current?.focus();
  }, [searchTerm]);

  return (
    <div className="p-2">
      <Input
        placeholder={t("labels.searchCategory")}
        prefix={<Search />}
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <div className="relative mt-2 max-h-64">
        {matches.map(match => (
          <div
            className="cursor-pointer rounded p-1 text-base hover:bg-gray-200"
            key={match}
            onClick={() => onSelect(match)}
          >
            {highlightMatchingSubstring(match, searchTerm)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
