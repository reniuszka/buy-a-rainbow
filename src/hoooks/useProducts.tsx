import { useContext } from "react";
import { UseProductsContextType } from "../context/ProductsProvider";
import ProductsContext from "../context/ProductsProvider";

export const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext);
};
