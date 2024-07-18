import React from "react";

import { NotFound } from "./NotFound";

export const NotFoundSubPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 500,
          flexGrow: 1,
          transform: "translateY(-60px)",
        }}
      >
        <NotFound />
      </div>
    </div>
  );
};
