import "#styles/App.css";
import "#styles/navbar.css";
import { useEffect, useRef } from "react";
export default function Navbar() {
  const nameSpanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    // This is called an Immediately Invoked Function Expression (IIFE)
    (async () => {
      nameSpanRef.current?.classList.add("hovered");

      // This is basically an asyncio.sleep(0.6)
      await new Promise((resolve) => setTimeout(resolve, 600));

      nameSpanRef.current?.classList.remove("hovered");
    })();
  }, []);
  return (
    <div id="navbar">
      <h1>
        <a href="https://github.com/Benjamincf0/Resume/blob/main/Benjamin_Curis_Friedman.pdf">
          <span ref={nameSpanRef} className="hover-line hover-line-lr">
            Benjamin Curis-Friedman
          </span>
          <svg
            className="button-icon github"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#resume-icon"></use>
          </svg>
        </a>
      </h1>
      <ul className="navbarOptions">
        <li>
          <a href="https://github.com/Benjamincf0" target="_blank">
            <svg
              className="button-icon github"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#github-icon"></use>
            </svg>
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/benjaminc-f/" target="_blank">
            <svg
              className="button-icon linkedin"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#linkedin-icon"></use>
            </svg>
            LinkedIn
          </a>
        </li>
        <li>
          <a href="#contact">
            <svg
              className="button-icon social"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#social-icon"></use>
            </svg>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}
