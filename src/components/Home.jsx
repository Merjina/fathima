import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home-container">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="overlay"></div>
          <div className="hero-content text-center">
            <h1>Welcome to <span className="text-warning">ChittyPro</span></h1>
            <p className="lead">Your All-in-One Chitty Management System</p>
            {/* <button className="btn btn-primary" onClick={() => navigate("/login")}>Get Started</button> */}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section container py-5">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card text-center p-4 shadow rounded-4 h-100">
                <div className="icon mb-3">
                  <i className="fas fa-wallet fa-3x text-primary"></i>
                </div>
                <h3 className="fw-semibold mb-3">Chitty Scheme Management</h3>
                <p>Organize and manage multiple chitty schemes efficiently with smart automation.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card text-center p-4 shadow rounded-4 h-100">
                <div className="icon mb-3">
                  <i className="fas fa-gavel fa-3x text-success"></i>
                </div>
                <h3 className="fw-semibold mb-3">Auction Handling</h3>
                <p>Seamlessly conduct, manage, and monitor auctions for all participating members.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card text-center p-4 shadow rounded-4 h-100">
                <div className="icon mb-3">
                  <i className="fas fa-chart-line fa-3x text-warning"></i>
                </div>
                <h3 className="fw-semibold mb-3">Financial Insights</h3>
                <p>Access real-time reports, member statements, and fund tracking at your fingertips.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section (Optional) */}
        {/* <section className="cta-section text-center py-5">
          <h2 className="mb-4 text-white">Get Started with ChittyPro Today!</h2>
          <button className="btn btn-light btn-lg" onClick={() => navigate("/signup")}>
            Join Now
          </button>
        </section> */}

        <Footer />
      </div>
    </>
  );
};

export default Home;
