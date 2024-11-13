const fs = require("fs");
const User = require("../model/userModel");

class ProfileImg {
  static async updateUser(userId, updateData, profilePicturePath) {
    if (profilePicturePath) {
      const profilePicture = {
        data: fs.readFileSync(profilePicturePath),
        contentType: "image/png",
        url: null,
      };
      updateData.profilePicture = profilePicture;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return user;
  }
}

module.exports = ProfileImg;
