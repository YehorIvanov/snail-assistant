function getUniqueAdminValues(users) {
  let uniqueValues = new Set();
  users.forEach((user) => {
    if (user.admin) {
      const adminString = JSON.stringify(user.admin);
      uniqueValues.add(adminString);
    }
  });
  return Array.from(uniqueValues).map((adminString) => JSON.parse(adminString));
}
export default getUniqueAdminValues;
