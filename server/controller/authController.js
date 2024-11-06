const passport = require("passport");
const UserSm = require("../model/userSmModel");
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
        // Utiliza findOneOrCreate para encontrar o crear el usuario
        const user = await UserSm.findOneOrCreate({
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
        });
        return done(null, user);
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
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Utiliza findOneOrCreate para encontrar o crear el usuario
        const user = await UserSm.findOneOrCreate({
          discordId: profile.id,
          email: profile.email,
          displayName: profile.username,
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
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
        // Utiliza findOneOrCreate para encontrar o crear el usuario
        const user = await UserSm.findOneOrCreate({
          facebookId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serializar el usuario
passport.serializeUser((user, done) => {
  done(null, { id: user.id, displayName: user.displayName });
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserSm.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

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

  try {
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

    const [month, day, year] = birthday.split("/");
    const formattedBirthday = new Date(`${year}-${month}-${day}`);

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

/**
 * Logs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is logged in.
 */
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

  const checkIfUserExists = async (req, res, next) => {
    const { email, username, phone } = req.body;

    try {
      const user = await User.findOne({
        $or: [{ email: email }, { username: username }, { phone: phone }],
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
};

module.exports = {
  createAccount,
  logIn,
  checkIfUserExists,
  loginWithGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  loginWithDiscord: passport.authenticate("discord"),
  loginWithFacebook: passport.authenticate("facebook"),
};
