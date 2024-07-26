import React from "react";
import styles from "./Home.module.css";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to DreamHome Esates!</h1>
      <div className={styles.card}>
        <p className={styles.description}>
          Discover your dream home with Sunny Estates. Our premium estate offers
          beautiful homes with modern amenities in a serene environment. Whether
          you’re looking for a cozy apartment or a spacious family home, we have
          a variety of options to suit your needs.
        </p>
        <p className={styles.cta}>
          Explore our listings and find the perfect place to call home. Contact
          us today to schedule a viewing and take the first step toward your new
          home!
        </p>
      </div>
    </div>
  );
}

export default HomePage;
