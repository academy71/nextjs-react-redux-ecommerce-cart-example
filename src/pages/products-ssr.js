import { addItem, removeItem, resetCart } from "@/redux/cart/cartSlice";
import { setProducts } from "@/redux/products/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsSsr() {
  const dispatch = useDispatch();
  const cartSate = useSelector((state) => state.cart);
  const data = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    // Fetch data from external API
    fetch(`https://fakestoreapi.com/products/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setProducts(data));
      });
  }, []);

  const handleResetCart = () => {
    // extra logic
    dispatch(resetCart());
  };

  return (
    <>
      <h1>Products</h1>

      <div className="cart">
        <h2>Cart</h2>
        <hr />

        <div className="cart-items">
          {cartSate.items.length > 0 ? (
            cartSate.items.map(({ id, title, price, quantity }) => (
              <div className="product" key={id}>
                <br />
                <h4 className="product__title">{title}</h4>
                <p className="price">{price}</p>
                <p className="product__quantity">Quantity: {quantity}</p>
                <button onClick={() => dispatch(removeItem({ id, quantity }))}>
                  remove
                </button>
                {"  "}
                <button
                  onClick={() =>
                    dispatch(addItem({ id, title, price, quantity }))
                  }
                >
                  Add
                </button>
                <br />
                <br />
                <hr />
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <hr />
        <br />
        <div className="cart-total">
          {cartSate.items.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
          )}{" "}
          - <button onClick={handleResetCart}>Reset</button>
        </div>
      </div>

      <div className="products">
        {data?.map((product) => (
          <div className="product" key={product.id}>
            <h3>{product.title}</h3>
            <img width={200} src={product.image} alt={product.title} />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => dispatch(addItem(product))}>
              Add to cart
            </button>
            <br />
            <hr />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://fakestoreapi.com/products/`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data: data } };
// }
