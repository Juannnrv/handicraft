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
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("llega aca");
      try {
        // Busca si el usuario ya existe con googleId
        console.log("llega aca2");
        const userPhone = `+00 ${Math.floor(1000000000 + Math.random() * 9000000000)}`;

        let existingUser = await User.findOne({ googleId: profile.id });
        console.log(existingUser);

        if (existingUser) {
          // Genera el JWT y lo guarda en la sesión
          const token = JwtService.generateToken({ _id: existingUser._id });
          done(null, existingUser);
        } else {
          // Si no existe, crea un nuevo usuario
          const newUser = new User({
            username: profile.displayName || "",
            email: profile.emails[0].value,
            password: "", // No se necesita contraseña para los usuarios de Google
            profilePicture: profile.photos ? profile.photos[0].value : "",
            gender: "na", // Definir si se usa o no
            birthday: null, // Definir si se usa o no
            tipo: "comprador", // Tipo de usuario, por ejemplo
            googleId: profile.id,
            phone: userPhone
          });

          // Verifica si hay algún error antes de guardar
          await newUser.save().catch((error) => {
            console.error("Error saving new user:", error);
            done(error, null);
          });

          // Genera el JWT y lo guarda en la sesión
          const token = JwtService.generateToken({ _id: newUser._id });
          done(null, newUser); // Retorna el nuevo usuario
        }
      } catch (error) {
        console.error("Error during Discord authentication:", error);
        done(error, null);
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
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Busca si el usuario ya existe con discordId
        let existingUser = await User.findOne({ discordId: profile.id });
        const userPhone = `+00 ${Math.floor(1000000000 + Math.random() * 9000000000)}`;

        if (existingUser) {
          // Genera el JWT y lo guarda en la sesión
          const token = JwtService.generateToken({ _id: existingUser._id });
          done(null, existingUser);
        } else {
          // Si no existe, crea un nuevo usuario
          const newUser = new User({
            username: profile.username || "",
            email: profile.email,
            phone: userPhone,
            profilePicture: profile.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
              : "",
            discordId: profile.id,
            tipo: "comprador",
            gender: "na"
          });

          // Verifica si hay algún error antes de guardar
          await newUser.save().catch((error) => {
            console.error("Error saving new user:", error);
            done(error, null);
          });

          // Genera el JWT y lo guarda en la sesión
          const token = JwtService.generateToken({ _id: newUser._id });
          done(null, newUser); // Retorna el nuevo usuario
        }
      } catch (error) {
        console.error("Error during Discord authentication:", error);
        done(error, null);
      }
    }
  )
);

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
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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

/**
 * Creates a user account.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user account is created.
 */
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

  if (!email && !phone) {
    return res.status(400).json({
      status: 400,
      message: "Either email or phone must be provided",
    });
  }

  try {

    const userEmail = email || `${username}@example.com`;

    const userPhone = phone || `+00 ${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [month, day, year] = birthday.split("/");
    const formattedBirthday = new Date(`${year}-${month}-${day}`);

    const user = await User.create({
      username,
      password: hashedPassword,
      email: userEmail,
      phone: userPhone,
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
