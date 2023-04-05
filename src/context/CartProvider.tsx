import {
  Children,
  createContext,
  ReactElement,
  useMemo,
  useReducer,
} from "react";

//poszczegolny produkt w koszyku, wiec ilosc potrzebna
export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

//caly koszyk typ dla stanu
type CartStateType = { cart: CartItemType[] };

//stan poczatkowy koszyka => state.cart
const initialCartState: CartStateType = { cart: [] };

// actions dla reducera
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};
// It returns the type of the REDUCER_ACTION_TYPE
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

//action type
export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      //if there is nopayload even though its optional
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
      //destructure the item clicked, we are checking if the item is already in the cart or not, and if we want to add more
      const { sku, name, price } = action.payload;
      //filter the card so want to get all items that are not the item we are updating to return them
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      //now I want to find the item I want to update and make sure it exists, bo moze byc lub nie byc w koszyku
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      //sprawdzam czy ten produkt juz jest w koszyku dzieki quantity tego produktu, jesli istnieje w koszyku to dodam 1 , jesli nie to ustawie 1
      const quantity: number = itemExists ? itemExists.quantity + 1 : 1;
      //zwracam stan i nadpisujemy dla cart: elementy ktore nie edytowalam i element ktory byl edytowany
      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, quantity }],
      };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in Quantity action");
      }
      //destructure the item clicked form action, we are checking if the item is already in the cart or not, and if we want to edit more
      const { sku, quantity } = action.payload;
      //now I want to find the item I want to update and make sure it exists, bo moze byc lub nie byc w koszyku
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      // if it doesnt exist in the cart :
      if (!itemExists) {
        throw new Error("item need to exist in order to update quantity");
      }
      //update the quantity rozmarowywuje jego propertisy i daje nowa wartosc quantity z action.payload
      const updatedItem: CartItemType = { ...itemExists, quantity };
      //filter the card so want to get all items that are not the item we are updating to return them
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in Remove action");
      }
      //destructure the item clicked that will be removed
      const { sku } = action.payload;
      //filter the card so want to get all items that are not the item we are removing to return them
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      //zwracamy juz bez tego itemu co chcielismy wurzucic
      return { ...state, cart: [...filteredCart] };
    }
    //in the app when click submit I will just clear the  cart so far:
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

//tworzymy nasz wlasny hook:
const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  //to memoize the actions types values so it always has the same referentce
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  //obl ilosc rzeczy w koszyku i to bd number
  const totalItems: number = state.cart.reduce((currentValue, newCartItem) => {
    return currentValue + newCartItem.quantity;
  }, 0);

  // calkowita kwota koszyka
  const totalPrice: number = state.cart.reduce((currentPrice, newItemPrice) => {
    return currentPrice + newItemPrice.quantity * newItemPrice.price;
  }, 0);
  // Intl.NumberFormat: new (locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => Intl.NumberFormat interface Intl.NumberFormat
  //wyswietlenie kwoty w dolarach i to bd string
  const showTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  //sort the cart in order czli z "item0001" chcemy otrzymac 0001 i porownac z 0002, odcinamy 4 ostatnie liczby
  const sortCart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });
  //return everything we difine - dispatch it keeps its reference so it doesnt coz the rerender,
  return {
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    showTotalPrice,
    sortCart,
  };
};

//create  type Context zwraca nam typ z hooka wyzej ;)
export type UseCartContextType = ReturnType<typeof useCartContext>;

// initial state ktory bedzie w Contexscie na podstawie typu wyzej
const initialCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: 0,
  showTotalPrice: "",
  sortCart: [],
};

//create context
const CartContext = createContext<UseCartContextType>(initialCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

//provider, zamiast values w obiektcie wrzucamy naszego hooka ktory zostal stworzony i jego stan poczatkowy

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

// export const useCart = (): UseCartContextType => {
//   return useContext(CartContext);
// };

// to jest w value: value: {
//     dispatch: React.Dispatch<ReducerAction>;
//     REDUCER_ACTIONS: {
//         ADD: string;
//         REMOVE: string;
//         QUANTITY: string;
//         SUBMIT: string;
//     };
//     totalItems: number;
//     totalPrice: number;
//     showTotalPrice: string;
//     sortCart: CartItemType[];
// }
