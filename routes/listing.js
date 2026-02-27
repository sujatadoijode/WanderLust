const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//for create route and new route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post( 
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingController.createListing)
);

// .post(upload.single('listing[image]'), (req, res) => {
//     res.send(req.file);
// })

//New Route
router.get("/new", 
    isLoggedIn, 
    listingController.renderNewForm
);

//for show delete and update
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn, 
    isOwner, 
    validateListing, 
    wrapAsync(listingController.updateListing)
)
.delete( 
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.destroyListing)
)

//Edit Route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

// //index route
// router.get("/", 
//     wrapAsync(listingController.index)
// );

//show route
// router.get("/:id", 
//     wrapAsync(listingController.showListing)
// );

// //create route
// router.post("/", 
//     isLoggedIn, 
//     validateListing, 
//     wrapAsync(listingController.createListing)
// );

//Update Route
// router.put("/:id", 
//     isLoggedIn, 
//     isOwner, 
//     validateListing, 
//     wrapAsync(listingController.updateListing)
// );

//Delete route
// router.delete("/:id", 
//     isLoggedIn, 
//     isOwner, 
//     wrapAsync(listingController.destroyListing)
// );

module.exports = router;