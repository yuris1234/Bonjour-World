import React, { useEffect, useState } from "react";
import Eltion from "../../static/images/img1.png";
import Yuri from "../../static/images/img2.png";
import Claudia from "../../static/images/img3.png";
import Jason from "../../static/images/img1.png";
import "./index.css";
import Globe from "../Globe/Globe";
import NavBar from "../NavBar";

const teamMembers = [
  {
    name: "Eltion",
    role: "Team Lead",
    github: "",
    linkedin: "",
  },
  {
    name: "Yuri",
    role: "Backend Lead",
    github: "",
    linkedin: "",
  },
  {
    name: "Claudia",
    role: "Frontend Lead",
    github: "",
    linkedin: "",
  },
  {
    name: "Jason",
    role: "Flex Lead",
    github: "",
    linkedin: "",
  },
];

const AboutUs = () => {
    const changingLanguages = ["en", "ch", "sp", "fr", "ar"];
    const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentLanguageIndex(
          (prevIndex) => (prevIndex + 1) % changingLanguages.length
        );
      }, 4000);

      return () => clearInterval(intervalId);
    }, []);

  function displayMeetTheTeam() {
    const currentLanguage = changingLanguages[currentLanguageIndex];
    switch (currentLanguage) {
      case "en":
        return "Meet The Team";
      case "ch":
        return "团队见面";
      case "sp":
        return "Conoce al Equipo";
      case "fr":
        return "Rencontrez l'Équipe";
      case "ar":
        return "تعرف على الفريق";
      default:
        return "Meet The Team";
    }
  }

  return (
    <>
      <NavBar />
      <div className="about-us-container">
        <div className="currentlanguage">{displayMeetTheTeam()}</div>

        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img
              src={
                member.name === "Jason"
                  ? Jason
                  : member.name === "Claudia"
                  ? Claudia
                  : member.name === "Yuri"
                  ? Yuri
                  : Eltion
              }
              alt={`${member.name} - ${member.role}`}
            />
            <div className="member-details">
              <p>{`${member.name} - ${member.role}`}</p>
              <div className="social-links">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* <Globe /> */}
      </div>
    </>
  );
};

export default AboutUs;
