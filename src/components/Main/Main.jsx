import { useSelector } from 'react-redux';
import MySchedule from './MySchedule';
import Schedule from './Schedule';
import { selectUser } from '../../redux/slices/userSlice';
import { useEffect, useState } from 'react';

const Main = () => {
  const user = useSelector(selectUser);
  const [displayCommonShedule, setDisplayCommonShedule] = useState(false);
  useEffect(() => {
    if (user.role.isAdmin) setDisplayCommonShedule(true);
  }, [user.role.isAdmin]);
  return (
    <div className="main">
      {displayCommonShedule ? <Schedule /> : <MySchedule />}
      {user.role.isBarista && (
        <button
          onClick={() => {
            setDisplayCommonShedule(!displayCommonShedule);
          }}
        >
          {displayCommonShedule ? 'Мій графік' : ' Загальний графік'}
        </button>
      )}

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
