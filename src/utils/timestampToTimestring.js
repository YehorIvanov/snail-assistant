const timestampToTimestring = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth().toString() + 1).padStart(2, '0');
    const year = (date.getFullYear().toString() + 1).padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // console.log(` ${day}.${month}.${year} ${hours}:${minutes}`);
    return ` ${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return;
};

export default timestampToTimestring;
