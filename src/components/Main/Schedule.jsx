import './Schedule.css';
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
import { FaReply } from 'react-icons/fa';
const Schedule = () => {
  moment.locale('uk');
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const cafeList = useSelector(selectCafeList);
  const currentDate = moment();
  const [displayedWeek, setDisplayedWeek] = useState(currentDate.clone());
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const [schedule, setSchedule] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingWeek, setEditingWeek] = useState({});
  const [renderedWeek, setRenderedWeek] = useState();
  useEffect(() => {
    getDocsColectionFromDB('schedule').then((data) => {
      setSchedule(data);
      console.log(data);
    });
  }, []);
  useEffect(() => {
    setRenderedWeek(
      schedule.find((week) => week.docName === displayedWeek.format('YY-WW'))
    );
  }, [schedule, displayedWeek]);

  const checkIsBaristaAvailable = (baristaEmail, i, editingWeek, cafeList) => {
    let isAvailable = true;
    for (let cafe of cafeList) {
      if (
        editingWeek.cafeList[cafe.name] &&
        editingWeek.cafeList[cafe.name].schedule[i]
      ) {
        if (
          editingWeek.cafeList[cafe.name].schedule[i].firstBarista.email ===
          baristaEmail
        ) {
          isAvailable = false;
        }
      }
    }
    return isAvailable;
  };

  const addNonExistentCafesToEditingWeek = (data) => {
    if (!data || !data.cafeList || !Array.isArray(daysOfWeek)) {
      return;
    }
    cafeList.forEach((cafe) => {
      if (!data.cafeList?.hasOwnProperty(cafe.name)) {
        data.cafeList = {
          ...data.cafeList,
          [cafe.name]: {
            cafeName: cafe.name,
            schedule: daysOfWeek.map((day) => {
              return {
                firstBarista: {
                  userName: '',
                  email: '',
                },
                secondBarista: {
                  userName: '',
                  email: '',
                },
                day,
              };
            }),
          },
        };
      }
    });
    console.log(data);
    return data;
  };

  const handlerOnChangeDisplayedWeek = (value) => {
    setDisplayedWeek(displayedWeek.clone().add(value, 'week'));
  };
  const handlerOnEditSchedule = () => {
    getDocFromDB('schedule', displayedWeek.format('YY-WW')).then((data) => {
      if (data) {
        setEditingWeek({ ...addNonExistentCafesToEditingWeek(data) });
        setEditMode(true);
        return;
      }
      setDocToDB('schedule', displayedWeek.format('YY-WW'), {
        docName: displayedWeek.format('YY-WW'),
        cafeList: {},
      })
        .then(() => {
          getDocFromDB('schedule', displayedWeek.format('YY-WW'));
        })
        .then((data) => {
          if (data) {
            setDocToDB('schedule', displayedWeek.format('YY-WW'), {
              ...addNonExistentCafesToEditingWeek(data),
            }).then((data) => {
              setEditingWeek(data);
              console.log(data);
            });
            setEditMode(true);
          }
        });
    });
  };

  const handlerOnSaveSchedule = () => {
    setDocToDB('schedule', editingWeek.docName, editingWeek).then(
      getDocsColectionFromDB('schedule').then((data) => {
        setSchedule(data);
        console.log(data);
      })
    );
    setEditingWeek({});
    setEditMode(false);
  };

  return (
    <div className="schedule">
      <div className="schedule_header">
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
      <div className="schedule_week-schedule">
        <div className="schedule_week-header">
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
        <div className="schedule_week-box">
          {editMode
            ? cafeList.map((cafe) => {
                return (
                  <div key={cafe.name} className="schedule_week-location-box">
                    <div className="schedule_week-location">{cafe.name}</div>
                    <div className="schedule_week-location-schedule">
                      {editingWeek.cafeList[cafe.name].schedule.map(
                        (day, i) => {
                          return (
                            <div className="schedule_week-location-day" key={i}>
                              <select
                                className="schedule_user-select"
                                style={{
                                  backgroundImage: `URL(${getAvatarByEmail(
                                    day.firstBarista.email,
                                    users
                                  )})`,
                                }}
                                value={
                                  editingWeek.cafeList[cafe.name].schedule[i]
                                    .firstBarista.email
                                }
                                onChange={(e) => {
                                  const updatedSchedule = editingWeek.cafeList[
                                    cafe.name
                                  ].schedule.map((scheduleItem, index) => {
                                    if (index === i) {
                                      return {
                                        ...scheduleItem,
                                        firstBarista: {
                                          ...scheduleItem.firstBarista,
                                          userName: e.target.value
                                            ? users.find(
                                                (elem) =>
                                                  e.target.value === elem.email
                                              ).userName
                                            : '',
                                          email: e.target.value
                                            ? e.target.value
                                            : '',
                                        },
                                      };
                                    }
                                    return scheduleItem;
                                  });
                                  setEditingWeek((editingWeek) => ({
                                    ...editingWeek,
                                    cafeList: {
                                      ...editingWeek.cafeList,
                                      [cafe.name]: {
                                        ...editingWeek.cafeList[cafe.name],
                                        schedule: updatedSchedule,
                                      },
                                    },
                                  }));
                                }}
                              >
                                <option value="">Оберіть бариста</option>
                                <option
                                  value={
                                    editingWeek.cafeList[cafe.name].schedule[i]
                                      .firstBarista.email
                                  }
                                >
                                  {
                                    editingWeek.cafeList[cafe.name].schedule[i]
                                      .firstBarista.userName
                                  }
                                </option>
                                {users
                                  .filter((userElem) =>
                                    user.role.isSuperadmin
                                      ? true
                                      : userElem.admin.email ===
                                        user.admin.email
                                  )
                                  .filter((userElem) =>
                                    checkIsBaristaAvailable(
                                      userElem.email,
                                      i,
                                      editingWeek,
                                      cafeList
                                    )
                                  )
                                  .map((userElem) => {
                                    return (
                                      <option
                                        key={userElem.email}
                                        value={userElem.email}
                                      >
                                        {userElem.userName}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })
            : cafeList?.map((cafe) => {
                if (!!renderedWeek) {
                  return (
                    <div
                      key={cafe?.name}
                      className="schedule_week-location-box"
                    >
                      <div className="schedule_week-location">{cafe?.name}</div>
                      <div className="schedule_week-location-schedule">
                        {renderedWeek &&
                          renderedWeek?.cafeList[cafe?.name].schedule.map(
                            (day, i) => {
                              return (
                                <div
                                  className="schedule_week-location-day"
                                  key={i}
                                >
                                  <img
                                    className="schedule_user-avatar"
                                    src={getAvatarByEmail(
                                      day.firstBarista.email,
                                      users
                                    )}
                                    alt="avatar"
                                  />
                                  <span className="schedule_user-name">
                                    {day.firstBarista.userName}
                                  </span>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  );
                }
                return <div></div>;
              })}
        </div>
      </div>
      <div
        className="schedule_buttons-box"
        style={!user.role.isAdmin ? { display: 'none' } : { display: 'flex' }}
      >
        <button
          style={editMode ? { display: 'none' } : { display: 'flex' }}
          onClick={handlerOnEditSchedule}
        >
          редагувати графік
        </button>
        <button
          style={editMode ? { display: 'flex' } : { display: 'none' }}
          onClick={handlerOnSaveSchedule}
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
    </div>
  );
};

export default Schedule;
