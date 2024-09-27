import { createStyles } from "@mantine/core";

export const useClassroomChatBoxStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    height: "max-content",
  },

  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  button: {
    backgroundColor: theme.colors.dark[6],
    "&:hover": {
      backgroundColor: "gray",
    },
  },

  attachmentButton: {
    backgroundColor: theme.colors.green[7],
    "&:hover": {
      backgroundColor: theme.colors.green[5],
    },
  },
}));
