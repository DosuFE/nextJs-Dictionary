import React from 'react';

interface SearchBarProps {
  word: string;
  setWord: (value: string) => void;
  searchWord: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ word, setWord, searchWord }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className="relative mb-6 search-container">
      <div className="flex items-center bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-md shadow-black/20">
        <input
          type="text"
          className="p-3 border-none md:w-xl lg:w-3xl
          rounded-l-lg focus:outline-none shadow-md
          focus:ring-2 focus:ring-blue-500 placeholder:text-black"
          placeholder="Search for a word..."
          value={word}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              searchWord();
            }
          }}
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 text-lg
          rounded-r-lg hover:bg-blue-700 focus:outline-none 
          focus:ring-2 focus:ring-blue-500"
          onClick={searchWord}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;