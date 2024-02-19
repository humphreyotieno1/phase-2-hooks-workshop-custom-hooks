import { useEffect } from "react";

/* ✅ create a new function called useDocumentTitle */
export function useDocumentTitle(title) {
  /* 
    ✅ move the useEffect code into your useDocumentTitle function
  */
  useEffect(() => {
    document.title = title;
  }, [title]); // Make sure to include title in the dependency array
}

export default function Home() {
  /* 
    then, call the useDocumentTitle hook in your component
  */
  useDocumentTitle("Welcome to the home page!");

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        To see the title change in the browser tab, click the 'Open in new tab'
        link above
      </p>
    </div>
  );
}
