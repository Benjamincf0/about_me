import Navbar from "#components/navbar.tsx";
import Hero from "#components/hero.tsx";
import Experiences from "#components/experiences.tsx";
import Projects from "#components/projects.tsx";
import ContactForm from "#components/contactme.tsx";
import "#styles/App.css";

function App() {

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
