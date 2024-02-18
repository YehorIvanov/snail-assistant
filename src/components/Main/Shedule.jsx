import './Shedule.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import moment from 'moment';
import 'moment/locale/uk';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { selectCafeList } from '../../redux/slices/cafeSlice';
const Shedule = () => {
  const user = useSelector(selectUser);
  const cafeList = useSelector(selectCafeList);
  moment.locale('uk');
  const currentDate = moment();
  const [displayedWeek, setDisplayedWeek] = useState(currentDate.clone());
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

  // console.log(
  //   displayedWeek.format('lll'),
  //   displayedWeek.format('d'),
  //   displayedWeek.format('dddd')
  // );
  // console.log(
  //   currentDate.format('lll'),
  //   currentDate.format('d'),
  //   currentDate.format('dddd')
  // );

  const handlerOnChangeDisplayedWeek = (value) => {
    setDisplayedWeek(displayedWeek.clone().add(value, 'week'));
  };

  return (
    <div className="shedule">
      <h6 className="shedule_today">{currentDate.format('[Вдалої] LLLL ')}</h6>
      <div className="shedule_header">
        <div
          className="shedule_header-controls"
          onClick={() => {
            handlerOnChangeDisplayedWeek(-1);
          }}
        >
          <IoIosArrowBack />
        </div>

        <div className="shedule_header-week">
          {displayedWeek.format('[Розклад на] wo [тиждень]')}
        </div>
        <div
          className="shedule_header-controls"
          onClick={() => {
            handlerOnChangeDisplayedWeek(1);
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className="shedule_week-shedule">
        <div className="shedule_week-header">
          {daysOfWeek.map((day) => {
            return (
              <div key={day} className="shedule_week-header-day">
                <span className="shedule_week-header-day-name">
                  {displayedWeek.clone().day(day).format('dd')}
                </span>
                <span>{displayedWeek.clone().day(day).format('DD.MM')}</span>
              </div>
            );
          })}
        </div>
        <div className="shedule_week-box">
          {cafeList.map((cafe) => {
            return (
              <div key={cafe.name} className="shedule_week-location-box">
                <div className="shedule_week-location">{cafe.name}</div>
                <div className="shedule_week-location-shedule">
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                  <div className="shedule_week-location-day">
                    <img
                      className="shedule_user-avatar"
                      src="/img/placeholder.jpg"
                      alt=""
                    />
                    <span>F.L.</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* <div className="shedule_week-location-box">
            <div className="shedule_week-location">Назва Локації</div>
            <div className="shedule_week-location-shedule">
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>
            </div>
          </div>
          <div className="shedule_week-location-box">
            <div className="shedule_week-location">Назва Локації</div>
            <div className="shedule_week-location-shedule">
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>
            </div>
          </div>
          <div className="shedule_week-location-box">
            <div className="shedule_week-location">Назва Локації</div>
            <div className="shedule_week-location-shedule">
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>{' '}
              <div className="shedule_week-location-day">
                <img
                  className="shedule_user-avatar"
                  src="/img/placeholder.jpg"
                  alt=""
                />
                <span>F.L.</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Shedule;
