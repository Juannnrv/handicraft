const express = require("express");
const passport = require("passport");
const userValidator = require("../validator/userValidator");
const {limit} = require("../middleware/limit");
const {versioning} = require("../middleware/versioning");
const { loginWithGoogle, loginWithDiscord, loginWithFacebook, createAccount, logIn, checkIfUserExists } = require("../controller/authController");

const router = express.Router();

// Rutas para autenticación
router.get("/google", loginWithGoogle);
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  // res.redirect("http://localhost:3000/home");
  console.log("logeado con exito");
  
});

router.get("/discord", loginWithDiscord);
router.get("/discord/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
  // res.redirect("http://localhost:3000/home");
  console.log("logeado con exito");
  
});

router.get("/facebook", loginWithFacebook);
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => {
  // res.redirect("http://localhost:3000/home");
  console.log("logeado con exito");
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ displayName: req.user.displayName });
  }
  return res.status(401).json({ message: "No estás autenticado" });
});

router.post('/create', limit('post'), versioning('1.0.0'), userValidator.createAccount, createAccount);
router.post('/login', versioning('1.0.0'), userValidator.logIn, logIn);
router.post('/check', versioning('1.0.0'), checkIfUserExists);

module.exports = router;
