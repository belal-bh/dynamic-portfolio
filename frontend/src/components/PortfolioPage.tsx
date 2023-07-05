import { API_PORTFOLIO_URL } from "@/config";
import React, { useState, useEffect } from "react";

interface Profile {
  name: string;
  designation: string;
}

interface Biography {
  title: string;
  description: string;
}
interface PortfolioData {
  profile?: Profile;
  biography?: Biography;
}

const PortfolioPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const apiUrl = `${API_PORTFOLIO_URL}?populate=*`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      const resData = await response.json();

      const data: PortfolioData = {};

      if (
        resData.data.attributes.Profile &&
        resData.data.attributes.Profile.length >= 1
      ) {
        data["profile"] = resData.data.attributes.Profile[0];
      }

      if (
        resData.data.attributes.Biography &&
        resData.data.attributes.Biography.length >= 1
      ) {
        data["biography"] = resData.data.attributes.Biography[0];
      }

      setPortfolioData(data);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching portfolio data");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <p>{error}</p>
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
