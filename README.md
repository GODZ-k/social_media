
# Social Media Application (MERN Stack)


This project is a full-stack social media application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete posts, chat with other users, and experience secure, role-based access with JWT authentication and email verification.

## Features

- **CRUD Operations:** Users can create, update, delete, and view posts. Chat Functionality: Users can chat with each other.
- **Secure Authentication:** JWT authentication with email verification.
- **Role-Based Access Control:** Different roles with access levels.
- **Responsive and User-Friendly UI:** Seamless, intuitive design for users.


## Tech Stack
- **Frontend:** React (bundled using Vite), Redux for state management.
- **Backend:** Node.js with Express, MongoDB as the database.
- **Authentication:** Secure JWT authentication with email verification.
- **State Management:** Redux for managing application state.


## Getting Started


### Client Setup

The client-side is built using Vite and manages state with Redux.

#### Prerequisites
Ensure you have the following installed on your local machine:

- Latest Node.js
- npm


    
## Run Locally

Clone the project

```bash
  git clone https://github.com/GODZ-k/social_media.git
```

Go to the project directory

```bash
  cd social_media/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

#### The client will run on http://localhost:5173.


### Server Setup

The server-side is built using Node.js with Express and communicates with a MongoDB database.


#### Prerequisites
Ensure you have the following installed on your local machine:


- Latest Node.js
- npm
- MongoDB (local or cloud instance)


    
## Setup Commands

Go to the project directory

```bash
  cd social_media/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

#### The client will run on http://localhost:3000.

### Future Updates
- **Notifications:** Real-time notifications for users.
- **Profile Customization:** Allow users to customize their profiles.
- **Image Sharing:** Enhance the platform with media-sharing capabilities.

## 🛠 Skills
Javascript, HTMl/CSS , React , Express , MongoDb , Nodejs , Redux , Git/Github , Linux , Docker ,  Tailwind etc.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DATABASE_URL`
`DATABASE_NAME`
`ACCESS_TOKEN_SECRET_KEY`
`ACCESS_TOKEN_EXPIRY`
`REFRESH_TOKEN_SECRET_KEY`
`REFRESH_TOKEN_EXPIRY`
`VERIFICATION_TOKEN_SECRET_KEY`
`VERIFICATION_TOKEN_EXPIRY`
`DOMAIN`
`FRONTEND_DOMAIN`
`CLOUDINARY_NAME` 
`CLOUDINARY_API_KEY` 
`CLOUDINARY_API_SECRET` 
`RESEND_API_KEY`

You don't need to set up any environment variables to run this project. My credentials are already included.
## Contributing

Contributions are always welcome!

See `readme.md` for ways to get started.

Please adhere to this project's `code of conduct`.

