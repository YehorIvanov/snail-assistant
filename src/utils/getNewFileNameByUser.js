const getNewFileNameByUser = (oldName, user) => {
  const lastDotIndex = oldName.lastIndexOf('.');
  const fileExtension = oldName.substring(lastDotIndex + 1);
  const newFileName = `${new Date().getTime()}-${user}.${fileExtension}`;
  return newFileName;
};
export default getNewFileNameByUser;
