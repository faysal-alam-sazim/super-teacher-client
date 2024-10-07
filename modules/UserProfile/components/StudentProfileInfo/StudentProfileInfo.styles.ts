import { createStyles } from "@mantine/core";

export const useStudentProfileStyles = createStyles((theme) => ({
  infoBox: {
    marginBottom: 32,
  },

  label: {
    color: theme.colors.gray[0],
    fontWeight: "bold",
  },

  info: {
    color: theme.colors.green[7],
    fontWeight: "bold",
  },

  subjectsList: {
    width: "50%",
    marginTop: 12,
  },

  tableHeader: {
    backgroundColor: theme.colors.gray[1],
  },

  tableSL: {
    fontWeight: "bold",
    color: theme.colors.green[7],
    textAlign: "center",
  },

  tableData: {
    fontWeight: "bold",
    color: theme.colors.green[7],
    textAlign: "center",
  },
}));
