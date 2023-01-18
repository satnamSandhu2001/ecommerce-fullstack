import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ history }) => {
  const [keyword, setkeyword] = useState('');
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      let trimmedKeyword = keyword.replace(/\s{2,}/g, ' ').trim();
      navigate(`/products/${trimmedKeyword}`);
    } else {
      navigate('/products');
    }
  };
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form
          onSubmit={searchSubmitHandler}
          className="rounded-md overflow-hidden shadow"
        >
          <input
            autoFocus
            type="search"
            placeholder="Search for product..."
            value={keyword}
            onChange={(e) => setkeyword(e.target.value)}
            className="text-xl outline-none focus:bg-slate-100 px-4 py-2 sm:w-[60vw] max-w-2xl border border-slate-300"
          />
          <input
            type="submit"
            value="Search"
            className="bg-gradient-to-br from-indigo-600  to-blue-600 px-4 py-2 text-xl text-white cursor-pointer hover:from-blue-600 hover:to-indigo-600 duration-300 border border-indigo-600"
          />
        </form>
      </div>
    </>
  );
};

export default Search;
