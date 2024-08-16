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
} from "../utils/utils.js";
import { forgotPasswordMail } from "../utils/mails/forgotpasswordmail.js";
import mongoose from "mongoose";

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

    const { username, email, password , confirmPassword , firstName , lastName } = payload.data;

    if(password !== confirmPassword){
      return res.status(400).json({
        msg:"Confirm password does not match"
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

    const { data, error } = await verificationMail(email, verificationLink);

    if (error) {
      return res.status(500).json({
        msg: "failed to send verification mail please try again later",
      });
    }

    if (data) {
      await User.create({
        email,
        firstName,
        lastName,
        username,
        password,
        verificationToken,
      });
      return res.status(200).json({
        msg: "user created successfully",
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

    const options = {
      httpOnly: true,
      path: "/",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        msg: "User loggedin successfully",
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

    // const currentUser = await User.findById(user._id).select(
    //   "-password -refreshToken"
    // );

    const profile = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(user._id) } },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $project: {
          username: 1,
          firstName:1,
          lastName:1,
          bio:1,
          email: 1,
          avatar: 1,
          isVerified:1,
          followers: {
            _id: 1,
            username: 1,
            email: 1,
            avatar: 1,
          },
          following: {
            _id: 1,
            username: 1,
            email: 1,
            avatar: 1,
          },
        },
      },
    ]);


    if (!profile.length || !profile[0].isVerified) {
        return res.status(422).json({
            msg: "Unauthorized access"
        })
    }

    return res.status(200).json({
      profile:profile[0],
      msg: "User fetched successfully",
    });
    
  } catch (error) {
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
    const options = {
      httpOnly: true,
      path: "/",
    };

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

    const options = {
      httpOnly: true,
      path: "/",
    };

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

    return res.status(200).json({
      msg: isFollowing
        ? "User unfollowed successfully"
        : "User followed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};


// get all followers
const getFollowers =async(req,res)=>{
  try {
    const user = req.user
    const userId = req.params.userId

    if(!user){
      return res.status(422).json({
        msg:"UnAuthrozed access"
      })    }

    const [loggedInUser,newUser] = await Promise.all([
     await User.findById(user._id),
     await User.findById(userId)
    ])

    if(!loggedInUser){
      return res.status(422).json({
        msg:"UnAuthrozed access"
      })
    }

    const followers = await Promise.all(
      newUser.followers.map((userId)=>{
        return User.findById(userId._id).select("-password -refreshToken") 
      })
    )

    return res.status(200).json({
      followers,
      msg:"Followers found successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg:"Internal server error"
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
  getFollowers
};
