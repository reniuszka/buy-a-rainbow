import React, { ReactElement } from "react";
import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

//to get type of dispattch hover over dispatch in product LIst

type PropTypes = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};
const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropTypes): ReactElement => {
  //specific setup for vite for images
  const image: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;
  console.log("image", image);

  const onAddToCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: {
        ...product,
        quantity: 1,
      },
    });
  const itemInCart = inCart ? " → Item in Cart: ✔️" : null;
  return (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={image} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart} className="btn">
        Add to Cart
      </button>
    </article>
  );
};

export default Product;
