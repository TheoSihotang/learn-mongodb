const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/movie")
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    actors: [String],
    synopsis: String,
    rating: Number,
});

// const movie = new Movie({
//     title: "Haikyuu",
//     year: 2024,
//     genre: "Anime",
//     actors: [
//         "Hinata",
//         "Kageyama",
//         "Tsukishima",
//         "Daichi",
//         "Nishinoya",
//         "Tanaka",
//         "Bokuto",
//         "Kenma",
//         "Kuroo",
//         "Oikawa",
//         "Ushijima",
//     ],
//     synopsis: `Determined to be like the volleyball championship's star player nicknamed "the small giant", Shoyo joins his school's volleyball club.`,
//     rating: 10,
// });

// custom method untuk mengubah value agar tidak panjang querynya dan untuk memisahkan antara logic dan query

movieSchema.methods.updateMovie = function () {
    this.rating = 8.5;
    this.year = 2024;
    return this.save();
};

// const Movie = mongoose.model("Movie", movieSchema);

const update = async (id) => {
    await Movie.findById(id)
        .then(async (result) => {
            console.log("Successfully found movie");
            const foundMovie = result;
            await foundMovie.updateMovie();
        })
        .catch((err) => {
            console.log(err);
        });
};

// update('667403a447d1765c99e79db8')

// static method untuk mengubah value agar tidak panjang querynya dan untuk memisahkan antara logic dan query
movieSchema.statics.updateOneMovie = function () {
    return this.findByIdAndUpdate("667403a447d1765c99e79db8", {
        year: 2019,
        rating: 9.5,
    });
};
const Movie = mongoose.model("Movie", movieSchema);

Movie.updateOneMovie()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

// find data
// Movie.findOne({actors : {$in : ['Eren', 'Mikasa']}})
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// insert satu data
// movie
//     .save()
//     .then(() => {
//         console.log("successfully saved");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// insert banyak data
// Movie.insertMany([
//         {
//             title: "Haikyuu",
//             year: 2024,
//             genre: "Anime",
//             actors: [
//                 "Hinata",
//                 "Kageyama",
//                 "Tsukishima",
//                 "Daichi",
//                 "Nishinoya",
//                 "Tanaka",
//                 "Bokuto",
//                 "Kenma",
//                 "Kuroo",
//                 "Oikawa",
//                 "Ushijima",
//             ],
//             synopsis: `Determined to be like the volleyball championship's star player nicknamed "the small giant", Shoyo joins his school's volleyball club.`,
//             rating: 10,
//         },
//         {
//             title: "Attack on Titan",
//             year: 2013,
//             genre: "Anime",
//             actors: [
//                 "Eren",
//                 "Mikasa",
//                 "Armin",
//                 "Levi",
//                 "Erwin",
//                 "Historia",
//                 "Jean",
//                 "Sasha",
//                 "Connie",
//                 "Reiner",
//                 "Annie",
//             ],
//             synopsis: `In a world where humanity resides within enormous walled cities, a young boy named Eren Jaeger becomes determined to rid the world of the giant humanoid Titans that threaten humanity's very existence.`,
//             rating: 9.5,
//         },
//         {
//             title: "My Hero Academia",
//             year: 2016,
//             genre: "Anime",
//             actors: [
//                 "Deku",
//                 "Bakugo",
//                 "All Might",
//                 "Todoroki",
//                 "Iida",
//                 "Uraraka",
//                 "Kirishima",
//                 "Tsuyu",
//                 "Endeavor",
//                 "Aizawa",
//                 "Shigaraki",
//             ],
//             synopsis: `In a world where people with superpowers (known as "Quirks") are the norm, a boy without any powers dreams of becoming the greatest hero.`,
//             rating: 9.8,
//         },
// ]).then((result) => {
//     console.log(result)
//     console.log("Successfully create bulk")
// }).catch((err) => {
//     console.log(err)
// })
