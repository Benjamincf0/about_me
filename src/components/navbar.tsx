import '../App.css'
export default function Navbar() {
  return (
    <div id="navbar">
      <h1>Navbar</h1>
      <div className="navbarOptions">
        <ul>
          <li>
            <a href="https://github.com/Benjamincf0" target="_blank">
              <svg
                className="button-icon"
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
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#github-icon"></use>
              </svg>
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/benjaminc-f/" target="_blank">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#github-icon"></use>
              </svg>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
