import { createStyles } from "@mantine/core";
import dayjs from "dayjs";

export const useExamCardStyles = createStyles((theme, dueDate: Date) => {
  const dueDateObject = dayjs(dueDate);
  const isPastDueDate = dueDateObject.isBefore(dayjs());

  return {
    card: {
      background: isPastDueDate ? theme.colors.gray[5] : theme.colors.gray[0],
      color: theme.colors.dark,
      padding: 16,
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },

    icon: {
      background: isPastDueDate ? theme.colors.gray[6] : theme.colors.gray[3],
      padding: 6,
      width: 24,
      height: 24,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
    },

    cardEnd: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginTop: "auto",
    },
  };
});
