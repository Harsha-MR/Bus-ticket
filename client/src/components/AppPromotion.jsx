import React from "react";

const AppPromotion = () => {
  return (
    <div className="bg-gradient-to-b from-red-500 to-pink-500 py-10">
      <div className="container mx-auto max-w-6xl flex items-center justify-between bg-white rounded-xl p-8 shadow-lg">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ENJOY THE APP!</h2>
          <div className="mb-4">
            <p className="flex items-center text-lg text-gray-700 mb-2">
              <span className="text-green-500 mr-2">✔</span> Quick access
            </p>
            <p className="flex items-center text-lg text-gray-700">
              <span className="text-green-500 mr-2">✔</span> Superior live tracking
            </p>
          </div>

          {/* Store Ratings */}
          <div className="flex items-center space-x-8 mt-6">
            <div className="text-center">
              <p className="text-lg font-bold">4.5 <span className="text-yellow-500">★</span></p>
              <p className="text-gray-500">50M+ downloads</p>
              <p className="text-sm font-medium mt-1">Play Store</p>
            </div>
            <div className="border-l border-gray-300 h-12"></div>
            <div className="text-center">
              <p className="text-lg font-bold">4.6 <span className="text-yellow-500">★</span></p>
              <p className="text-gray-500">50M+ downloads</p>
              <p className="text-sm font-medium mt-1">App Store</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 text-center">
          <p className="text-gray-800 font-semibold mb-4">Scan to download</p>
          <img
            src="../images/image.png" // Replace with the actual QR code image URL
            alt="QR Code"
            className="mx-auto mb-6"
          />
          <p className="text-gray-800 font-semibold">Download the App on</p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 cursor-pointer"
            />
            <img
              src="https://imgs.search.brave.com/J2gemQc9VRKFFEl5EPqKLiIXaKkiFPPjBCF6eBvj3D4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9BcHBfU3Rv/cmVfKGlPUykvQXBw/X1N0b3JlXyhpT1Mp/LUJhZGdlLUxvZ28u/d2luZS5zdmc"
              alt="App Store"
              className="h-10 cursor-pointer h-[7rem] w-[11rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;
