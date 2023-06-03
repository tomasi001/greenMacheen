import { Button, ChakraProvider, Flex } from "@chakra-ui/react";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { type AppType } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import "regenerator-runtime/runtime";
import Footer from "~/components/footer";
import "~/styles/font.css";
import "~/styles/globals.css";
import { theme } from "~/theme";
import { api } from "~/utils/api";
const postHogPublicKey =
  process.env.REACT_APP_PUBLIC_POSTHOG_KEY ||
  "phc_Q3tMpjeZYQRAnmZKxPVC2mhVwJEqJsSzGHLZpWiBrp5";
const postHogHost =
  process.env.REACT_APP_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    posthog.init(postHogPublicKey, {
      api_host: postHogHost,
      disable_session_recording: true,
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

  const pathName = router.pathname;
  const regex = /^\/$|^.*\/sign\-up.*$|^.*\/sign\-in.*$/;

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
          {!regex.test(pathName) && (
            <Flex justifyContent="space-between" p="8px">
              <Link
                href={
                  router.pathname !== "/consultationHistory"
                    ? "/consultationHistory"
                    : "/chat"
                }
              >
                <Button size="md" bg={"#F79009"}>
                  {router.pathname !== "/consultationHistory"
                    ? "History"
                    : "Chat"}
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </Flex>
          )}
          <Component {...pageProps} />
          {router.pathname === "/" && <Footer />}
        </ChakraProvider>
      </ClerkProvider>
    </PostHogProvider>
  );
};

export default api.withTRPC(MyApp);
