import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
<div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
  {/* Sidebar / Filters */}
  <div className="p-7 border-b-2 md:border-r-2 bg-white shadow-md md:min-h-screen w-full md:w-80">
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Search Field */}
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-700 mb-1">
          Search Term:
        </label>
        <input
          type="text"
          id="searchTerm"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-indigo-300 outline-none"
          value={sidebardata.searchTerm}
          onChange={handleChange}
        />
      </div>

      {/* Property Type Filters */}
      <div>
        <label className="text-lg font-semibold text-gray-700">Type:</label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {["all", "rent", "sale", "offer"].map((type) => (
            <label key={type} className="flex items-center gap-2 bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-indigo-100">
              <input
                type="checkbox"
                id={type}
                className="w-5 h-5 accent-indigo-600"
                onChange={handleChange}
                checked={sidebardata.type === type}
              />
              <span className="text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Filters */}
      <div>
        <label className="text-lg font-semibold text-gray-700">Amenities:</label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {["parking", "furnished"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-indigo-100">
              <input
                type="checkbox"
                id={amenity}
                className="w-5 h-5 accent-indigo-600"
                onChange={handleChange}
                checked={sidebardata[amenity]}
              />
              <span className="text-gray-700 capitalize">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div>
        <label className="text-lg font-semibold text-gray-700">Sort:</label>
        <select
          onChange={handleChange}
          defaultValue={"created_at_desc"}
          id="sort_order"
          className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:ring focus:ring-indigo-300 outline-none"
        >
          <option value="regularPrice_desc">Price: High to Low</option>
          <option value="regularPrice_asc">Price: Low to High</option>
          <option value="createdAt_desc">Latest</option>
          <option value="createdAt_asc">Oldest</option>
        </select>
      </div>

      {/* Search Button */}
      <button className="bg-indigo-600 text-white p-3 rounded-lg uppercase hover:bg-indigo-700 transition-all">
        Search
      </button>
    </form>
  </div>

  {/* Listing Results */}
  <div className="flex-1 p-7">
    <h1 className="text-3xl font-semibold border-b pb-3 text-gray-800">
      Listing Results
    </h1>
    
    <div className="p-7 flex flex-wrap gap-4">
      {/* No Listings Message */}
      {!loading && listings.length === 0 && (
        <p className="text-xl text-gray-600">No listings found!</p>
      )}

      {/* Loading State */}
      {loading && (
        <p className="text-xl text-gray-600 text-center w-full animate-pulse">
          Loading...
        </p>
      )}

      {/* Listings Display */}
      {!loading &&
        listings &&
        listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}

      {/* Show More Button */}
      {showMore && (
        <button
          onClick={onShowMoreClick}
          className="text-indigo-600 font-semibold hover:underline p-7 text-center w-full"
        >
          Show more
        </button>
      )}
    </div>
  </div>
</div>

    )}

 
