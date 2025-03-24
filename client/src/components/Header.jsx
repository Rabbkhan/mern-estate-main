import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl text-white flex">
            <span className="text-blue-400">Khan</span>
            <span className="text-white">Estate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-2 rounded-full flex items-center shadow-sm border border-gray-600"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 px-3 text-gray-300 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <FaSearch className="text-blue-400 hover:text-blue-500 transition" />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="flex gap-4 items-center">
          <Link
            to="/"
            className="hidden sm:inline text-gray-300 hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hidden sm:inline text-gray-300 hover:text-blue-400 transition"
          >
            About
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-gray-300 shadow-md"
                src={currentUser.avatar}
                alt="Profile"
              />
            ) : (
              <span className="text-gray-300 hover:text-blue-400 transition">
                Sign in
              </span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
