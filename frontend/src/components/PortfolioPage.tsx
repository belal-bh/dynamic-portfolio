import React from "react";
import { IPortfolioProps } from "@/types/portfolio";

const PortfolioPage: React.FC<IPortfolioProps> = ({ portfolioData, error }) => {
  const isLoading = !portfolioData && !error;

  return (
    <div className="container mx-auto py-8 w-2/3">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <>
          {portfolioData && (
            <>
              {portfolioData.profile && (
                <section className="pb-4">
                  <h2 className="text-2xl font-bold mb-4">
                    {portfolioData.profile.name}
                  </h2>
                  <p>{portfolioData.profile.designation}</p>
                </section>
              )}

              {portfolioData.biography && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    {portfolioData.biography.title}
                  </h2>
                  <p>{portfolioData.biography.description}</p>
                </section>
              )}

              {/* Add more sections as needed */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PortfolioPage;
