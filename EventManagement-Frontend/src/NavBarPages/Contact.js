import { useState } from "react";
import { Link } from "react-router-dom";
import "../NavBarPagesCss/Contact.css";
import Footer from "../OtherPage/Footer";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset(); // Optional: clear the form
  };

  return (
    <>
      <div className="contact-container">
        <div className="contact-heading text-center mb-4">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtext">
            We'd love to hear from you! Please fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        {submitted && (
          <div className="contact-alert text-center" role="alert">
            Your message has been sent successfully!
          </div>
        )}

        <div className="contact-form-wrapper">
          <form
            className="contact-form"
            action="https://formsubmit.co/your-email@example.com"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

            <div className="contact-form-group">
              <label className="contact-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="contact-input"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="contact-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="contact-input"
                placeholder="Enter subject"
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-label">Message</label>
              <textarea
                name="message"
                className="contact-textarea"
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-button">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info text-center">
          <h4>Reach Us At</h4>
          <p>📞 +91 98765 43210</p>
          <p>📧 occasioncrafteventmanagement@gmail.com</p>
          <p>📍 Pune, Maharashtra, India</p>
        </div>

        <footer className="footer-wrapper">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Contact;
