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
    [ContactFormStates.CONFIRMED]: "Sent",
  };

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactFormState(ContactFormStates.SENT);

    setTimeout(() => setContactFormState(ContactFormStates.CONFIRMED), 2000);
    console.log(textareaRef.current?.value)
    // console.log(textareaText)
    // send to aws email service...
  }


  function handleAction(formData: FormData) {
    setContactFormState(ContactFormStates.SENT);
    setTimeout(() => setContactFormState(ContactFormStates.CONFIRMED), 2000);
    console.log(formData)
    console.log("submitted form")

  }

  return (
    <>
      <div id="contactForm">
        <form action={handleAction}>
          <div className="left">
            <h3>Reach out!</h3>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Mike Hawk" required/>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="mikehawk@gmail.com" required/>
            <button
              type="submit"
              disabled={contactFormState != ContactFormStates.UNSENT}
            >
              {buttonMessages[contactFormState]}
            </button>
          </div>
          <div className="right">
            <label htmlFor="textarea">Your message</label>
            <textarea id="textarea" name="message" required></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
