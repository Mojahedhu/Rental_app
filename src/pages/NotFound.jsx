import { Link } from "react-router-dom";
import "./notFound.css"; // Import the CSS file
import img from "../assets/images/404-page-not-found-removebg-preview.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      {/* Animated 404 Text */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <motion.h1
          className="not-found-title"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404 There&apos;s an error
        </motion.h1>
        <motion.img
          src={img}
          className="not-found-title"
          initial={{ scale: 0, x: 300 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Subtext */}
      <motion.p
        className="not-found-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        className="not-found-button-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link to={"/"} className="not-found-button">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
