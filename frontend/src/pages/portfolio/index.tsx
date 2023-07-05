import Portfolio from "@/components/PortfolioPage";
import { API_PORTFOLIO_URL } from "@/config";
import { IPortfolioData, IPortfolioProps } from "@/types/portfolio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const PortfolioPage: React.FC = ({
  portfolioData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Portfolio portfolioData={portfolioData} error={error} />;
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps<
  IPortfolioProps
> = async () => {
  try {
    const apiUrl = `${API_PORTFOLIO_URL}?populate=*`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio data");
    }
    const data = await response.json();

    const portfolioData: IPortfolioData = {};
    if (
      data.data.attributes.Profile &&
      data.data.attributes.Profile.length >= 1
    ) {
      portfolioData["profile"] = data.data.attributes.Profile[0];
    }

    if (
      data.data.attributes.Biography &&
      data.data.attributes.Biography.length >= 1
    ) {
      portfolioData["biography"] = data.data.attributes.Biography[0];
    }

    return {
      props: {
        portfolioData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Error fetching contact data. Please try again.",
      },
    };
  }
};
