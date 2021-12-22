import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    highlight: {
      "900": "#FFBA08"
    },
    dark: {
      "900": "#000000",
      "800": "#47585B",
      "700": "#999999",
    },
    light: {
      "900": "#DADADA",
      "800": "#F5F8FA",
      "700": "#FFFFFF",
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      body: {
        bg: 'light.800',
        color: 'dark.800',
      }
    }
  }
})