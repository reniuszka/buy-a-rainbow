import React, { useState } from "react";
import CartLineItem from "./CartLineItem";
import { useCart } from "../hoooks/useCart";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, showTotalPrice, sortCart } =
    useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const imageSubmit: string = new URL(`../images/item0005.jpg`, import.meta.url)
    .href;

  const pageContent = confirm ? (
    <section className="submit">
      <h3>
        Yeah we know you would like to buy rainbows but..their price is
        priceless!
      </h3>
      <h4>
        go for a walk or hike and look at the sky, hopefully you will fin what
        you need.
      </h4>
      <h5> Rainbow&Love!</h5>
      <img src={imageSubmit} alt="rainbow" className="product__img" />
    </section>
  ) : (
    <section className="cart__section">
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {sortCart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total items: {totalItems}</p>
        <p>Total items: {showTotalPrice}</p>
        <button
          className="btn cart__submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place order
        </button>
      </div>
    </section>
  );
  return <main className="main main--card">{pageContent}</main>;
};

export default Cart;
