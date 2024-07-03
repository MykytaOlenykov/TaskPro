import React, { Suspense } from "react";

import { useThemeContext } from "theme";

const NotFoundDark = React.lazy(
  () => import("assets/images/not-found-dark.svg?react")
);
const NotFoundLight = React.lazy(
  () => import("assets/images/not-found-light.svg?react")
);
const NotFoundViolet = React.lazy(
  () => import("assets/images/not-found-violet.svg?react")
);

export const NotFound: React.FC = () => {
  const { mode } = useThemeContext();

  let SVGComponent: React.LazyExoticComponent<
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  >;

  if (mode === "light") {
    SVGComponent = NotFoundLight;
  } else if (mode === "violet") {
    SVGComponent = NotFoundViolet;
  } else {
    SVGComponent = NotFoundDark;
  }

  return (
    <Suspense>
      <SVGComponent
        style={{ maxWidth: 500, maxHeight: 500 }}
        width="100%"
        height="100%"
      />
    </Suspense>
  );
};
