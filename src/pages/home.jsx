
import qrPhone from "../assets/qr-phone.png";
import AboutSvg from "../assets/About.svg";

function Home() {

  return (
    <>
      <header className="navbar">
        <h1>SafePass</h1>
        <nav>
          <a href="/home.jsx">Home</a>
          <a href="/register">Register</a>
          <a href="/checks.jsx">Check In/Out</a>
          <a href="/logs">Logs</a>
          
        </nav>
      </header> 

       <section className="hero">
    <div className="hero-content">
  <h1>QR Code Visitor Management System</h1>
  <p>
    We make entry secure and tracked.<br />
    Your registration ensures real-time check-in logs and instant communication
    with your host.
  </p>
</div>

    <div className="hero-image">
      <div className="circle">
        <img src={qrPhone} alt="QR Code Phone" />
      </div>
    </div>
  </section>

      <section id="AboutUS" className="page-section">
        <div className="aboutUsPage">
          <div className="left-image">
            <img src={AboutSvg} alt="Visitor" />
          </div>

          <div className="right-contentAboutUs">
            <h1 style={{ color: "#021855", fontSize: "3.5em" }}>
              <b>The Future of Visitor Access.</b>
            </h1>

            <p style={{ color: "#082192", fontSize: "1.2em" }}>
              SafePass is designed for modern, secure facilities.
            </p>

            <p style={{ color: "#082192", fontSize: "1.2em" }}>
              Our system replaces paper logs with encrypted, digital QR passes,
              ensuring rapid, pre-verified access and enhanced security for every visitor.
            </p>

            <h2 style={{ color: "#0e5a86", fontSize: "2em" }}>
              Register, Display and Go
            </h2>
          </div>
        </div>
      </section>

      <section id="SafePassWorks" className="page-section">
        <h2 className="works-title">How SafePass Works</h2>

        <div className="works-card-container">
          <div className="works-card">
            <div className="step-number">1</div>
            <h3>Register Visitor</h3>
            <p>The visitor enters their basic details including name, phone number, and purpose of visit.</p>
          </div>

          <div className="works-card">
            <div className="step-number">2</div>
            <h3>Generate QR Pass</h3>
            <p>SafePass instantly generates a secure digital QR code for smooth entry processing.</p>
          </div>

          <div className="works-card">
            <div className="step-number">3</div>
            <h3>Scan at Entrance</h3>
            <p>Security scans the QR code for quick and contactless verification upon arrival.</p>
          </div>

          <div className="works-card">
            <div className="step-number">4</div>
            <h3>Track & Monitor</h3>
            <p>All check-in and check-out activity is recorded on the dashboard for enhanced security.</p>
          </div>
        </div>
      </section>

      <section id="KeyFeatures" className="page-section">
        <h2>Features</h2>

        <div className="f-container">
          <div className="f-card">
            <h3>Visitor Registration</h3>
            <p>Easily register visitors with essential details, reducing paperwork and improving efficiency.</p>
          </div>

          <div className="f-card">
            <h3>QR Pass Generation</h3>
            <p>Generate unique QR codes for contactless and secure visitor check-ins.</p>
          </div>

          <div className="f-card">
            <h3>Security Dashboard</h3>
            <p>Monitor live visitor status and access points in a centralized dashboard.</p>
          </div>

          <div className="f-card">
            <h3>Check-in/Check-out Logs</h3>
            <p>Maintain accurate records of all visitor movements for accountability and safety.</p>
          </div>

          <div className="f-card">
            <h3>Reports</h3>
            <p>Generate detailed visitor and access reports for insights and better decision-making.</p>
          </div>
        </div>
      </section>

      <section id="ContactUs" className="page-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <p><strong>Contact:</strong> safepass.support@gmail.com | +92 300 1234567</p>
          <p><strong>Office:</strong> SafePass Security Center, Karachi, Pakistan</p>
          <p>
            <strong>Support:</strong>{" "}
            <a href="#">Help Center | </a>
            <a href="#">FAQs | </a>
            <a href="#">Feedback</a>
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 SafePass. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
