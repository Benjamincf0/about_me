import "./contactme.css";

export default function ContactForm() {
  return (
    <>
      <div id="contactForm">
        <form>
          <div className="left">
            <h3>Reach out!</h3>
            <input type="email"></input>
            <input></input>
          </div>
          <div className="right">
            <textarea></textarea>
          </div>
          <button type="submit"></button>
        </form>
      </div>
    </>
  );
}
