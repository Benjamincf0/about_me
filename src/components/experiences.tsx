import "#styles/experiences.css";
import reactLogo from "#assets/react.svg";
import typescriptLogo from "#assets/typescript-16-svgrepo-com.svg";
import glslLogo from "#assets/glsl-svgrepo-com.svg";
import downArrow from "#assets/down-arrow-5-svgrepo-com.svg";
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
    description: `• Rendered realistic optical distortion by writing custom vertex shader replacements for vtk in OpenGL.
• Contributed to open source libraries (pyvista & vtk), improving rendering performance and code coverage.
• Engineered a 3D robot emulator application using pyvista, enabling accurate surgery planning.
• Refactored a brain surgery robot networking protocol to make it resilient to corrupt data packets.
• Implemented robotic transcranial magnetic stimulation algorithms, setting a baseline for further research.
• Developed unit tests for existing classes and methods to improve code coverage in Objective-C.
• Implemented a vectorized SSIM image comparison algorithm for CI UITests using Apple’s vImage framework.                  `,
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
    description: `• Developed a video synchronization & compression library using FFmpeg and OpenCV to prepare for training.
• Coded a data pre-processing pipeline to clean raw human vital signals for machine learning models.
• Built and programmed a task labeling device using Arduino and C++ to split recording segments appropriately
• Created a high quality multi-modal dataset of over 50 hours of recordings from dozens of study participants.`,
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
          }) => (
            <li key={id} id={id}>
              <div className="experienceCard card" tabIndex={0}>
                <div className="top">
                  <div className="titleDiv">
                    <h3 className="title">{company}</h3>
                    <h3 className="subTitle">{position}</h3>
                  </div>
                  <div className="right">
                    <a href={loc_src} className="location">
                      {loc_str}
                    </a>
                    <p className="date_range">
                      {start_month} - {end_month}
                    </p>
                  </div>
                </div>
                <div className="bottom">
                  <div className="grower">
                    <p className="description">{desc}</p>
                  </div>
                </div>
                <img className="expandButton" src={downArrow} />
              </div>
            </li>
          ),
        )}
      </div>
    </>
  );
}
