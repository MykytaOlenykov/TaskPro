export const convertToUtcDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};
