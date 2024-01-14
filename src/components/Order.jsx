import ArticleItem from './Product';

const Order = () => {
  return (
    <div className="order">
      <h2 className="order_title">Замовлення</h2>
      <select
        className="order_cafe-select"
        name=""
        id=""
        placeholder="Кав'ярня"

        // style={{ width: '10rem', color: '#000', backgroundColor: '#fff' }}
      >
        <option
          className="order_cafe-option"
          value="Золоті Ворота"
          text="Золоті Ворота"
          //   style={{ width: '10rem', color: '#000', backgroundColor: '#fff' }}
        >
          Золоті Ворота
        </option>
        <option
          className="order_cafe-option"
          value="Хрещатик 19"
          text="Хрещатик 19"
        >
          Хрещатик 19
        </option>
        <option
          className="order_cafe-option"
          value="Хрещатик 27"
          text="Хрещатик 27"
        >
          Хрещатик 27
        </option>
      </select>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <button className="order-button">ЗАМОВИТИ</button>
    </div>
  );
};

export default Order;
