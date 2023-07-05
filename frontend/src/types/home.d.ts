export interface IHomeData {
  title: string;
  banner: string;
  description: string;
}

export interface IHomeProps {
  homeData?: IHomeData;
  error?: string;
}
