import React, { useState } from 'react';
export default function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    const newQuery = e.target.value.toLowerCase();
    setQuery(newQuery);
    onSearch(newQuery);
  };
  return (
    <>
      <form>
        <input
          className="w-[380px] h-10"
          type="text"
          placeholder="cari catatan .."
          onChange={handleSearch}
          value={query}
        />
        <button
          type="submit"
          hidden
        />
      </form>
    </>
  );
}
