import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    gold: {
      50: "#E9F7F1",
      100: "#C7EDD9",
      200: "#A3E2C0",
      300: "#7FD7A7",
      400: "#5ACD8E",
      500: "#40B775", // primary green
      600: "#33965C",
      700: "#267644",
      800: "#1A542D",
      900: "#0D3315",
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.900",
      },
    }),
  },
});

export default theme;

// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   colors: {
//     gold: {
//       50: "#FFF9ED",
//       100: "#FFEFD1",
//       200: "#FFE0A3",
//       300: "#FFD075",
//       400: "#E8C06F",
//       500: "#C8A770",
//       600: "#B08D52",
//       700: "#8B6D3A",
//       800: "#6B5229",
//       900: "#4A3819",
//     },
//   },
//   fonts: {
//     heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
//     body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
//   },
//   config: {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },
//   styles: {
//     global: (props) => ({
//       body: {
//         bg: props.colorMode === "light" ? "gray.50" : "gray.900",
//       },
//     }),
//   },
// });

// export default theme;
