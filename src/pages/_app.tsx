import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import 'regenerator-runtime/runtime'
import { ClerkProvider } from "@clerk/nextjs";

// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
