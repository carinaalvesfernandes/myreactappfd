import React, { useEffect } from "react";

function Container(props) {
  const { wide } = props;
  return (
    <div className={"container py-md-5 " + (wide ? "" : "container--narrow")}>
      {props.children}
    </div>
  );
}

export default Container;
