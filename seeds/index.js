const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const Review = require("../models/review");
const { places, descriptors } = require("./seedHelper");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("CONNECTED TO MONGO");
  })
  .catch(() => {
    console.log("MONGO ERROR");
  });
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const priceRandom = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64c74f59b2af86756a178ae2",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://source.unsplash.com/collection/483251",
          filename: "yelpcamp/go",
        },
        {
          url: "https://res.cloudinary.com/dw0crl86r/image/upload/v1690955619/YelpCamp/uvvzcyqyjlbwissigryt.jpg",
          filename: "yelpcamp/go",
        },
        {
          url: "https://source.unsplash.com/collection/483251",
          filename: "yelpcamp/go",
        },
      ],
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime eum alias voluptas atque fugiat cumque, odio officiis voluptates corrupti est assumenda, perspiciatis rerum tempore odit fuga voluptatem dignissimos explicabo repellendus.",
      price: priceRandom,
    });
    await camp.save();
    const data = await Campground.find({});
    console.log(data);
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
