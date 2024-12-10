import React from 'react';
import Search from './search';

export const Header = ({ onSearch }) => {
  return (
    <>
      <div className="flex-1 flex justify-between items-center border-b-2 border-white/40 mx-4">
        <h1 className="text-3xl font-bold">Catatan</h1>
        <Search onSearch={onSearch} />
      </div>
    </>
  );
};
