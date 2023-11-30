import React, { useState, useEffect } from "react";
import "./index.css";
import NavBar from "../NavBar/index.js";
// import Globe from "../Globe/Globe.js";
import image1 from "../../static/images/img1.png";
import image2 from "../../static/images/img2.png";
import image3 from "../../static/images/img3.png";

const SplashPage = () => {
  const changingLanguages = ["en", "ch", "sp", "fr", "ar"];
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const reviews = [
    {
      text: "Bonjour World is a game-changer! Seamless platform, diverse events, and genuine connections. My language learning soared, and I made friends worldwide. 5/5 stars! 🌐 #LanguageRevolution - Tabitha",
    },
    {
      text: "Incredible language exchange experience! Bonjour World has made learning languages feel like an exciting adventure. Highly recommend to all language enthusiasts! 🌍 #PolyglotParadise - Alex",
    },
    {
      text: "Unleash the polyglot in you with Bonjour World! This platform has revolutionized the way I learn languages. The diversity of events and the opportunity to connect with language enthusiasts from around the globe make it an invaluable tool for language learners. 10/10! 🌏 #PolyglotPioneer - Jake",
    },
    {
      text: "Bonjour World opened up a whole new world of linguistic possibilities for me! The platform's user-friendly interface and engaging events have turned my language learning journey into a global expedition. A must-try for anyone passionate about breaking language barriers! 🚀 #GlobalLingoExplorer - Emily",
    },
    {
      text: "Language learning meets innovation with Bonjour World! The platform's commitment to fostering global connections through language exchange is truly commendable. My language skills have flourished, and I've found a community of like-minded individuals. A game-changer in the world of language learning! 🌐 #InnovativePolyglot - Liam",
    },
    {
      text: "Bonjour World is like a passport to linguistic adventures! The platform's events are not just about learning languages but immersing yourself in diverse cultures. The connections I've made and the languages I've learned have enriched my life. Join the revolution! 🗺️ #LingoVoyager - Isabella",
    },
    {
      text: "I never knew language learning could be this fun and enriching until I discovered Bonjour World! The platform's events are a perfect blend of education and entertainment. My language skills have skyrocketed, and I've gained friends from every corner of the world. Bravo, Bonjour World! 👏 #LanguageLiberator - Allon",
    },
    {
      text: "Bonjour World is the key to unlocking a multilingual paradise! The platform's events are well-organized, diverse, and filled with passionate language learners. My journey with Bonjour World has been nothing short of amazing. If you're serious about languages, don't miss out! 🌐 #PolyglotUtopia - Emma",
    },
    {
      text: "Elevate your language learning experience with Bonjour World! The platform's innovative approach to language exchange events has redefined the way I learn and connect with others. Seamless, enjoyable, and effective – it's a game-changer for language enthusiasts. Sign up now and embark on a linguistic journey like never before! 🌍 #LingoElevation - Nathan",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex(
        (prevIndex) => (prevIndex + 1) % changingLanguages.length
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  function displayCurrentLanguage() {
    const currentLanguage = changingLanguages[currentLanguageIndex];
    switch (currentLanguage) {
      case "en":
        return "Hello World";
      case "ch":
        return "你好";
      case "sp":
        return "Hola Mundo";
      case "fr":
        return "Bonjour le monde";
      case "ar":
        return "مرحباً بالعالم";
      default:
        return "Hello World";
    }
  }

  function getRandomReview() {
    const randomIndex = Math.floor(Math.random() * reviews.length);
    return reviews[randomIndex];
  }

  return (
    <>
      <NavBar />
      <div className="splash-page">
        <div className="content-container">
          <div className="currentlanguage">{displayCurrentLanguage()}</div>

          <div className="image-div">
            <img src={image1} className="image" alt="" style={{ animationDelay: '0.5s' }} />
            <img src={image2} className="image" alt="" style={{ animationDelay: '1s' }} />
            <img src={image3} className="image" alt="" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="review">🌍 "{getRandomReview().text}"</div>
        </div>
      </div>
      <footer className="footer">Copyright &copy; 2023 Bonjour World</footer>
    </>
  );
};

export default SplashPage;
