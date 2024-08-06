const BranchService = require("../services/branch.service");

const isValidPostcode = (postcode) => {
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  return postcodeRegex.test(postcode);
};

const isValidText = (text) =>
  typeof text === "string" && text.trim().length > 0;

const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;
  const parsedDate = Date.parse(date);
  return (
    !isNaN(parsedDate) &&
    new Date(parsedDate).toISOString().slice(0, 10) === date
  );
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);

async function isDuplicateKey(branchno) {
  try {
    return await BranchService.isDuplicateBranchNo(branchno);
  } catch (error) {
    console.error("Database error during duplicate key check:", error);
    throw error; // Rethrow the error after logging it
  }
}

module.exports = {
  isValidText,
  isValidEmail,
  isValidPostcode,
  isValidDate,
  isDuplicateKey,
};
