import dayjs from "dayjs";

export const isPastDueDate = (submittedAt: Date, dueDate: Date) => {
  const dueDateObject = dayjs(dueDate);
  return dueDateObject.isBefore(dayjs(submittedAt));
};
