import { createStyles } from "@mantine/core";

export const useClassroomStreamBodyStyles = createStyles((theme) => ({
  streamBody: {
    display: "flex",
    gap: 6,
    marginTop: 10,
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  classInfo: {
    width: "23%",
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  boxDetails: {
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    textAlign: "center",
    padding: 16,
    marginBottom: 12,
  },
  detailsContainer: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  icon: {
    fontSize: "14px",
  },
}));
