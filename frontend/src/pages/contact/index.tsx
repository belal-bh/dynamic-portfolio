import Contact from "@/components/Contact";
import { API_CONTACT_PAGE_URL } from "@/config";
import { IContactData, IContactProps } from "@/types/contact";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const ContactPage: React.FC = ({
  contactData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Contact contactData={contactData} error={error} />;
};

export default ContactPage;

export const getServerSideProps: GetServerSideProps<
  IContactProps
> = async () => {
  try {
    const response = await fetch(API_CONTACT_PAGE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch contact data");
    }

    const data = await response.json();
    const contactData: IContactData = {
      title: data.data.attributes.title,
      description: data.data.attributes.description,
    };
    return {
      props: {
        contactData,
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
