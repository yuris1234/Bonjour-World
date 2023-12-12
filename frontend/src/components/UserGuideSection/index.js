import React from "react";
import { useInView } from "react-intersection-observer";
import "./index.css";

const Instruction = ({ children, index, colorClass }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div
      className={`instruction ${inView ? "slide-in" : ""} ${
        index % 2 === 0 ? "slide-left" : "slide-right"
      }`}
      ref={ref}
    >
      <div className={colorClass}>
        {children}
      </div>
    </div>
  );
};

const UserGuideSection = () => {
  return (
    <div className="user-guide-section">
      <p>
        Welcome to Bonjour World, your gateway to language exchange and cultural
        understanding. Follow these steps to get started:
      </p>

      <Instruction index={0} colorClass="auth">
        <div className="instruction-div">
          <h3>1. Sign Up or Log In</h3>
          <p>
            Create a secure account or log in to start your language learning
            journey.
          </p>
        </div>
      </Instruction>

      <Instruction index={1} colorClass="event">
        <div className="instruction-div">
          <h3>2. Explore Language Exchange Events</h3>
          <p>
            Use the interactive maps powered by Google Maps to discover language
            exchange events near you.
          </p>
        </div>
      </Instruction>

      <Instruction index={2} colorClass="host-or-join">
        <div className="instruction-div">
          <h3>3. Host or Join Events</h3>
          <p>
            Host your own language exchange events or join existing ones. Manage
            events with ease using our intuitive event management system.
          </p>
        </div>
      </Instruction>

      <Instruction index={3} colorClass="customize-profile">
        <div className="instruction-div">
          <h3>4. Customize Your Profile</h3>
          <p>
            Personalize your user profile with information, preferences, and
            track your language learning progress and event history.
          </p>
        </div>
      </Instruction>

      <p>Get ready to embark on a linguistic adventure with Bonjour World!</p>
    </div>
  );
};

export default UserGuideSection;
