import { Flex, ResponsiveValue } from "@chakra-ui/react";
import * as CSS from "csstype";
import Lottie from "lottie-react";
import OzzyAnimation from "../animations/ozzy.json";

type LottyProps = {
  bottom?: string | number;
  right?: string | number;
  position?: ResponsiveValue<CSS.Property.Position> | undefined;
  transform?:
    | ResponsiveValue<"auto" | CSS.Property.Transform | "auto-gpu">
    | undefined;
};

const Lotty = ({ bottom, right, position, transform }: LottyProps) => {
  return (
    <Flex
      bottom={bottom}
      right={right}
      position={position}
      transform={transform}
    >
      <Lottie animationData={OzzyAnimation} loop={true} />
    </Flex>
  );
};

export default Lotty;
