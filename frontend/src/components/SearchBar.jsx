import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText.trim());
  };

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-bar__input-wrapper">
        <svg
          className="search-bar__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="report-search-input"
          type="text"
          className="search-bar__input"
          placeholder="Search by area, location type or description..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search reports"
        />
        {searchText && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-bar__button" id="report-search-button">
        Search
      </button>
    </form>
  );
}
