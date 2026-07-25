import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import Navbar from "./components/navbar.tsx";
import Hero from "./components/hero.tsx";
import Experiences from "./components/experiences.tsx";
import Projects from "./components/projects.tsx";
import ContactForm from "./components/contactme.tsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <section id="center">
        <Hero />
      </section>

      <div className="ticks"></div>

      <section id="main">
        <Experiences />
        <div className="ticks"></div>
        <Projects />
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <section id="spacer"></section>

    </>
  );
}

export default App;
