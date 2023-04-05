import React from "react";
import Nav from "./Nav";
import { useCart } from "../hoooks/useCart";

type PropsType = {
  viewCart: boolean;
  // idz do app i najedz na setViewCart i wez typ:
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();
  return (
    <header className="header">
      <div className="header__title-bar">
        <h1>Rainbow</h1>
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
};

export default Header;
