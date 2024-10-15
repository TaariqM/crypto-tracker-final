import "../css/footer.css";

const Footer = () => {
  return (
    <div className="pageFooter">
      <p className="copy-right">
        &copy; 2024 Crypto Coin Tracker. All rights reserved
      </p>
      <div className="connect-footer-Icons">
        <p>Connect With Us</p>
        <div className="footer-Icons">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-github"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
