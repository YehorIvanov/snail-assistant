const timestampToTimestring = (timestamp) => {
  const daysOfWeekArray = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  if (timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth().toString() + 1).padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2, 4);
    const dayOfWeek = daysOfWeekArray[date.getDay()];
    return `${dayOfWeek} ${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return;
};

export default timestampToTimestring;
