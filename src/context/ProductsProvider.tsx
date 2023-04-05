import { createContext, ReactElement, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};
//will be used in the provider for value for products if we don use any api to fetch
const initialState: ProductType[] = [
  { sku: "item0001", name: "Rainbow", price: 9.99 },
  { sku: "item0002", name: "Premium Rainbow", price: 19.99 },
  { sku: "item0003", name: "Deluxe Rainbow", price: 29.99 },
];
//fetch data will be done in useEffect and json server
// const initialState: ProductType[] = [];

// type for data:
export type UseProductsContextType = { products: ProductType[] };

const initialContextState: UseProductsContextType = { products: [] };

//create context
const ProductsContext =
  createContext<UseProductsContextType>(initialContextState);

//in react 18 i need to provide children type, it is optional children and type of ReactElement or array of reactElement if its more than one
type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

// /create provider
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  // useEffect and setProducts will set the value for products- in case I fetch data, but now I take the data from above
  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data = await fetch(`http://localhost:3500/products`)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .catch((error) => {
  //         if (error instanceof Error) {
  //           console.log(error.message);
  //         }
  //       });
  //     return data;

  //     // try {
  //     //   const response = await fetch(`http://localhost:3500/products`);
  //     //   const data = await response.json();
  //     //   setProducts(data);
  //     //   return data as ProductType[];
  //     // } catch (error) {
  //     //   if (error instanceof Error) {
  //     //     console.log("error", error);
  //     //   }
  //     // }
  //   };
  //   //fetch products, get them and set them
  //   fetchProducts().then((data) => setProducts(data));
  //   // fetchProducts();
  // }, []);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;

// export const useProducts = (): UseProductsContextType => {
//   return useContext(ProductsContext);
// };
