const getAvatarByEmail = (email, users) => {
  try {
    console.log(users.filter((elem) => elem.email === email)[0].userPhotoUrl);
    let url = users.filter((elem) => elem.email === email)[0].userPhotoURL;
    console.log(url);
    if (url) return url;
    return '';
  } catch (e) {}
};

export default getAvatarByEmail;
