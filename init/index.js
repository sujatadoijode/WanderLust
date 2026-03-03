const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function geocodePlace(place) {
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json?key=${process.env.MAP_TOKEN}`
  );
  const data = await response.json();
  return data.features[0].geometry; // { type: "Point", coordinates: [lng, lat] }
}


//insert data
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = await Promise.all(
  initData.data.map(async (obj) => {
    const geometry = await geocodePlace(obj.location); // assuming each obj has an address field
    return {
      ...obj,
      owner: "699c6fe8e740eef98e6a97ba",
      geometry
    };
  })
);
    
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
