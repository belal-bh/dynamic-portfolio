import React from "react";

import { IHomeProps } from "@/types/home";

const Home: React.FC<IHomeProps> = ({ homeData, error }) => {
  const isLoading = !homeData && !error;

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="text-center">
          {error && (
            <div>
              <p className="text-red-500 mb-4">{error}</p>
            </div>
          )}
          {homeData && (
            <div>
              <h1 className="text-4xl font-bold mb-4">{homeData.title}</h1>
              <img
                src={homeData.banner}
                alt="Banner"
                className="w-full max-w-2xl mx-auto mb-8"
              />
              <p className="text-xl">{homeData.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
