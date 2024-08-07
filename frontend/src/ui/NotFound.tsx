import React, { Suspense } from "react";

import { useAppSelector } from "hooks";
import { selectTheme } from "store/auth/selectors";

const NotFoundDark = React.lazy(
  () => import("assets/images/not-found-dark.svg?react")
);
const NotFoundLight = React.lazy(
  () => import("assets/images/not-found-light.svg?react")
);
const NotFoundViolet = React.lazy(
  () => import("assets/images/not-found-violet.svg?react")
);

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const NotFound: React.FC<IProps> = ({ children }) => {
  const mode = useAppSelector(selectTheme);

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
      {children}
    </Suspense>
  );
};
