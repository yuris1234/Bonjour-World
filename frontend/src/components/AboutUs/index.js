import React from "react";
import Eltion from "../../static/images/img1.png";
import Yuri from "../../static/images/img2.png";
import Claudia from "../../static/images/img3.png";
import Jason from "../../static/images/img1.png";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="team-member">
        <img src={Eltion} alt="Team Lead - Eltion" />
        <div className="member-details">
          <p>Eltion - Team Lead</p>
        </div>
      </div>

      <div className="team-member">
        <img src={Yuri} alt="Backend Lead - Yuri" />
        <div className="member-details">
          <p>Yuri - Backend Lead</p>
        </div>
      </div>

      <div className="team-member">
        <img src={Claudia} alt="Frontend Lead - Claudia" />
        <div className="member-details">
          <p>Claudia - Frontend Lead</p>
        </div>
      </div>

      <div className="team-member">
        <img src={Jason} alt="Flex Lead - Jason" />
        <div className="member-details">
          <p>Jason - Flex Lead</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
