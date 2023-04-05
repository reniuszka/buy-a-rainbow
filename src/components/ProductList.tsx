import React, { ReactElement } from "react";
import { useCart } from "../hoooks/useCart";
import { useProducts } from "../hoooks/useProducts";
import { UseProductsContextType } from "../context/ProductsProvider";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, sortCart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;
  //some returns booolean
  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = sortCart.some((item) => item.sku === product.sku);

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return <main className="main main--products">{pageContent}</main>;
};

export default ProductList;
