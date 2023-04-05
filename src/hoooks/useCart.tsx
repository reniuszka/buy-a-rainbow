import { useContext } from "react";
import { UseCartContextType } from "../context/CartProvider";
import CartContext from "../context/CartProvider";

// orr add it ub context/CartProvider file
export const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};
