import { useEffect, useState } from "react";

export default function ProductsClientHooks() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  if (!data) return <h2>No products data</h2>;

  return (
    <>
      <h1>Products</h1>

      <div className="products">
        {data.map((product) => (
          <div className="product" key={product.id}>
            <h3>{product.title}</h3>
            <img width={200} src={product.image} alt={product.title} />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <br />
            <br />
            <hr />
            <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
