import React, { useEffect, useState } from "react";
import Eltion from "../../static/images/img1.png";
import Yuri from "../Images/TeamImgs/YuriPfp.png";
import Claudia from "../../static/images/img3.png";
import Jason from "../../static/images/img1.png";
import "./index.css";
import Globe from "../Globe/Globe";
import NavBar from "../NavBar";
import '@fortawesome/fontawesome-free/css/all.min.css';


const teamMembers = [
  {
    name: "Eltion Behrami",
    role: "Team Lead",
    github: "https://github.com/EltionBehrami",
    linkedin: "https://www.linkedin.com/in/eltion-behrami-5b9367271/",
    img: "",
  },
  {
    name: "Yuri Sugihara",
    role: "Backend Lead",
    github: "https://github.com/yuris1234",
    linkedin: "https://www.linkedin.com/in/yuri-sugihara/",
    img: "",
  },
  {
    name: "Claudia Aziz",
    role: "Frontend Lead",
    github: "https://github.com/claudiaaziz",
    linkedin: "https://www.linkedin.com/in/claudiaaziz/",
    img: "",
  },
  {
    name: "Jason Zhang",
    role: "Flex Lead",
    github: "https://github.com/Helionster",
    linkedin: "https://www.linkedin.com/in/jason-zhang-344777184/",
    img: "",
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
      {/* <NavBar /> */}
      <div className="about-us-container">
        <div className="display-meet-the-team">{displayMeetTheTeam()}</div>

        <div className="team-members-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img className="team-member-img"
                src={
                  member.name === "Jason Zhang"
                    ? Jason
                    : member.name === "Claudia Aziz"
                    ? Claudia
                    : member.name === "Yuri Sugihara"
                    ? Yuri
                    : Eltion
                }
                alt={`${member.name} - ${member.role}`}
              />
              <div className="member-details">
                <p>{`${member.name}`}</p>
                <p>{`${member.role}`}</p>
                <div className="social-links">
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;