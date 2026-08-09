import reactLogo from "#assets/react.svg";
import typescriptLogo from "#assets/typescript-16-svgrepo-com.svg";
import glslLogo from "#assets/glsl-svgrepo-com.svg";
import "#styles/projects.css";
import TechStack from "./techstack";
import type { TechStackData } from "./techstack";

const projects = [
  {
    name: "OmniClaw",
    date: "May 2026",
    tags: [
      {
        name: "hackathon",
        color: "#323232",
      },
      {
        name: "group project",
        color: "#5566ee",
      },
      {
        name: "vibe coding",
        color: "#569e77",
      },
    ],
    stack: [
      {
        name: "React",
        img_src: reactLogo,
      },
      {
        name: "Typescript",
        img_src: typescriptLogo,
      },
      {
        name: "GLSL",
        img_src: glslLogo,
      },
    ],
    gh_link: "https://github.com/Benjamincf0/omniclaw",
    description: `MCP server for omnivox
at ass`,
    visual_link:
      "https://www.youtube.com/embed/bILXbqu0I_Q?si=YQqIB_g-59lwRLjA&amp;controls=0",
  },
  {
    name: "Neural network library",
    date: "May 2026",
    tags: [
      {
        name: "hackathon",
        color: "#323232",
      },
      {
        name: "no ai code",
        color: "#77569e",
      },
    ],
    stack: [
      {
        name: "React",
        img_src: reactLogo,
      },
      {
        name: "Typescript",
        img_src: typescriptLogo,
      },
      {
        name: "GLSL",
        img_src: glslLogo,
      },
    ],
    gh_link: "https://github.com/Benjamincf0/omniclaw",
    description: "ggs",
    visual_link: "penis",
  },
];

interface ProjectCardTag {
  name: string;
  color: string;
}

interface ProjectCardProps {
  name: string;
  date: string;
  tags: ProjectCardTag[];
  stack: TechStackData[];
  gh_link: string;
  description: string;
  visual_link: string;
}

export default function Projects() {
  return (
    <>
      <div id="projects">
        {projects.map((project) => (
          <Projectcard key={project.name} {...project} />
        ))}
      </div>
    </>
  );
}

function Projectcard({
  name,
  tags,
  stack,
  gh_link,
  description,
  visual_link,
}: ProjectCardProps) {
  return (
    <div key={name} className="projectCard card">
      <div className="top">
        {visual_link.includes("https://www.youtube.com") ? (
          <iframe
            width="560"
            height="315"
            src={visual_link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Video unavailable</p>
        )}
      </div>
      <div className="bottom">
        <div className="header">
          <div className="tags">
            {tags.map(({ name, color }) => (
              <p key={name} style={{ backgroundColor: color }}>
                {name}
              </p>
            ))}
          </div>
          <h3>{name}</h3>
        </div>
        <div className="mainContent">
          <p className="description">{description}</p>
          <TechStack stack={stack} />
        </div>
      </div>
    </div>
  );
}
