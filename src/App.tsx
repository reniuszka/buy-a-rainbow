import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { useState } from "react";

function App() {
  // to toggle betwen the views
  const [viewCart, setViewCart] = useState<boolean>(false);

  //what we will render
  const pageContent = viewCart ? <Cart /> : <ProductList />;

  //the content
  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );
  return content;
}

export default App;
