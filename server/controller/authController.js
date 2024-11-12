const passport = require("passport");
const User = require("../model/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const JwtService = require("../middleware/jwtService");

// Configuración de Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Busca si el usuario ya existe con googleId
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Si no existe, crea un nuevo usuario
        const newUser = new User({
          username: profile.displayName || "",
          email: profile.emails[0].value,
          password: "", // No se necesita contraseña para los usuarios de Google
          profilePicture: profile.photos ? profile.photos[0].value : "",
          phone: "",
          gender: "na", // Definir si se usa o no
          birthday: null, // Definir si se usa o no
          tipo: "comprador", // Tipo de usuario, por ejemplo
          googleId: profile.id,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


// Configuración de Discord Strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);
        // console.log(done);
        let existingUser = await User.findOne({ discordId: profile.id });
        // console.log(existingUser)

        if (existingUser) {
          return done(null, existingUser);
        }

        const existingUserName = await User.findOne({ userName: profile.username });
        if (existingUserName) {
          return done(null, existingUserName);
        }

        const newUser = new User({
          username: profile.username || "",
          email: profile.email,
          password: "",
          profilePicture: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : "",
          phone: "",
          gender: "na",
          birthday: null,
          tipo: "comprador",
          discordId: profile.id || "",
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }));


// Configuración de Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Busca si el usuario ya existe con facebookId
        let existingUser = await User.findOne({ facebookId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Si no existe, crea un nuevo usuario
        const newUser = new User({
          username: profile.displayName || "",
          email: profile.emails[0].value,
          password: "", // No se necesita contraseña para los usuarios de Facebook
          profilePicture: profile.photos ? profile.photos[0].value : "",
          phone: "",
          gender: "na", // Definir si se usa o no
          birthday: null, // Definir si se usa o no
          tipo: "comprador", // Tipo de usuario
          facebookId: profile.id,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


// Serializar el usuario
passport.serializeUser ((user, done) => {
  done(null, user.id);
});

passport.deserializeUser (async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (error) {
      done(error, null);
  }
});

// Controlador para login con OAuth (Google)
const loginWithGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Controlador para login con OAuth (Discord)
const loginWithDiscord = passport.authenticate("discord");

// Controlador para login con OAuth (Facebook)
const loginWithFacebook = passport.authenticate("facebook");

// Función de creación de cuenta con datos del usuario
const createAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: "Validation errors",
      data: errors.array(),
    });
  }

  const { username, password, email, phone, gender, birthday } = req.body;

  try {
    // Validación de unicidad para email, username y teléfono (solo si están presentes)
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({
          status: 400,
          message: "Username already in use",
        });
      }
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          status: 400,
          message: "Email already in use",
        });
      }
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res.status(400).json({
          status: 400,
          message: "Phone number already in use",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Formateamos la fecha de nacimiento
    const [month, day, year] = birthday.split("/");
    const formattedBirthday = new Date(`${year}-${month}-${day}`);

    // Creamos el nuevo usuario
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
      gender,
      birthday: formattedBirthday,
    });

    res.status(201).json({
      status: 201,
      message: "User account created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating user account",
      error: error.message,
    });
  }
};

// Función de login local (por email o username)
const logIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: "Validation errors",
      data: errors.array(),
    });
  }

  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier },
        { phone: identifier },
      ],
    });
    // console.log("Usuario encontrado:", user);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Invalid identifier or password, please check and try again",
      });
    }

    const token = JwtService.generateToken({ _id: user._id });
    req.session.authToken = token;

    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

// Función para comprobar si el usuario existe (por email, username o teléfono)
const checkIfUserExists = async (req, res) => {
  const { email, username, phone } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (user) {
      return res.status(400).json({
        status: 400,
        message: "Username, phone, or email already exists",
      });
    }

    res.status(200).json({
      status: 200,
      message: "User does not exist",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error checking user existence",
      error: error.message,
    });
  }
};

module.exports = {
  createAccount,
  logIn,
  checkIfUserExists,
  loginWithGoogle,
  loginWithDiscord,
  loginWithFacebook,
};
