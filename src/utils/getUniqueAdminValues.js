function getUniqueAdminValues(users) {
  let uniqueValues = new Set();
  users.forEach((user) => {
    if (user.role.isAdmin) {
      const adminString = JSON.stringify({email: user.email, userName: user.userName});
      uniqueValues.add(adminString);
    }
  });
  return Array.from(uniqueValues).map((adminString) => JSON.parse(adminString));
}
export default getUniqueAdminValues;
 const getUniqueBarista = (ordersList) => {
  let uniqueValues = new Set();
  ordersList.forEach((order) => {
    if (order.creator.name) {
      const baristaString = JSON.stringify(order.creator.name);
      uniqueValues.add(baristaString);
    }
  });
  return Array.from(uniqueValues).map((baristaString) => JSON.parse(baristaString));
}