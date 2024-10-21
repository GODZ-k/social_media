import User from "../models/user.model.js";
import { verificationMail } from "../utils/mails/verification.mail.js";
import {
  forgotPasswordType,
  resetpasswordType,
  signInSchema,
  signUpSchema,
} from "../utils/Types/user.type.js";
import cron from "node-cron";
import {
  generateAccessAndRefreshToken,
  generateVerificationToken,
  options,
} from "../utils/utils.js";
import { forgotPasswordMail } from "../utils/mails/forgotpasswordmail.js";
import { Cache } from "../utils/client.js";
const cache = new Cache()

// register  -----
const registerUser = async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData) {
      return res.status(400).json({
        msg: "All fields must be required",
      });
    }

    const payload = signUpSchema.safeParse(inputData);

    if (!payload.success) {
      return res.status(400).json({
        msg: "Please enter valid input",
      });
    }

    const { username, email, password, confirmPassword, firstName, lastName , gender } = payload.data;

    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: "Confirm password does not match"
      })
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const userData = {
      username: payload.data.username,
      email: payload.data.email,
    };

    const verificationToken = await generateVerificationToken(userData);

    // console.log("verification token ------------------------------- ",verificationToken)

    const verificationLink = `${process.env.DOMAIN}/auth/user/verify?token=${verificationToken}`;

    // const { data, error } = await verificationMail(email, verificationLink);

    const error = false
    if (error) {
      return res.status(500).json({
        msg: "failed to send verification mail please try again later",
      });
    }

    const data = true
    if (data) {
      await User.create({
        email,
        firstName,
        lastName,
        username,
        password,
        verificationToken,
        gender
      });
      return res.status(200).json({
        msg: "Please verify your account first",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// verify account ------
const verifyAccount = async (req, res) => {
  try {
    const { user, token } = req.user;

    // console.log(user)

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const verifiedUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (!verifiedUser) {
      return res.status(404).json({
        msg: "Invalid token",
      });
    }

    if (verifiedUser.isVerified || !verifiedUser.verificationToken) {
      return res.status(400).json({
        msg: "Token expired",
      });
    }

    await verifiedUser.updateOne({
      $unset: {
        verificationToken: 1,
      },
      $set: {
        isVerified: true,
      },
    });

    return res.status(200).json({
      msg: "Account verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// login -------
const loginUser = async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData) {
      return res.status(400).json({
        msg: "All fields must be required",
      });
    }

    const payload = signInSchema.safeParse(inputData);

    if (!payload.success) {
      return res.status(400).json({
        msg: "please enter valid input",
      });
    }

    const { email, password } = payload.data;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(422).json({
        msg: "User not exists",
      });
    }

    if (existUser && !existUser.isVerified) {
      return res.status(422).json({
        msg: "Please verify your account first",
      });
    }

    const checkIsPasswordCorrect = await existUser.isPasswordCorrect(password);

    if (!checkIsPasswordCorrect) {
      return res.status(422).json({
        msg: "Please enter valid password",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existUser._id
    );

    const user = await User.findById(existUser._id).select('-password -refreshToken -verificationToken')

    if (!user) {
      return res.status(422).json({
        msg: "User not found"
      })
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        msg: "User loggedin successfully",
        user

      });

  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// get current user ------
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    // const cachedUser = await cache.hGet(`currentUser:${user._id}`,user._id)

    // if(cachedUser){
    //   return res.status(200).json({
    //     profile:cachedUser,
    //     msg: "User fetched successfully",
    //   });
    // }

    const profile = await User.findById(user._id).populate({
      path:'posts'
    }).select(
      "-password -refreshToken"
    );

    if (!profile || !profile.isVerified) {
      return res.status(422).json({
        msg: "Unauthorized access"
      })
    }

    // await cache.hSet(`currentUser:${user._id}`,user._id,profile)

    return res.status(200).json({
      profile,
      msg: "User fetched successfully",
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// logout ---------
const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    const loggedInUser = await User.findById(user._id);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    await loggedInUser.updateOne({
      $unset: {
        refreshToken: 1,
      },
    });

    // await cache.del(`currentUser:${loggedInUser._id}`)

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        msg: "User logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// delete account -----
const deleteAccount = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    await User.findByIdAndDelete(user._id);
    // await cache.del(`currentUser:${user._id}`)
    // await cache.del('suggestion')


    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        msg: "Account removed successfully",
      });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// delete profile image -----
const deleteProfileImage = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    const loggedInUser = await User.findById(user._id);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    loggedInUser.avatar = "";
    await loggedInUser.save({ validateBeforeSave: false });
    // await cache.del(`currentUser:${loggedInUser._id}`)
    // await cache.del(`user:${loggedInUser.username}`)
    // await cache.del(`user:${loggedInUser.name}`)

    return res.status(200).json({
      msg: "Profile image removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "imternal server error",
    });
  }
};

// forgot password -----
const forgotPassword = async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData) {
      return res.status(400).json({
        msg: "Email field must be require",
      });
    }

    const payload = forgotPasswordType.safeParse(inputData);

    if (!payload.success) {
      return res.status(400).json({
        msg: "Please enter valid input",
      });
    }

    const { email } = payload.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        msg: "please verify your account first",
      });
    }

    const userData = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    const verificationToken = await generateVerificationToken(userData);

    const verificationLink = `${process.env.FRONTEND_DOMAIN}/auth/user/reset-password/${verificationToken}`;

    await user.updateOne(
      {
        $set: {
          verificationToken,
        },
      },
      { new: true }
    );

    const { data, error } = await forgotPasswordMail(
      user.email,
      verificationLink
    );

    if (error) {
      return res.status(500).json({
        msg: "Failed to send mail please try again later",
      });
    }

    if (data) {
      return res.status(200).json({
        msg: "Password reset mail sent successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// reset password --------
const resetPassword = async (req, res) => {
  try {
    const user = req.user;
    const inputData = req.body;

    if (!inputData) {
      return res.status(400).json({
        msg: "All fields must be require",
      });
    }

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    const payload = resetpasswordType.safeParse(inputData);

    if (!payload.success) {
      return res.status(400).json({
        msg: "please enter valid input",
      });
    }

    const { newPassword, confirmPassword } = payload.data;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        msg: "Confirm password does not match",
      });
    }

    const currentUser = await User.findById(user._id);

    if (!currentUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    currentUser.password = newPassword;
    currentUser.verificationToken = null;

    await currentUser.save({ validateBeforeSave: false });

    return res.status(200).json({
      msg: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// follow and unfollow user -------
const followUser = async (req, res) => {
  try {
    const user = req.user;
    const userId = req.params.userId;

    console.log(userId , typeof userId)

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    if (!userId) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    if (user._id.toString() === userId) {
      return res.status(400).json({
        msg: "You cannot follow yourself",
      });
    }

    const [loggedInUser, followedUser] = await Promise.all([
      User.findById(user._id),
      User.findById(userId),
    ]);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    if (!followedUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const isFollowing = loggedInUser.following.includes(userId);

    if (isFollowing) {
      loggedInUser.following = loggedInUser.following.filter(
        (followingId) => followingId.toString() !== userId
      );
      followedUser.followers = followedUser.followers.filter(
        (followId) => followId.toString() !== loggedInUser._id.toString()
      );
    } else {
      loggedInUser.following.push(userId);
      followedUser.followers.push(loggedInUser._id);
    }

    await Promise.all([
      loggedInUser.save({ validateBeforeSave: false }),
      followedUser.save({ validateBeforeSave: false }),
    ]);

    // await cache.del(`currentUser:${loggedInUser._id}`)
    // await cache.del(`user:${loggedInUser.username}`)
    // await cache.del(`user:${loggedInUser.name}`)

    return res.status(200).json({
      msg: isFollowing
        ? "User unfollowed successfully"
        : "User followed successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// get all followers
const getFollowers = async (req, res) => {
  try {
    const user = req.user
    const userId = req.params.userId

    if (!user) {
      return res.status(422).json({
        msg: "UnAuthrozed access"
      })
    }

    // const cachedFollowers = await cache.get(`followers:${userId}`)

    // if(cachedFollowers){
    //   return res.status(200).json({
    //     followers:cachedFollowers,
    //     msg: "Followers found successfully"
    //   })
  
    // }

    const [loggedInUser, newUser] = await Promise.all([
      await User.findById(user._id),
      await User.findById(userId)
    ])

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "UnAuthrozed access"
      })
    }

    const followers = await Promise.all(
      newUser.followers.map((userId) => {
        return User.findById(userId._id).select("-password -refreshToken")
      })
    )

    // await cache.set(`followers:${userId}`,followers)

    return res.status(200).json({
      followers,
      msg: "Followers found successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error"
    })
  }
}


// get all suggetions ---
const getSuggestions = async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(422).json({
        msg: "unauthorized access"
      })
    }

    const loggedInUser = await User.findById(user._id)

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "unauthorized access"
      })
    }

    // const cachedSuggestion = await cache.get('suggestion')

    // if(cachedSuggestion){
    //   return  res.status(200).json({
    //     users:cachedSuggestion,
    //     msg:"Users found successfully"
    //   })
    // }

    const users = await User.find({_id:{
      $ne:loggedInUser._id
    }}).select('-password -refreshToken')

    if(!users){
      return res.status(404).json({
        msg:"Users not found"
      })
    }

    // await cache.set('suggestion',users)

    return  res.status(200).json({
      users,
      msg:"Users found successfully"
    })
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error"
    })
  }
}

// cron job ----------------

// delete unverified user - after 24h -------------------------------------
cron.schedule("0 0 * * *", async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await User.deleteMany({
      isVerified: false,
      createdAt: { $lte: twentyFourHoursAgo },
    });
    console.log("Unverified users deleted");
  } catch (error) {
    console.error("Error deleting unverified users:", error);
  }
});

export {
  registerUser,
  loginUser,
  verifyAccount,
  getCurrentUser,
  logoutUser,
  deleteAccount,
  deleteProfileImage,
  forgotPassword,
  resetPassword,
  followUser,
  getFollowers,
  getSuggestions
};
