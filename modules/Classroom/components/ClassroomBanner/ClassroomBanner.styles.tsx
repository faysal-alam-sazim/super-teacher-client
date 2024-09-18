import { createStyles } from "@mantine/core";

export const useBannerStyles = createStyles((theme) => ({
  banner: {
    marginTop: "12px",
    position: "relative",
  },
  bannerTitle: {
    position: "absolute",
    padding: "16px",
    bottom: 0,
    left: 0,
    width: "100%",
  },

  dropdownButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },

  classDetails: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));
