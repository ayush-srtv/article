import React, { useEffect } from "react";

function Article({ children, component: Component = "article", ...props }) {
  useEffect(() => {}, []);
  return <Component {...props}>{children}</Component>;
}

export default Article;
