const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;

// function formatDate(date) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) 
//         month = '0' + month;
//     if (day.length < 2) 
//         day = '0' + day;

//     return [year, month, day].join('-');
// }

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo@demo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Tim",
    lastName: "McGraw",
    languages: ["English"],
    bio: "Hi everyone! My name is Tim and I love speaking English!",
    age: 20,
    pfp: faker.image.url()
  })
)

users.push(
  new User ({
    username: 'JadeHarmony',
    email: 'StellarScribe@example.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Jade",
    lastName: "Harmony",
    languages: ["English, Mandarin"],
    pfp: faker.image.url(),
    bio: "Hi there! I'm Jade, and I have a deep love for languages. Learning new languages opens up new worlds, and I'm on a journey to become fluent in as many as I can!",
  })
)

users.push(
  new User ({
    username: 'EthanPinnacle',
    email: 'LunarLuminary@mail.net',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Ethan",
    lastName: "Pinnacle",
    languages: ["English, Portugese, Spanish"],
    pfp: faker.image.url(),
    bio: "Greetings! I'm Ethan, an avid language learner. I believe that each language is a unique window into a culture, and I'm excited to explore and connect with people from around the world.",
  })
)

users.push(
  new User ({
    username: 'OliverNebula',
    email: 'NebulaNomad@protonmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Oliver",
    lastName: "Nebula",
    languages: ["English", "Japanese", "Russian"],
    pfp: faker.image.url(),
    bio: "Saluton! I'm Oliver, and I'm passionate about linguistic diversity. Learning languages is my way of breaking down barriers and fostering connections with people from diverse backgrounds.",
  })
)

users.push(
  new User ({
    username: 'StellaCascade',
    email: 'QuantumQuill@email.org',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Stella",
    lastName: "Cascade",
    languages: ["English"],
    pfp: faker.image.url(),
    bio: "Hey, language enthusiasts! I'm Stella, and I'm here to share my language learning adventures. Learning languages is not just a hobby for me; it's a way of understanding the richness of human communication.",
  })
)

users.push(
  new User ({
    username: 'LilyZenith',
    email: 'CelestialCipher@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Lily",
    lastName: "Zenith",
    languages: ["English", "Swahili", "Arabic"],
    pfp: faker.image.url(),
    bio: "Hola amigos! I'm Lily, and I'm on a language-learning quest. I find joy in discovering the intricacies of different languages and the stories they tell. Let's share our language journeys!",
  })
)

users.push(
  new User ({
    username: 'LeoEclipse',
    email: 'MysticMango@yahoo.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Leo",
    lastName: "Eclipse",
    languages: ["English", "Hindi"],
    pfp: faker.image.url(),
    bio: "Namaste! I'm Leo, and I believe that language is the key to understanding and appreciating diverse cultures. Join me on this exciting journey of exploration and language acquisition.",
  })
)

users.push(
  new User ({
    username: 'AvaSculptor',
    email: 'EchoEnigma@outlook.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Ava",
    lastName: "Sculptor",
    languages: ["English", "German", "French"],
    pfp: faker.image.url(),
    bio: "Privet! I'm Ava, and my curiosity for languages knows no bounds. Learning new languages is like unlocking a treasure trove of knowledge and connections. Excited to learn and share experiences with you!",
  })
)

users.push(
  new User ({
    username: 'CarterVortex',
    email: 'PenumbralPulse@outlook.net',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Carter",
    lastName: "Vortex",
    languages: ["English", "Korean"],
    pfp: faker.image.url(),
    bio: "Ciao! I'm Carter, a language enthusiast with a zest for cultural exchange. Learning languages is my way of embracing the world's diversity. Let's embark on this multilingual adventure together!",
  })
)

users.push(
  new User ({
    username: 'LucasCelestial',
    email: 'ChronoCharm@rocketmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Lucas",
    lastName: "Spencer",
    languages: ["English", "German"],
    pfp: faker.image.url(),
    bio: "Privet! I'm Lucas, and my curiosity for languages knows no bounds. Learning new languages is like unlocking a treasure trove of knowledge and connections. Excited to learn and share experiences with you!",
  })
)
  
// Create events
const events = [];
const newEvents = [];

events.push(
  new Event ({
    title: "¡Hola Fiesta!",
    description: "Join us for an enchanting evening of language and laughter at ¡Hola Fiesta! - where the joy of Spanish communication comes alive! Immerse yourself in a vibrant atmosphere filled with friendly conversations, cultural connections, and a sprinkle of language games. Whether you're a fluent speaker or just starting your Spanish journey, this fiesta is the perfect opportunity to practice your skills in a relaxed and festive setting. Expect lively chatter, delicious bites, and an all-around good time as we celebrate the beauty of the Spanish language together. ¡Vamos a divertirnos! (Let's have fun!)",
    languages: ['English','Spanish'],
    address: '620 West 153rd Street',
    date: faker.date.future(),
    time: "20:00",
    endTime: "22:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: "你好聚会 (Nǐ Hǎo Jùhuì)",
    description: "Experience the magic of Mandarin at 你好聚会! Join us for an evening filled with lively conversations, cultural connections, and the joy of learning Chinese. Whether you're a seasoned speaker or just getting started, this event provides a welcoming space to practice your language skills in a friendly and festive environment. Anticipate engaging discussions, delightful snacks, and the opportunity to make new friends who share your passion for the Chinese language. 一起来吧! (Come join us!)",
    languages: ['English', 'Chinese'],
    address: '120 Riverside Dr',
    date: faker.date.future(),
    time: "05:00",
    endTime: "07:30", 
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: "Learn Japanese with Natives",
    description: "Immerse yourself in the beauty of the Japanese language, where native speakers will guide you through conversational exercises, cultural nuances, and share firsthand insights to enhance your language learning journey. Join us for an interactive and engaging experience that brings the language to life with authenticity and warmth!",
    languages: ['English','Japanese'],
    address: '255 West 84th Street',
    date: faker.date.future(),
    time: "17:30",
    endTime: "19:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: "Hallo World",
    description: "Dive into the world of German at this lively event designed for language enthusiasts of all levels. Join us for an evening filled with friendly conversations, cultural insights, and perhaps a few German-inspired surprises. Whether you're fluent or just getting started, this meetup offers a supportive environment to practice and enhance your German skills.", 
    languages: ['English','German'],
    address: '238 Bedford Ave',
    date: faker.date.future(),
    time: "20:00",
    endTime: "21:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: "Calling All Polyglots!",
    description: "Open to all French and/or Spanish speakers! Come practice any of these three languages and experience a culture-filled night.",
    languages: ['English','French', 'Spanish'],
    address: '570 2nd Ave',
    date: faker.date.future(),
    time: "19:00",
    endTime: "20:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and events...");
  
    User.collection.drop()
      .then(() => User.insertMany(users))
      .then(() => Event.collection.drop())
      .then(async () => {let user = await User.findOne({email: "demo@demo.com"});
        events.forEach((event) => {
          event.host = user._id;
          event.attendees.push(user._id)
          newEvents.push(event);
      })})
      .then(() => Event.insertMany(newEvents))
      .then(async () => {let allEvents = await Event.find({});
        let user = await User.findOne({username: "demo-user"})
        for (const event of allEvents) {
          user.events.push(event._id)
          user.hostedEvents.push(event._id)
        }
        await user.save();
      })
      .then(() => {
        console.log("Done!");
        mongoose.disconnect();
      })
      .catch(err => {
        console.error(err.stack);
        process.exit(1);
      });
}