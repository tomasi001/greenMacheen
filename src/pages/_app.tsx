import { ChakraProvider, Flex } from "@chakra-ui/react";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import "regenerator-runtime/runtime";
import "~/styles/font.css";
import "~/styles/globals.css";
import { theme } from "~/theme";
import { api } from "~/utils/api";
const postHogPublicKey = "phc_Q3tMpjeZYQRAnmZKxPVC2mhVwJEqJsSzGHLZpWiBrp5";
const postHogHost = "https://eu.posthog.com";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    posthog.init(postHogPublicKey, {
      api_host: postHogHost,
    });
  }

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <PostHogProvider client={posthog}>
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
    </PostHogProvider>
  );
};

export default api.withTRPC(MyApp);
