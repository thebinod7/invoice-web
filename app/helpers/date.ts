export const checkIsOverdue = (date: Date) => {
  const now = new Date();
  return date < now;
};
