import React from "react";
type PropsType = {
  viewCart: boolean;
  // idz do app i najedz na setViewCart i wez typ:
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};
const Nav = ({ viewCart, setViewCart }: PropsType) => {
  return (
    <nav className="nav">
      {viewCart ? (
        <button onClick={() => setViewCart(false)} className="btn">
          View Products
        </button>
      ) : (
        <button onClick={() => setViewCart(true)} className="btn">
          View Cart
        </button>
      )}
    </nav>
  );
};

export default Nav;
