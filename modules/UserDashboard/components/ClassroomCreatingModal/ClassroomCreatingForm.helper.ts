export const convertTimeToDate = (time: string) => {
  const [hoursStr, minutesStr] = time.split(":");

  const hours = Number(hoursStr) || 0;
  const minutes = Number(minutesStr) || 0;

  const classTimeDate = new Date();
  classTimeDate.setHours(hours, minutes, 0, 0);

  return classTimeDate;
};
