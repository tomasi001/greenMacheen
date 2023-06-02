import { ChakraProvider, Flex } from "@chakra-ui/react";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { type AppType } from "next/app";
import "regenerator-runtime/runtime";
import "~/styles/font.css";
import "~/styles/globals.css";
import { theme } from "~/theme";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#F79009",
          colorBackground: "#FFFCF5",
        },
      }}
      {...pageProps}
    >
      <ChakraProvider theme={theme}>
        <Flex justifyContent="flex-end" p="8px">
          <UserButton afterSignOutUrl="/" />
        </Flex>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
