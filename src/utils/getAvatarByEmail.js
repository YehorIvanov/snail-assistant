const getAvatarByEmail = (email, users) => {
  try {
    let url = users.filter((elem) => elem.email === email)[0].userPhotoURL;
    if (url) return url;
    return '/img/placeholder.jpg';
  } catch (e) {
    console.log(e);
    return '/img/placeholder.jpg';
  }
};

export default getAvatarByEmail;
