export const BACKEND_ROOT_URL =
  process.env.NEXT_PUBLIC_BACKEND_ROOT_URL || "http://localhost:1337";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:1337/api";
export const API_HOME_PAGE_URL = `${API_BASE_URL}/home/`;
export const API_CONTACT_PAGE_URL = `${API_BASE_URL}/contact/`;
export const API_CONTACT_FORM_URL = `${API_BASE_URL}/contact-forms/`;
