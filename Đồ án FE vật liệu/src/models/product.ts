import { Category } from "./category";

export class Product{
  productId: string;
  productName: string;
  price: number;
  unit: string;
  images: string;
  descriptions: string
  status: boolean;
  categoryId: string;
  category: Category[];
  checkDetails: Object;
  importDetails: Object;
  supplies: Object;
  wareHouses: Object;
}