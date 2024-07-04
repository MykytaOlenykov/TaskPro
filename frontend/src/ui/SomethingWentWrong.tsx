import React, { Suspense } from "react";

import { useThemeContext } from "theme";

const SomethingWentWrongDark = React.lazy(
  () => import("assets/images/something-went-wrong-dark.svg?react")
);
const SomethingWentWrongLight = React.lazy(
  () => import("assets/images/something-went-wrong-light.svg?react")
);
const SomethingWentWrongViolet = React.lazy(
  () => import("assets/images/something-went-wrong-violet.svg?react")
);

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const SomethingWentWrong: React.FC<IProps> = ({ children }) => {
  const { mode } = useThemeContext();

  let SVGComponent: React.LazyExoticComponent<
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  >;

  if (mode === "light") {
    SVGComponent = SomethingWentWrongLight;
  } else if (mode === "violet") {
    SVGComponent = SomethingWentWrongViolet;
  } else {
    SVGComponent = SomethingWentWrongDark;
  }

  return (
    <Suspense>
      <SVGComponent
        style={{ maxWidth: 500, maxHeight: 500 }}
        width="100%"
        height="100%"
      />
      {children}
    </Suspense>
  );
};
