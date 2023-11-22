const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque pellentesque suscipit. Sed consectetur sapien in metus blandit consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate nisi quis urna pretium, sit amet bibendum ipsum auctor. Donec faucibus odio at nisl mollis posuere. Pellentesque non magna lacinia, ultricies enim id, pharetra dui. Quisque id leo id magna cursus congue. Mauris eu tellus purus. Phasellus nisi mauris, dignissim in augue non, posuere vulputate enim. Praesent cursus iaculis iaculis. Vestibulum finibus dui et felis varius, nec efficitur arcu hendrerit. Aliquam placerat tempor urna non vehicula. Nullam eget ipsum vel turpis cursus volutpat.',
            price 
        })
        await camp.save()
    }
}

seedDB().then( () => {
    mongoose.connection.close()
});