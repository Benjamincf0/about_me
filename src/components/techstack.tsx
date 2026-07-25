import "#styles/techstack.css"

interface TechStackData {
  name: string;
  img_src: string;
}

export default function TechStack({ stack }: { stack: TechStackData[] }) {
  return <ul className="techStack">
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
  </ul>;
}
