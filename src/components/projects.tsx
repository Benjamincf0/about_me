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
        color: "#121212",
      },
      {
        name: "group_project",
        color: "#5566ee",
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

function Projectcard({ name, tags, stack, gh_link, description, visual_link  }: ProjectCardProps) {
  // const { name, tags, stack, gh_link, description, visual_link } = project;
  return (
    <div key={name} className="projectCard">
      <div className="top">
        {visual_link.includes("https://www.youtube.com") ? (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/bILXbqu0I_Q?si=YQqIB_g-59lwRLjA&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
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
            <p style={{ backgroundColor: color }}>{name}</p>
          ))}
        </div>
      </div>
      <div className="mainContent">
        <TechStack stack={stack}/>
      </div>
    </div>
  );
}
