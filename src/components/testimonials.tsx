import "#styles/testimonials.css";

const testimonials = [
  {
    author: "Alexandru Ciobanu",
    message: `It was a pleasure to work with Ben.

He is intrinsically motivated, curious, and capable of absorbing, and quickly organizing vast amounts of technical information, including research literature.  

He is thorough and attentive to detail, but also productive. He is unafraid of working on complex systems, and helped us advance, significantly, several such projects.`,
  },
  {
    author: "Bob ",
    message: `babanini
asdf`,
  },
  {
    author: "Jeff Epstein teh new yorkersd",
    message: `babanini
asdf`,
  },
  {
    author: "Palm beach pete",
    message: `Bombosini gosini
tralalero tralala`,
  },
];

interface Testimonial {
  author: string;
  message: string;
}

export default function Testimonials() {
  return (
    <div className="testimonial_carousel">
      {[0, 1].map(() => (
        <ul className="testimonials">
          {testimonials.map(
            ({ author, message }: Testimonial, index: number) => (
              <li
                key={author}
                className="testimonial"
                style={{ "--i": index } as React.CSSProperties}
              >
                <p>{message}</p>
                <h3>- {author}</h3>
              </li>
            ),
          )}
        </ul>
      ))}
    </div>
  );
}
