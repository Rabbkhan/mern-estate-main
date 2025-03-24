import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import Hero from "../components/Hero";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [featuredListings, setFeaturedListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerRes, rentRes, saleRes, featuredRes] = await Promise.all([
          fetch("/api/listing/get?offer=true&limit=4"),
          fetch("/api/listing/get?type=rent&limit=4"),
          fetch("/api/listing/get?type=sale&limit=4"),
          fetch("/api/listing/get?featured=true&limit=4"),
        ]);

        const [offerData, rentData, saleData, featuredData] = await Promise.all(
          [offerRes.json(), rentRes.json(), saleRes.json(), featuredRes.json()]
        );

        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
        setFeaturedListings(featuredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 space-y-20">
      {/* 🏡 Swiper for Offers */}
      <Swiper navigation>
        {offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[500px] rounded-lg"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 Recent Offers */}
      {offerListings.length > 0 && (
        <section className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              🔥 Recent Offers
            </h2>
            <Link
              to={"/search?offer=true"}
              className="text-indigo-600 hover:underline text-sm"
            >
              Show more offers →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      )}

      {/* 🏆 Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              ⭐ Featured Listings
            </h2>
            <Link
              to={"/search?featured=true"}
              className="text-indigo-600 hover:underline text-sm"
            >
              Show more offers →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      )}

      {rentListings.length > 0 && (
        <section className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              🔥 Rent Offers
            </h2>
            <Link
              to={"/search?rent=true"}
              className="text-indigo-600 hover:underline text-sm"
            >
              Show more offers →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      )}

      {saleListings.length > 0 && (
        <section className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              🔥 Sale Offers
            </h2>
            <Link
              to={"/search?rent=true"}
              className="text-indigo-600 hover:underline text-sm"
            >
              Show more offers →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      )}

      {/* 📍 Popular Locations (Improved) */}
      <section className="bg-gray-50 shadow-md p-10 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          📍 Popular Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              city: "New York",
              img: "https://media.istockphoto.com/id/1454217037/photo/statue-of-liberty-and-new-york-city-skyline-with-manhattan-financial-district-world-trade.jpg?s=612x612&w=0&k=20&c=6V54_qVlDfo59GLEdY2W8DOjLbbHTJ9y4AnJ58a3cis=",
            },
            {
              city: "Los Angeles",
              img: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?cs=srgb&dl=pexels-mikel-1239162.jpg&fm=jpg",
            },
            {
              city: "Chicago",
              img: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?cs=srgb&dl=pexels-mikel-1239162.jpg&fm=jpg",
            },
            {
              city: "Miami",
              img: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?cs=srgb&dl=pexels-mikel-1239162.jpg&fm=jpg",
            },
          ].map(({ city, img }) => (
            <Link
              key={city}
              to={`/search?location=${city}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={img} alt={city} className="w-full h-32 object-cover" />
              <p className="text-center text-lg font-semibold p-3">{city}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials Section */}
      <section className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          💬 What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              name: "John Doe",
              text: "This platform made buying my first home super easy! The process was smooth, and I found my dream house in no time.",
              img: "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
              rating: 5,
            },
            {
              name: "Sarah Smith",
              text: "I listed my property here, and within a week, I had multiple offers. Highly recommended for both buyers and sellers!",
              img: "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
              rating: 4.5,
            },
            {
              name: "Michael Brown",
              text: "I was able to find a rental apartment quickly thanks to the search filters and great recommendations!",
              img: "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
              rating: 4,
            },
          ].map(({ name, text, img, rating }, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <img
                src={img}
                alt={name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-600 my-3">"{text}"</p>
              <div className="text-yellow-500 text-lg">
                {"⭐".repeat(Math.floor(rating))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📈 Market Insights */}
      <section className="bg-gray-100 p-12 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-gray-700 mb-6">
          📈 Market Trends
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 📊 Stat 1 */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-2xl font-semibold text-indigo-600">
              🏡 Home Prices
            </h3>
            <p className="text-gray-700 mt-3">
              The average home price has increased by{" "}
              <span className="font-bold">5%</span> in the last 6 months.
            </p>
          </div>

          {/* 📊 Stat 2 */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-2xl font-semibold text-green-600">
              📍 Popular Locations
            </h3>
            <p className="text-gray-700 mt-3">
              Top 3 trending locations:{" "}
              <span className="font-bold">New York, Los Angeles, & Miami</span>.
            </p>
          </div>

          {/* 📊 Stat 3 */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-2xl font-semibold text-red-600">
              🏢 Rental Demand
            </h3>
            <p className="text-gray-700 mt-3">
              Rental demand has surged by <span className="font-bold">12%</span>{" "}
              due to increased migration.
            </p>
          </div>
        </div>

        {/* 📉 Additional Market Insight */}
        <p className="text-gray-600 text-center mt-6">
          🔥 Real estate market is heating up! Now is a great time to buy or
          invest.
        </p>
      </section>
    </div>
  );
}
