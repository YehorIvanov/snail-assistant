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
          {productName} {` (${productUnit})`}{' '}
        </h6>
        <div className="product_controls">
          {addStock && (
            <div className="product_count">
              {addStock && (
                <span className="product_count-tooltip">Залишок</span>
              )}
              <div className=" count">
                <div
                  onClick={() => handler(index, productStock - 1, true)}
                  className="count__minus"
                >
                  -
                </div>
                <input
                  type="text"
                  className="count__amount"
                  onChange={(e) => {
                    handler(index, e.target.value, true);
                  }}
                  value={productStock}
                />
                <div
                  onClick={() => handler(index, productStock + 1, true)}
                  className="count__plus"
                >
                  +
                </div>
              </div>
            </div>
          )}

          <div className="product_count">
            {addStock && (
              <span className="product_count-tooltip">Замовити</span>
            )}
            <div className=" count">
              <div
                onClick={(e) => handler(index, productAmount - 1)}
                className="count__minus"
              >
                -
              </div>

              <input
                type="text"
                className="count__amount"
                onChange={(e) => {
                  handler(index, e.target.value);
                }}
                value={productAmount}
              />
              <div
                onClick={() => handler(index, productAmount + 1)}
                className="count__plus"
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
