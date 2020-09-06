import React, { useEffect, useState } from "react";

function Article({ children, component: Component = "article", ...props }) {
  const [articleRef, setArticleRef] = useState();
  useEffect(() => {
    let observer;
    let didCancel = false;
    if (articleRef && IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              !didCancel &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "75%"
        }
      );
    }

    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(articleRef);
      }
    };
  }, [articleRef]);
  return (
    <Component ref={setArticleRef} {...props}>
      {children}
    </Component>
  );
}

export default Article;
