import Schedule from './Schedule';

const Main = () => {
  return (
    <div className="main">
      <Schedule />
      <div style={{ border: '2px dashed var(--accent-color)' }}>
        сьогодні день замовлень на: макаруни молоко майяююю
      </div>
      <br />
      <div style={{ border: '2px dashed var(--accent-color)' }}>
        штендера ховаемо о 19-30
      </div>
    </div>
  );
};

export default Main;
