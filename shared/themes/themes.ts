import { MantineThemeOverride } from "@mantine/core";

export const appTheme: MantineThemeOverride = {
  colorScheme: "light",
  globalStyles: (theme) => ({
    body: {
      backgroundColor: "#00224D",
      color: theme.white,
    },
  }),
};
