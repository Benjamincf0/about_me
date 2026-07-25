import "#styles/contactme.css";
import { useRef, useState } from "react";

enum ContactFormStates {
  UNSENT,
  SENT,
  CONFIRMED,
}

export default function ContactForm() {
  const [contactFormState, setContactFormState] = useState(
    ContactFormStates.UNSENT,
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [textareaText, setTextareaText] = useState("");

  const buttonMessages = {
    [ContactFormStates.UNSENT]: "Send",
    [ContactFormStates.SENT]: "Sending ...",
    [ContactFormStates.CONFIRMED]: "Message received",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactFormState(ContactFormStates.SENT);

    setTimeout(() => setContactFormState(ContactFormStates.CONFIRMED), 2000);
    console.log(textareaRef.current?.value)
    // console.log(textareaText)
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
            <button
              type="submit"
              disabled={contactFormState != ContactFormStates.UNSENT}
            >
              {buttonMessages[contactFormState]}
            </button>
          </div>
          <div className="right">
            <textarea ref={textareaRef}></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
