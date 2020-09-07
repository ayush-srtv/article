import React, { useEffect, useState } from "react";

function Article({ children, component: Component = "article", ...props }) {
  const [articleRef, setArticleRef] = useState();
  useEffect(() => {
    console.log({ articleRef });
    let observer;
    let didCancel = false;
    if (articleRef && IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          console.log(entries);
          entries.forEach((entry) => {
            if (!didCancel) {
              console.log(entry);
            }
          });
        },
        {
          threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
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
