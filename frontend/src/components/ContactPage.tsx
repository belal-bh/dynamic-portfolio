import React, { useState, useEffect } from "react";

import { API_CONTACT_PAGE_URL, API_CONTACT_FORM_URL } from "@/config";

interface ContactData {
  title: string;
  description: string;
}

const ContactPage: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch(API_CONTACT_PAGE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch contact data");
      }
      const data = await response.json();
      setContactData(data.data.attributes);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching contact data");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Replace `API_URL` with your actual API endpoint for form submission
    const apiUrl = API_CONTACT_FORM_URL;

    const requestBody = {
      data: {
        name,
        email,
        message,
      },
    };

    // Send the form data via a POST request
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error submitting the form");
        }
        setSuccessMessage("Form submitted successfully!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log("error", error);
        setError("Error submitting the form. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto py-4 w-2/3">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}

          <h1 className="text-2xl font-bold mb-4">{contactData?.title}</h1>
          <p className="mb-4">{contactData?.description}</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactPage;
