import "#styles/readings.css"
import { Carousel, CarouselItem } from "#components/carousel.tsx";

const readings = [
  {
    title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
    author: "Kerbl et al. (2023)",
    img_src: "3D Gaussian Splatting for Real-Time Radiance Field Rendering Large.jpg",
  },
  {
    title: "Automated search of stimulation targets with closed-loop transcranial magnetic stimulation",
    author: "Tervo et al. (2020)",
    img_src: "aino2020.jpeg",
  },
  {
    title: "The Visualization Toolkit (VTK) Textbook",
    author: "Schroeder, Martin, & Lorensen, 2006",
    img_src: "vtk.jpg",
  },
  {
    title: "Automated TMS hotspot-hunting using a closed loop threshold-based algorithm",
    author: "Meincke et al. (2016)",
    img_src: "meincke.jpg",
  },
  {
    title: "Code complete 2",
    author: "Steve McConnel",
    img_src: "code-complete.jpg",
  },
];

interface Reading {
  title: string;
  author: string;
  img_src: string;
}

export default function Readings() {
  return (
    <Carousel className="reading-carousel">
      {readings.map(({ title, author, img_src }: Reading) => (
        <CarouselItem key={title} className="reading-item">
          <img src={"readings/"+img_src} />
          <h3>{title.slice(0, 30)}{title.length>30?" ...":""}</h3>
          <p>{author}</p>
        </CarouselItem>
      ))}
    </Carousel>
  );
}
