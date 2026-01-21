import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css"; 

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact-container">

        {/* HERO SECTION */}
        <section className="contact-hero-section text-center text-white">
          <div className="container">
            <h1 className="contact-hero-title">Contact Us</h1>
            <p className="contact-hero-description">
              We're here to help! Whether you have questions, feedback, or need support, 
              the CabX team is ready to assist you anytime.
            </p>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section className="contact-form-section">
          <div className="container">
            <h2 className="section-title text-center mb-4">Send Us a Message</h2>

            <div className="row justify-content-center">
              <div className="col-md-8">

                <div className="contact-form-card p-4 shadow-sm rounded">
                  <form>

                    <label className="form-label fw-bold">Full Name</label>
                    <input type="text" className="form-control mb-3" placeholder="Enter your name" required />

                    <label className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control mb-3" placeholder="Enter your email" required />

                    <label className="form-label fw-bold">Phone Number</label>
                    <input type="text" className="form-control mb-3" placeholder="Enter your mobile number" required />

                    <label className="form-label fw-bold">Describe your Issue</label>
                    <textarea className="form-control mb-3" rows="5" placeholder="Please describe your problem in detail..." required></textarea>

                    <button className="btn btn-dark w-100">Submit</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faq-section py-5">
          <div className="container">
            <h2 className="text-center mb-4 fw-bold">Frequently Asked Questions</h2>

            <div className="accordion" id="faqAccordion">

              
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    How do I book a cab with CabX?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    You can book a cab easily from our Book Ride page. Just enter your pickup and drop location and choose a cab type.
                  </div>
                </div>
              </div>

              
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    How do I contact customer support?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    You can fill the contact form above or email us at support@cabx.com.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    What payment methods do you accept?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    We accept UPI, Credit/Debit Cards, Netbanking, and Cash Payment.
                  </div>
                </div>
              </div>

              
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                    How do I become a CabX driver?
                  </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    You can register as a driver by submitting your details in the Driver Registration page.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}

export default Contact;
