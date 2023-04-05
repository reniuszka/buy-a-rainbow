import React from "react";
import { useCart } from "../hoooks/useCart";

type PropType = {
  viewCart: boolean;
};
const Footer = ({ viewCart }: PropType) => {
  const { totalItems, showTotalPrice } = useCart();
  //displays current year
  const year: number = new Date().getFullYear();
  return (
    <footer className="footer">
      {viewCart ? (
        <p>Shopping Cart &copy; {year}</p>
      ) : (
        <>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {showTotalPrice}</p>
          <p>Rainbow Cart &copy; {year}</p>
        </>
      )}
    </footer>
  );
};

export default Footer;
