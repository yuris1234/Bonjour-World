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
    firstName: "Demo",
    lastName: "Lition"
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  users.push(
    new User ({
      username: faker.internet.userName({firstName, lastName}),
      email: faker.internet.email({firstName, lastName}),
      hashedPassword: bcrypt.hashSync("password", 10),
      firstName: firstName,
      lastName: lastName
    })
  )
}
  
// Create events
const events = [];
const newEvents = [];


events.push(
  new Event ({
    title: faker.company.name(),
    description: "Lingo rendezvous: where words collide and cultures converge. Transform your language journey with us!",
    languages: ['English','Spanish'],
    state: 'New York',
    city: 'New York',
    address: '620 West 153rd Street',
    zipcode: 10031,
    date: faker.date.future(),
    time: "00:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: faker.company.name(),
    description: "Diverse tongues unite! Join our language exchange soirée for global connections and fluent friendships.",
    languages: ['French','German'],
    state: 'New York',
    city: 'New York',
    address: '120 Riverside Dr',
    zipcode: 10024,
    date: faker.date.future(),
    time: "00:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: faker.company.name(),
    description: "Polyglot paradise awaits! Swap languages, share stories, and break linguistic barriers with us.",
    languages: ['Spanish','French'],
    state: 'New York',
    city: 'New York',
    address: '255 West 84th Street',
    zipcode: 10024,
    date: faker.date.future(),
    time: "00:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: faker.company.name(),
    description: "Speak the world: our meetup bridges cultures. Connect, converse, and cultivate language skills together!",
    languages: ['French','German'],
    state: 'New York',
    city: 'Brooklyn',
    address: '238 Bedford Ave',
    zipcode: 11249,
    date: faker.date.future(),
    time: "00:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

events.push(
  new Event ({
    title: faker.company.name(),
    description: "Tongue-twisting Tuesday! Elevate your language game at our vibrant exchange—learn, laugh, and linguify.",
    languages: ['Spanish','French'],
    state: 'New York',
    city: 'New York',
    address: '570 2nd Ave',
    zipcode: 10016,
    date: faker.date.future(),
    time: "00:00",
    attendees: [],
    host: "65663fdc660cf7f22d333445"
  })
)

// for (let i = 0; i < NUM_SEED_EVENTS; i++) {
  // events.push(
  //   new Event ({
  //     title: faker.company.name(),
  //     description: faker.lorem.sentences(),
  //     language: ['English','Spanish','French','German'][Math.floor(Math.random() * 4)],
  //     state: faker.location.state(),
  //     city: faker.location.city(),
  //     address: faker.location.streetAddress(),
  //     zipcode: parseInt(faker.location.zipCode()),
  //     date: faker.date.future(),
  //     time: "00:00",
  //     attendees: [],
  //     host: "65663fdc660cf7f22d333445"
//     })
//   )
// }


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