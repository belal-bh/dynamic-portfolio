export interface IContactData {
  title: string;
  description: string;
}

export interface IContactProps {
  contactData?: IContactData;
  error?: string;
}
