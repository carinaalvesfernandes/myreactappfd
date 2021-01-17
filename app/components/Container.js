import React, { useEffect } from "react";

function Container(props) {
  const { wide } = props;
  return (
    <div className={"container py-md-5 " + (wide ? "" : "container--narrow")}>
      {
        props.children /* Detta lagar all nested jsx data så som datan hos HomeGuest About och Terms*/
      }
    </div>
  );
}

export default Container;
