import "#styles/carousel.css";
import type { ReactNode } from "react";

export function CarouselItem({
  children,
  className,
  key,
}: {
  children?: ReactNode;
  className?: string;
  key: string | number;
}) {
  return (
    <li key={key} className={"carousel-item " + className}>
      {children}
    </li>
  );
}

export function Carousel({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className="carousel">
      {/* we duplicate the items so that it looks like they're moving... */}
      {[0, 1].map((key: number) => (
        <ul key={key} className={"carousel-list " + className}>
          <CarouselItem key={-1} className="fake-item-for-spacing"></CarouselItem>
          {children}
        </ul>
      ))}
    </div>
  );
}
