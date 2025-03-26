import React from "react";
import { Atom } from "react-loading-indicators";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Atom color="orange" size="large" text="Loading..." textColor="" />
    </div>
  );
}

export default Loading;
