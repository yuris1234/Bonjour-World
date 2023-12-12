import React from "react";
import "./index.css";

const UserGuideSection = () => {
  return (
    <div className="user-guide-section">
      <p>
        Welcome to Bonjour World, your gateway to language exchange and cultural
        understanding. Follow these steps to get started:
      </p>

      <div className="instruction auth">
        <h3>1. Sign Up or Log In</h3>
        <p>
          Create a secure account or log in to start your language learning
          journey.
        </p>
      </div>

      <div className="instruction event">
        <h3>2. Explore Language Exchange Events</h3>
        <p>
          Use the interactive maps powered by Google Maps to discover language
          exchange events near you.
        </p>
      </div>

      <div className="instruction host-or-join">
        <h3>3. Host or Join Events</h3>
        <p>
          Host your own language exchange events or join existing ones. Manage
          events with ease using our intuitive event management system.
        </p>
      </div>

      <div className="instruction customize-profile">
        <h3>4. Customize Your Profile</h3>
        <p>
          Personalize your user profile with information, preferences, and track
          your language learning progress and event history.
        </p>
      </div>

      <p>Get ready to embark on a linguistic adventure with Bonjour World!</p>
    </div>
  );
};

export default UserGuideSection;
