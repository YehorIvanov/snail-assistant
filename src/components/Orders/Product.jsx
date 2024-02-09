import './Product.css';
const Product = ({
  slug,
  productPhoto,
  productName,
  productUnit,
  index,
  handler,
  productAmount,
  productStock,
  addStock,
}) => {
  return (
    <div className="product">
      <img
        src={productPhoto ? productPhoto : '/img/placeholder.jpg'}
        className="product_image"
        alt={slug}
      />

      <div className="product_detail">
        <h6 className="product_title">
          {productName} {productUnit}{' '}
        </h6>
        <div style={{}} className="product_controls">
          {addStock && (
            <div className="product_count">
              <div className=" count">
                <button
                  onClick={() => handler(index, -1, true)}
                  className="count__minus"
                >
                  -
                </button>
                <button disabled className="count__amount">
                  {productStock}
                </button>
                <button
                  onClick={() => handler(index, 1, true)}
                  className="count__plus"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="product_count">
            <div className=" count">
              <button
                onClick={() => handler(index, -1)}
                className="count__minus"
              >
                -
              </button>
              <button disabled className="count__amount">
                {productAmount}
              </button>
              <button onClick={() => handler(index, 1)} className="count__plus">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
