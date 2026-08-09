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
    description: `• Built an MCP server for a student portal, empowering agents to help with homework and emails.
• Integrated OAuth2 to let users login from their favourite MCP client (i.e. Codex / Claude code).
• Automated a secondary login flow using a backend playwright instance to log into Omnivox on a user’s behalf.
• Reverse engineered the Omnivox website to replicate the http headers and intercept the bearer token.`,
    visual_link:
      "https://www.youtube.com/embed/bILXbqu0I_Q?si=YQqIB_g-59lwRLjA&amp;controls=0",
  },
  {
    name: "NeuralFlow",
    date: "May 2026",
    tags: [
      {
        name: "personal project",
        color: "#323882",
      },
      {
        name: "no ai code",
        color: "#77569e",
      },
    ],
    stack: [
      {
        name: "Python",
        img_src: typescriptLogo,
      },
      {
        name: "Numpy",
        img_src: glslLogo,
      },
    ],
    gh_link: "https://github.com/Benjamincf0/Neural-Network-Library",
    description: `• Created a NN library complete with mini-batch gradient descent and activation/cost functions.
• Trained a sequential neural network achieving ∼96% test accuracy on MNIST dataset.
• Implemented customizable network and layer shapes for enhanced flexibility and scalability.
• Visualized inference with an interactive real-time digit recognition game using PyGame`,
    visual_link: "penis",
  },
  {
    name: "Cheese Manager",
    date: "May 2026",
    tags: [
      {
        name: "personal project",
        color: "#323882",
      },
      {
        name: "no ai code",
        color: "#77569e",
      },
    ],
    stack: [
      {
        name: "Python",
        img_src: typescriptLogo,
      },
      {
        name: "Numpy",
        img_src: glslLogo,
      },
    ],
    gh_link: "https://github.com/Benjamincf0/Neural-Network-Library",
    description: `• Developed an application for a comté cheese distribution business following the MVC pattern in Java.
• Created an aesthetically pleasing user interface with JavaFX using reusable components.
• Collaborated with teammates to create a UML class diagram and state diagram using Umple.`,
    visual_link: "penis",
  },
  {
    name: "WebChat",
    date: "May 2026",
    tags: [
      {
        name: "personal project",
        color: "#323882",
      },
      {
        name: "no ai code",
        color: "#77569e",
      },
    ],
    stack: [
      {
        name: "Python",
        img_src: typescriptLogo,
      },
      {
        name: "Numpy",
        img_src: glslLogo,
      },
    ],
    gh_link: "https://github.com/Benjamincf0/Neural-Network-Library",
    description: `• Developed a full-stack web messaging platform with authentication to message friends.
• Programmed search and adding friends features with Cloud Functions.
• Implemented Firestore security rules to ensure secure communications.`,
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
