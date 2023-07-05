export interface IProfileData {
  name: string;
  designation: string;
}
export interface IBiographyData {
  title: string;
  description: string;
}

export interface IPortfolioData {
  profile?: IProfileData;
  biography?: IBiographyData;
}

export interface IPortfolioProps {
  portfolioData?: IPortfolioData;
  error?: string;
}
