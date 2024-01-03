function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  let month = dateObject.getMonth() + 1;
  let day = dateObject.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}
module.exports = formatDate;
