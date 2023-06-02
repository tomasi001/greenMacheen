import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '~/styles/font.css'

// pages/_app.js
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  fonts:{
    body: 'Outfit'
  }
})


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
