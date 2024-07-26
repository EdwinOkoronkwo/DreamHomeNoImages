// const isValidText = (text) =>
//   typeof text === "string" && text.trim().length > 0;

// const isValidEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

const isValidPostcode = (postcode) => {
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  return postcodeRegex.test(postcode);
};

const isValidText = (text) =>
  typeof text === "string" && text.trim().length > 0;

const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Match YYYY-MM-DD format
  if (!regex.test(date)) return false;
  const parsedDate = Date.parse(date);
  return (
    !isNaN(parsedDate) &&
    new Date(parsedDate).toISOString().slice(0, 10) === date
  );
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);

// const isValidDate = (date) => !isNaN(Date.parse(date));

// const isValidImageUrl = (url) => {
//   return (
//     typeof url === "string" && url.match(/\.(jpeg|jpg|gif|png)$/i) !== null
//   );
// };

module.exports = {
  isValidText,
  isValidEmail,
  isValidPostcode,
  isValidDate,
  // isValidImageUrl,
};
