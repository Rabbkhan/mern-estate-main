import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative h-[85vh] flex items-center justify-center px-6 sm:px-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      
      {/* Background Image (blurred effect for elegance) */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?luxury-house,villa')" }}>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl text-center text-white">
        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          Find your next <span className="text-yellow-500">perfect</span> <br /> home with ease
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          Browse a wide selection of premium properties that match your lifestyle & budget.
        </p>

        {/* Call to Action Button */}
        <Link
          to="/search"
          className="mt-6 inline-block bg-yellow-500 text-gray-900 text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300"
        >
          Explore Listings
        </Link>
      </div>
    </div>
  );
}
