import './Shedule.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import moment from 'moment';
import 'moment/locale/uk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { selectUsers } from '../../redux/slices/usersSlice';
import { selectCafeList } from '../../redux/slices/cafeSlice';
import setDocToDB from '../../utils/setDocToDB';
import getDocFromDB from '../../utils/getDocFromDB';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import getAvatarByEmail from '../../utils/getAvatarByEmail';
import { FaPencilAlt, FaReply } from 'react-icons/fa';
const Shedule = () => {
  moment.locale('uk');
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const cafeList = useSelector(selectCafeList);
  const currentDate = moment();
  const [displayedWeek, setDisplayedWeek] = useState(currentDate.clone());
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const [shedule, setShedule] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingWeek, setEditingWeek] = useState({});

  useEffect(() => {
    getDocsColectionFromDB('shedule').then((data) => {
      setShedule(data);
      console.log(data);
    });
  }, []);
  const handlerOnChangeDisplayedWeek = (value) => {
    setDisplayedWeek(displayedWeek.clone().add(value, 'week'));
  };

  return (
    <div className="shedule">
      {/* <h6 className="shedule_today">{currentDate.format('[Вдалої] LLLL ')}</h6> */}
      <div className="shedule_header">
        <div
          className="shedule_header-controls"
          style={
            editMode ? { visibility: 'hidden' } : { visibility: 'visible' }
          }
          onClick={() => {
            handlerOnChangeDisplayedWeek(-1);
          }}
        >
          <IoIosArrowBack size="3rem" />
        </div>

        <h4 className="shedule_header-week">
          {displayedWeek.format('[Графік на] wo [тиждень]')}
        </h4>
        <div
          className="shedule_header-controls"
          style={
            editMode ? { visibility: 'hidden' } : { visibility: 'visible' }
          }
          onClick={() => {
            handlerOnChangeDisplayedWeek(1);
          }}
        >
          <IoIosArrowForward size="3rem" />
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
            const currentWeekSchedule = shedule.find(
              (week) => week.docName === displayedWeek.format('YY-WW')
            );
            const cafeSchedule = currentWeekSchedule?.cafeList?.find(
              (c) => c.cafeName === cafe.name
            )?.shedule;

            return (
              <div key={cafe.name} className="shedule_week-location-box">
                <div className="shedule_week-location">{cafe.name}</div>
                <div className="shedule_week-location-shedule">
                  {cafeSchedule?.map((day) => (
                    <div className="shedule_week-location-day" key={day.day}>
                      <img
                        className="shedule_user-avatar"
                        src={getAvatarByEmail(day.firstBarista.email, users)}
                        alt="avatar"
                      />
                      <span className="shedule_user-name">
                        {day.firstBarista.userName}
                      </span>
                    </div>
                  ))}
                  {[...Array(7 - (cafeSchedule?.length || 0))].map(
                    (_, index) => (
                      <div key={index} className="shedule_week-location-day">
                        <img
                          className="shedule_user-avatar"
                          src="/img/placeholder.jpg"
                          alt=""
                        />
                        <span className="shedule_user-name">N/A</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="shedule_buttons-box">
        {/* <button
          onClick={() => {
            const weekShedule = {
              docName: '24-08',
              cafeList: [
                {
                  cafeName: 'Золоті Ворота',
                  shedule: [
                    {
                      firstBarista: {
                        userName: 'Поліна Зільнова',
                        email: 'babulyamimilya@gmail.com',
                      },
                      secondBarista: '',
                      day: '1',
                    },
                    {
                      firstBarista: {
                        userName: 'Поліна Зільнова',
                        email: 'babulyamimilya@gmail.com',
                      },
                      secondBarista: '',
                      day: '2',
                    },
                    {
                      firstBarista: {
                        userName: 'Поліна Зільнова',
                        email: 'babulyamimilya@gmail.com',
                      },
                      secondBarista: '',
                      day: '3',
                    },
                    {
                      firstBarista: {
                        userName: 'Поліна Зільнова',
                        email: 'babulyamimilya@gmail.com',
                      },
                      secondBarista: '',
                      day: '4',
                    },
                    {
                      firstBarista: {
                        userName: 'Поліна Зільнова',
                        email: 'babulyamimilya@gmail.com',
                      },
                      secondBarista: '',
                      day: '5',
                    },
                    {
                      firstBarista: {
                        userName: 'Yehor Ivanov',
                        email: '2229696@gmail.com',
                      },
                      secondBarista: '',
                      day: '6',
                    },
                    {
                      firstBarista: {
                        userName: 'Yehor Ivanov',
                        email: '2229696@gmail.com',
                      },
                      secondBarista: '',
                      day: '7',
                    },
                  ],
                },
              ],
            };
            // console.log(weekShedule);
            setDocToDB('shedule', weekShedule.docName, weekShedule).then(
              getDocFromDB('shedule', weekShedule.docName).then((data) =>
                console.log(data)
              )
            );
          }}
        >
          action
        </button> */}
        <button
          style={editMode ? { display: 'none' } : { display: 'flex' }}
          onClick={() => {
            getDocFromDB('shedule', displayedWeek.format('YY-WW')).then(
              (data) => {
                if (data) {
                  console.log(data);
                  setEditMode(true);
                  return;
                }
                setDocToDB('shedule', displayedWeek.format('YY-WW'), {
                  docName: displayedWeek.format('YY-WW'),
                  cafeList: [],
                }).then((data) => {
                  if (data) {
                    console.log(data);
                    setEditMode(true);
                  }
                });
              }
            );
          }}
        >
          редагувати графік
        </button>
        <button
          style={editMode ? { display: 'flex' } : { display: 'none' }}
          onClick={() => {
            setEditMode(false);
          }}
        >
          зберегти зміни
        </button>
        <button
          style={editMode ? { display: 'flex' } : { display: 'none' }}
          className="button-round"
          onClick={() => {
            setEditMode(false);
          }}
        >
          <FaReply />
        </button>
      </div>
      <select
        style={{
          margin: '1rem 0',
          width: '4rem',
          height: '4rem',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `URL(${getAvatarByEmail(
            '2229696@gmail.com',
            users
          )})`,
        }}
      >

        {users.map((user) => {
          return <option value={user.email}>{user.userName}</option>;
        })}
      </select>
    </div>
  );
};

export default Shedule;
