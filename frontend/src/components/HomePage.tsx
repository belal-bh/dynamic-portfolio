import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import { API_HOME_PAGE_URL, BACKEND_ROOT_URL } from "@/config";

interface HomeData {
  title: string;
  banner: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = () => {
    const apiUrl = `${API_HOME_PAGE_URL}?populate=*`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching home data");
        }
        return response.json();
      })
      .then((data) => {
        const homeData = {
          title: data.data.attributes.title,
          banner: `${BACKEND_ROOT_URL}${data.data.attributes.banner.data.attributes.url}`,
          description: data.data.attributes.description,
        };
        setHomeData(homeData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching home data. Please try again.");
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    setError("");
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{homeData?.title}</h1>
          <img
            src={homeData?.banner}
            alt="Banner"
            className="w-full max-w-2xl mx-auto mb-8"
          />
          <p className="text-xl">{homeData?.description}</p>
        </div>
      )}

      {error && <Modal onClose={closeModal} title="Error" message={error} />}
    </div>
  );
};

export default HomePage;
