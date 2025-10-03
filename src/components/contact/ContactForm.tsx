import { FormEventHandler } from "react";

interface ContactFormProps {
  handleBlur: () => void;
  handleFocus: () => void;
  handleSubmit: FormEventHandler;
  formRef: React.RefObject<HTMLFormElement>;  
  isLoading: boolean;
}

export const ContactForm = ({
  handleBlur,
  handleFocus,
  handleSubmit,
  formRef,
  isLoading,
}: ContactFormProps) => {

  return (
    <section className="flex-1 min-w-[50%] flex flex-col">
      <h1 className="head-text">Get in Touch</h1>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e); // Pass the form event, not just any event
        }}
        className="w-full flex flex-col gap-6 mt-14"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-black-500 font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name..."
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-black-500 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email..."
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-black-500 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="textarea"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="btn"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
};
