import React from 'react'
import "./index.css";

const UserGuideSection = () => {
  return (
    <div className="user-guide-section">
      MERN-Group Project Proposal: Bonjour World Language Exchange Platform
      Background and Overview In a world increasingly interconnected, language
      learning is a gateway to cultural understanding. Our project, "Bonjour
      World," is a web platform designed to facilitate language exchange events
      for both language learners and polyglots. The platform empowers users to
      host and subscribe to language exchange events. Functionality and MVP
      Minimum Viable Product (MVP) User Authentication: Secure user registration
      and login system. Authentication mechanisms to protect user data and
      ensure secure access. Event Management (CRUD): Creation, Read, Update, and
      Delete (CRUD) functionality for hosting and managing language exchange
      events. Intuitive event creation forms for hosts. User Profile: User
      profiles with customizable information and preferences. Ability for users
      to track their language learning progress and event history. Google Maps
      Integration: Utilization of the Google Maps API to display language
      exchange events geographically. Interactive maps for users to explore and
      discover language exchange opportunities. Bonus Features Real-time
      Messaging (Websockets): Implementation of Websockets for real-time
      messaging between users. Users can choose language partners and engage in
      language-specific conversations. Technologies The Bonjour World platform
      will be developed using the MERN (MongoDB, Express.js, React.js, Node.js)
      tech stack. The following technologies will be incorporated: MongoDB: A
      NoSQL database for storing user data, event information, and other
      relevant data. Express.js: A web application framework for Node.js, used
      for building robust and scalable server-side applications. React.js: A
      JavaScript library for building user interfaces, enabling dynamic and
      interactive frontend experiences. Node.js: A JavaScript runtime
      environment that allows server-side execution of JavaScript code, powering
      the backend of the application. Google Maps API: For geospatial
      representation of language exchange events. Websockets: To enable
      real-time messaging features. Group Members and Work Breakdown Our team is
      composed of the following members, each contributing their expertise to
      ensure the success of the project: Team Lead (Eltion): Backend Engineer
      (Yuri): Frontend Engineer (Claudia): Flex Engineer (Jason): Schedule
      Monday: Yuri: Implement backend CRUD routes for creating an event. Jason
      and Eltion: Work on frontend CRUD tasks (reducers, action creators, thunk,
      forms, etc). Eltion will assist. Claudia: Implement CSS for authentication
      sign-in, splash page. Eltion: Set up Google Maps API. Tuesday: Eltion:
      Incorporate Google Maps API into CRUD functionalities. Claudia: Implement
      CSS for forms, events index page, and show pages. Yuri: Work on backend
      functionality for updating and deleting user. Jason: Work on frontend
      functionality for updating and deleting user. Wednesday: Complete UI
      design for all show pages, edit forms, and index pages. Start implementing
      Websockets. Users can only see event details when attendance has been
      confirmed. Thursday and Friday: Style direct message (DM) pages.
    </div>
  );
}

export default UserGuideSection;