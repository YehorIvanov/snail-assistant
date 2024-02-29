import './Schedule.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import moment from 'moment';
import 'moment/locale/uk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { selectUsers } from '../../redux/slices/usersSlice';
import { selectCafeList } from '../../redux/slices/cafeSlice';
import setDocToDB from '../../utils/setDocToDB';
import getDocFromDB from '../../utils/getDocFromDB';
import getAvatarByEmail from '../../utils/getAvatarByEmail';
import { FaReply } from 'react-icons/fa';
import {
  selectSchedule,
  subscribeToSchedule,
} from '../../redux/slices/scheduleSlice';
import SheduleUserAvatar from './SheduleUserAvatar';
const Schedule = () => {
  moment.locale('uk');
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const cafeList = useSelector(selectCafeList);
  const currentDate = moment();
  const [displayedWeek, setDisplayedWeek] = useState(currentDate.clone());
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const [editMode, setEditMode] = useState(false);
  const [editingWeek, setEditingWeek] = useState({});
  const [renderedWeek, setRenderedWeek] = useState();
  const [display2Barista, setDisplay2Barista] = useState(false);
  const schedule = useSelector(selectSchedule);
  const dispatch = useDispatch();

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
            });
            setEditMode(true);
          }
        });
    });
  };

  const handlerOnSaveSchedule = () => {
    setDocToDB('schedule', editingWeek.docName, editingWeek).then(
      dispatch(subscribeToSchedule())
    );
    setEditingWeek({});
    setEditMode(false);
  };

  const handlerOnCopyPreviousWeek = () => {
    const currentWeek = { ...editingWeek };

    const previousWeek = schedule?.find(
      (week) =>
        week.docName === displayedWeek.clone().add(-1, 'week').format('YY-WW')
    );

    const myCafes = cafeList.filter((cafe) => cafe.admin.email === user.email);

    myCafes.forEach((cafe) => {
      if (
        currentWeek &&
        previousWeek &&
        previousWeek?.cafeList?.hasOwnProperty(cafe.name)
      ) {
        currentWeek.cafeList[cafe.name] = {
          ...previousWeek?.cafeList[cafe.name],
        };
      }
    });

    if (currentWeek) setEditingWeek(currentWeek);
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

        <h5 className="shedule_header-week">
          {displayedWeek.format('[Графік на] wo [тиждень]')}
        </h5>
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
              <div key={day} className="schedule_week-header-day">
                <span className="schedule_week-header-day-name">
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
                      {editingWeek?.cafeList[cafe.name]?.schedule?.map(
                        (day, i) => {
                          return (
                            <div className="schedule_week-location-day" key={i}>
                              <select
                                className="schedule_user-select"
                                style={{
                                  backgroundImage: `URL(${getAvatarByEmail(
                                    day?.firstBarista?.email,
                                    users
                                  )})`,
                                }}
                                value={
                                  editingWeek?.cafeList[cafe.name]?.schedule[i]
                                    .firstBarista?.email
                                }
                                onChange={(e) => {
                                  const updatedSchedule = editingWeek?.cafeList[
                                    cafe?.name
                                  ].schedule?.map((scheduleItem, index) => {
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
                    {display2Barista && (
                      <div className="schedule_week-location-schedule">
                        {editingWeek.cafeList[cafe.name].schedule.map(
                          (day, i) => {
                            return (
                              <div
                                className="schedule_week-location-day"
                                key={`${i}2`}
                              >
                                <select
                                  className="schedule_user-select"
                                  style={{
                                    backgroundImage: `URL(${getAvatarByEmail(
                                      day.secondBarista.email,
                                      users
                                    )})`,
                                  }}
                                  value={
                                    editingWeek.cafeList[cafe.name].schedule[i]
                                      .secondBarista.email
                                  }
                                  onChange={(e) => {
                                    const updatedSchedule =
                                      editingWeek.cafeList[
                                        cafe.name
                                      ].schedule.map((scheduleItem, index) => {
                                        if (index === i) {
                                          return {
                                            ...scheduleItem,
                                            secondBarista: {
                                              ...scheduleItem.secondBarista,
                                              userName: e.target.value
                                                ? users.find(
                                                    (elem) =>
                                                      e.target.value ===
                                                      elem.email
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
                                      editingWeek.cafeList[cafe.name].schedule[
                                        i
                                      ].secondBarista.email
                                    }
                                  >
                                    {
                                      editingWeek.cafeList[cafe.name].schedule[
                                        i
                                      ].secondBarista.userName
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
                    )}
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
                          renderedWeek?.cafeList[cafe?.name]?.schedule?.map(
                            (day, i) => {
                              return (
                                <SheduleUserAvatar
                                  key={i}
                                  {...{
                                    email: day.firstBarista.email,
                                    userName: day.firstBarista.userName,
                                    i,
                                    users,
                                  }}
                                />
                              );
                            }
                          )}
                      </div>
                      <div className="schedule_week-location-schedule">
                        {renderedWeek &&
                          renderedWeek?.cafeList[cafe?.name]?.schedule?.some(
                            (day, i) => !!day.secondBarista.email
                          ) &&
                          renderedWeek?.cafeList[cafe?.name].schedule?.map(
                            (day, i) => {
                              return (
                                <SheduleUserAvatar
                                  key={i}
                                  {...{
                                    email: day.secondBarista.email,
                                    userName: day.secondBarista.userName,
                                    i,
                                    users,
                                  }}
                                />
                              );
                            }
                          )}
                      </div>
                    </div>
                  );
                }
                return <div key={cafe?.name}></div>;
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
      <div
        className="schedule_buttons-box"
        style={!user.role.isAdmin ? { display: 'none' } : { display: 'flex' }}
      >
        <button
          style={editMode ? { display: 'flex' } : { display: 'none' }}
          onClick={() => setDisplay2Barista(!display2Barista)}
        >
          {display2Barista
            ? 'один бариста на локації'
            : 'показати 2 бариста на локації'}
        </button>
      </div>
      <div
        className="schedule_buttons-box"
        style={!user.role.isAdmin ? { display: 'none' } : { display: 'flex' }}
      >
        <button
          style={editMode ? { display: 'flex' } : { display: 'none' }}
          onClick={handlerOnCopyPreviousWeek}
        >
          копіювати попередній тиждень
        </button>
      </div>
    </div>
  );
};
export default Schedule;
