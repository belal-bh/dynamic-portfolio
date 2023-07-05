import Home from "@/components/Home";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { API_HOME_PAGE_URL, BACKEND_ROOT_URL } from "@/config";
import { IHomeProps, IHomeData } from "@/types/home";

const HomePage: React.FC = ({
  homeData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Home homeData={homeData} error={error} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  try {
    const apiUrl = `${API_HOME_PAGE_URL}?populate=*`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching home data");
    }

    const data = await response.json();
    const homeData: IHomeData = {
      title: data.data.attributes.title,
      banner: `${BACKEND_ROOT_URL}${data.data.attributes.banner.data.attributes.url}`,
      description: data.data.attributes.description,
    };
    return {
      props: {
        homeData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Error fetching home data. Please try again.",
      },
    };
  }
};
