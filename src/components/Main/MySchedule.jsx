import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { selectCafeList } from '../../redux/slices/cafeSlice';
import moment from 'moment';
import 'moment/locale/uk';
import { selectSchedule } from '../../redux/slices/scheduleSlice';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './MySchedule.css';
const MySchedule = () => {
  moment.locale('uk');
  const user = useSelector(selectUser);
  const cafeList = useSelector(selectCafeList);
  const currentDate = moment();
  const [displayedWeek, setDisplayedWeek] = useState(currentDate.clone());
  const schedule = useSelector(selectSchedule);

  const getMySchedule = () => {
    const email = user.email;
    const mySchedule = Array(7).fill({
      cafeName: '',
      address: '',
      workingTime: '',
      photo: '',
    });
    const currentWeekSchedule = schedule.find(
      (week) => week.docName === displayedWeek.format('YY-WW')
    );
    for (let cafe in currentWeekSchedule?.cafeList) {
      currentWeekSchedule.cafeList[cafe].schedule.forEach((element, i) => {
        if (
          element.firstBarista.email === email ||
          element.secondBarista.email === email
        ) {
          mySchedule[i] = { ...mySchedule[i], cafeName: cafe };
        }
      });
    }
    return mySchedule.map((elem) => {
      if (elem.cafeName && cafeList) {
        const location = cafeList.filter(
          (cafe) => cafe.name === elem.cafeName
        )[0];
        return (
          location && {
            ...elem,
            address: location.address,
            workingTime: location.workingTime,
            photo: location.photo,
          }
        );
      }
      return elem;
    });
  };

  const handlerOnChangeDisplayedWeek = (value) => {
    setDisplayedWeek(displayedWeek.clone().add(value, 'week'));
  };

  return (
    <div className="my-schedule">
      <div className="my-schedule_header">
        <div
          className="my-shedule_header-controls"
          onClick={() => {
            handlerOnChangeDisplayedWeek(-1);
          }}
        >
          <IoIosArrowBack size="3rem" />
        </div>

        <h5 className="my-shedule_header-week">
          {displayedWeek.format('[Графік на] wo [тиждень]')}
        </h5>
        <div
          className="my-shedule_header-controls"
          onClick={() => {
            handlerOnChangeDisplayedWeek(1);
          }}
        >
          <IoIosArrowForward size="3rem" />
        </div>
      </div>
      <div className="my-schedule_week-schedule">
        {getMySchedule().map((day, i) => {
          return (
            <div key={i} className="my-schedule_day">
              <div className="my-schedule_date">
                <span className="my-schedule_date-day">
                  {displayedWeek
                    .clone()
                    .day(i + 1)
                    .format('dddd')
                    .toUpperCase()}
                </span>
                <span className="my-schedule_date-date">
                  {displayedWeek
                    .clone()
                    .day(i + 1)
                    .format('DD MMMM')}
                </span>
              </div>
              <div className="my-schedule_location">
                <span className="my-schedule_location-name">
                  {day.cafeName ? day.cafeName : 'Вихідний'}
                </span>
                <span className="my-schedule_location-address">
                  {day.address ? day.address : 'Дім милий дім'}
                </span>
                <span className="my-schedule_location-working-time">
                  {day.workingTime ? day.workingTime : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySchedule;
