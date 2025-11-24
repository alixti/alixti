import { useState } from 'react';
import '../css/Contact.css';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
      });
      setSubmitStatus('success');
      e.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header fade-in">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">Have a question or want to work together? Drop me a message!</p>
        </div>
        
        {submitStatus === 'success' && (
          <div className="alert alert-success contact-alert fade-in">
            <i className="bi bi-check-circle-fill me-2"></i>
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="alert alert-danger contact-alert fade-in">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Error sending message. Please try again.
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="contact-form fade-in">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <i className="bi bi-person-fill me-2"></i>Your Name
            </label>
            <input 
              type="text" 
              className="form-control contact-input" 
              id="name" 
              name="name" 
              placeholder="John Doe"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope-fill me-2"></i>Your Email
            </label>
            <input 
              type="email" 
              className="form-control contact-input" 
              id="email" 
              name="email" 
              placeholder="john@example.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <i className="bi bi-chat-dots-fill me-2"></i>Your Message
            </label>
            <textarea 
              className="form-control contact-input contact-textarea" 
              id="message" 
              name="message" 
              rows="6" 
              placeholder="Tell me about your project or just say hi..."
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2"></i>
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;