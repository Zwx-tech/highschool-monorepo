type Promotion = {
  id: string;
  header: string;
  description: string;
  longDescription: string;
  image: string;
  colorFrom: string;
  colorTo: string;
  color: string;
  finishDate: number;
  items: string[];
};

type Product = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  rate: number;
  ratesNumber: number;
  ratingOption: boolean;
  shortDescription: string;
  description: string;
  specification: {
    size: string;
    weight: string;
    battery: string;
    colors: string[];
  };
  features: {
    name: string;
    description: string;
    photo: string;
  }[];
  comments: any[]; // You can define a Comment type if needed
};

type User = {
  email: string;
  password: string;
};

type ErrorMessage = {
  message: string;
};
