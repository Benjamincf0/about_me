import "#styles/contactme.css";
import { useRef, useState } from "react";

enum ContactFormStates {
  UNSENT,
  SENT,
  CONFIRMED,
}

export default function ContactForm() {
  const [contactFormState, setContactFormState] = useState(ContactFormStates.UNSENT);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setContactFormState(ContactFormStates.SENT);
    
    // send to aws email service...
  }

  return (
    <>
      <div id="contactForm">
        <form onSubmit={handleSubmit}>
          <div className="left">
            <h3>Reach out!</h3>
            <input type="text" placeholder="John Doe"></input>
            <input type="email" placeholder="mikehawk@gmail.com"></input>
            <button type="submit" disabled={contactFormState != ContactFormStates.UNSENT}>send</button>
          </div>
          <div className="right">
            <textarea></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
