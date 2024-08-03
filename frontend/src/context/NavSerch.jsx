import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'src/routes/hooks';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState({});
  const path = usePathname();

  const handleSearchChange = (event) => {
    setSearchValue((prev) => ({ ...prev, [path]: event.target.value }));
  };

  return (
    <SearchContext.Provider value={{ searchValue, handleSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
};
