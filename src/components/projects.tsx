import "#styles/projects.css";

const projects = [
  {
    name: "OmniClaw",
    date: "May 2026",
    tags: [
      {
        name: "hackathon",
        color: "#121212",
      },
      {
        name: "group_project",
        color: "#5566ee",
      },
    ],
    gh_link: "https://github.com/Benjamincf0/omniclaw",
    description: "ggs",
    visual_link: "https://www.youtube.com/watch?v=bILXbqu0I_Q",
  },
  {
    name: "OmniClaw",
    date: "May 2026",
    tags: [
      {
        name: "hackathon",
        color: "#121212",
      },
      {
        name: "group_project",
        color: "#5566ee",
      },
    ],
    gh_link: "https://github.com/Benjamincf0/omniclaw",
    description: "ggs",
    visual_link: "penis",
  },
];

export default function Projects() {
  return (
    <>
      <div id="projects">
        {projects.map(
          ({ name, tags, gh_link, description, visual_link }, key) => (
            <div key={key} className="projectCard">
              <div className="top">
                {visual_link.includes("https://www.youtube.com") ? (
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/bILXbqu0I_Q?si=YQqIB_g-59lwRLjA&amp;controls=0"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                ) : (
                  <p>Youtube video unavailable</p>
                )}
              </div>
              <div className="header">
                <h3>{name}</h3>
                <div className="tags">
                  {tags.map(({ name, color }) => (
                    <p style={{backgroundColor: color}}>
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
}
