import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";


import prasad from "../images/prasad.jpg";
import nutesh from "../images/nutesh.jpg";
import prashant from "../images/prashant.jpg";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-container">

        {/* HERO SECTION */}
        <section className="hero-section text-center text-white">
          <div className="container">
            <h1 className="hero-title">About CabX</h1>
            <p className="hero-description">
              CabX is a modern, safe, and user-friendly cab booking platform
              designed to make your travel easy, secure, and fast. Our vision
              is to provide a smooth and reliable transportation experience
              through innovation, teamwork, and technology.
            </p>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="vision-section">
          <div className="container text-center">
            <h2 className="section-title">Our Vision & Mission</h2>

            <div className="row justify-content-center">

              <div className="col-md-6 mb-4">
                <div className="vision-card">
                  <h4 className="vision-title">Our Vision</h4>
                  <p className="vision-text">
                    To redefine urban travel with a reliable and technology-driven
                    cab service that prioritizes safety, punctuality, and comfort.
                    CabX aims to make transportation smarter, more accessible,
                    and more affordable for everyone.
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="vision-card">
                  <h4 className="vision-title">Our Mission</h4>
                  <p className="vision-text">
                    Our mission is to create a seamless platform where users can
                    book cabs effortlessly, drivers can work efficiently, and the
                    admin can manage everything smoothly. We focus on trust,
                    quality service, and customer satisfaction.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="team-section">
          <div className="container">
            <h2 className="text-center team-title fw-bold">Meet Our Team</h2>

            <div className="row g-4 justify-content-center">

              
              <div className="col-md-4">
                <div className="team-card text-center h-100">
                  <div className="team-card-body">
                    <img src={prasad} alt="Vedant Mali" className="team-image" />
                    <h5 className="team-name">Prasad Talekar</h5>
                    <p className="team-role">Backend Developer</p>
                    <p className="team-description">
                      He handles server-side logic, APIs, and database
                      management, ensuring smooth and secure functioning of the
                      CabX system behind the scenes.
                    </p>
                  </div>
                </div>
              </div>

            
              <div className="col-md-4">
                <div className="team-card text-center h-100">
                  <div className="team-card-body">
                    <img src={nutesh} alt="Vaishnavi Pardeshi" className="team-image" />
                    <h5 className="team-name">Nutesh Tajane</h5>
                    <p className="team-role">Frontend & Database Developer</p>
                    <p className="team-description">
                      He designs beautiful UI components and ensures that
                      the CabX application remains clean, responsive, and easy to
                      use while also maintaining key database aspects.
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="col-md-4">
                <div className="team-card text-center h-100">
                  <div className="team-card-body">
                    <img src={prashant} alt="Nutesh Tajne" className="team-image" />
                    <h5 className="team-name">Prashant Patil</h5>
                    <p className="team-role">Frontend Developer</p>
                    <p className="team-description">
                      He worked on frontend design, dashboard creation, and 
                      UI enhancements, ensuring smooth navigation and a modern
                      user experience throughout CabX.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer-section text-center text-white">
          <p className="footer-text mb-0">
             {new Date().getFullYear()} CabX Cab Booking Platform.
          </p>
        </footer>

      </div>
    </>
  );
}

export default About;
