import { createStyles } from "@mantine/core";

export const useClassroomChatBoxStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    height: "max-content",
  },

  button: {
    backgroundColor: theme.colors.dark[6],
    "&:hover": {
      backgroundColor: "gray",
    },
  },
}));
