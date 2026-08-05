import Navbar from "#components/navbar.tsx";
import Hero from "#components/hero.tsx";
import Experiences from "#components/experiences.tsx";
import Projects from "#components/projects.tsx";
import ContactForm from "#components/contactme.tsx";
import "#styles/App.css";

function App() {
  return (
    <>
      <section id="header" style={{height: "100vh"}}>
        <Navbar />
        <Hero />
      </section>

      <div className="ticks"></div>

      <section id="main">
        <h2><span className="hover-line">Experience</span></h2>
        <Experiences />
        <div className="ticks"></div>
        <h2><span className="hover-line">Projects</span></h2>
        <Projects />
        <h2><span className="hover-line">Testimonials</span></h2>
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <section id="spacer"></section>
    </>
  );
}

export default App;
