import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { image, name, category, price } = product;
  
  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p className="category">{category}</p>
      <p className="price">{price}</p>
      <button>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
