import './Reports.css';

const Reports = () => {
  return (
    <div className="reports">
      <h3>Звіти</h3>
      <button className="reports_btn">Фотозвіт з локації</button>
      <button className="reports_btn">Щоденний чеклист бариста</button>
      <button className="reports_btn">Тестування</button>
      <input type="text" placeholder="Пошук звіту..." />
      <button className="reports_btn">Завантажити звіт</button>
      <p>Додати новий звіт</p>
      <button className="reports_btn">Створити звіт</button>
    </div>
  );
};

export default Reports;
