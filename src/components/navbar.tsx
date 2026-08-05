import "#styles/App.css";
import "#styles/navbar.css";
export default function Navbar() {
  return (
    <div id="navbar">
      <h1>Benjamin Curis-Friedman</h1>
      <ul className="navbarOptions">
        <li>
          <a href="https://github.com/Benjamincf0" target="_blank">
            <svg className="button-icon github" role="presentation" aria-hidden="true">
              <use href="/icons.svg#github-icon"></use>
            </svg>
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/benjaminc-f/" target="_blank">
            <svg className="button-icon linkedin" role="presentation" aria-hidden="true">
              <use href="/icons.svg#linkedin-icon"></use>
            </svg>
            LinkedIn
          </a>
        </li>
        <li>
          <a href="#contact">
            <svg className="button-icon social" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}
