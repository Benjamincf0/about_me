import "./experiences.css";
import reactLogo from "../assets/react.svg";
import typescriptLogo from "../assets/typescript-16-svgrepo-com.svg";
import glslLogo from "../assets/glsl-svgrepo-com.svg";
// import locationIcon from "src/assets/locationIcon.svg";
const experiences = [
  {
    id: "0",
    company: "Rogue-Research",
    position: "Software Developer Intern",
    location: {
      str: "Montreal, QC",
      src: "https://maps.app.goo.gl/fkQovPx7S62jJm9f7",
    },
    start_month: "Jan. 2026",
    end_month: "Aug. 2026",
    description: `- Wrote glsl shaders`,
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
  },
  {
    id: "1",
    company: "iSmart AI lab @ McGill",
    position: "Software Developer Intern",
    location: {
      str: "Montreal, QC",
      src: "https://maps.app.goo.gl/kj6KiMxP2A7ghNg39",
    },
    start_month: "May. 2025",
    end_month: "Dec. 2025",
    description: `- Did ai stuff lessgooo`,
    stack: [
      {
        name: "Python",
        img_src: "pythonlogosvg",
      },
    ],
  },
];

export default function Experiences() {
  return (
    <>
      <div id="experiences">
        {experiences.map(
          ({
            id,
            position,
            company,
            location: { str: loc_str, src: loc_src },
            start_month,
            end_month,
            description: desc,
            stack,
          }) => (
            <li key={id} id={id}>
              <div className="experienceCard">
                <div className="top">
                  <div className="titleDiv">
                    <h3 className="title">{company}</h3>
                    <h3 className="subTitle">{position}</h3>
                  </div>
                  <div className="right">
                    <a href={loc_src} className="location">
                      {/* <img src={locationIcon}></img> */}
                      {loc_str}
                    </a>
                    <p className="date_range">
                      {start_month} - {end_month}
                    </p>
                  </div>
                </div>
                <div className="bottom">
                  <p className="description">{desc}</p>
                  <ul className="techStack">
                    {stack.map(({ name, img_src }, index) => (
                      <li
                          key={index}
                        style={{
                          left: `${-15 * index + 15 * (stack.length - 1)}px`,
                        }}
                      >
                        <img src={img_src} />
                        <div className="grower">
                          <p>{name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ),
        )}
      </div>
    </>
  );
}
