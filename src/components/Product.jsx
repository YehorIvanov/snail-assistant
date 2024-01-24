const Product = ({
  slug,
  productPhoto,
  productName,
  productUnit,
  index,
  handler,
  productAmount,
  productStock,
}) => {
  return (
    <div className="product">
      <img
        src={productPhoto}
        className="product_image-placeholder"
        alt={slug}
      />

      <div className="product_detail">
        <p className="product_title">{productName}</p>
        <p className="product_unit">{productUnit} </p>
      </div>
      <div className="product_count count">
        <button onClick={() => handler(index, -1)} className="count__minus">
          -
        </button>
        <button disabled className="count__amount">
          {productAmount ? productAmount : 0}
        </button>
        <button onClick={() => handler(index, 1)} className="count__plus">
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
