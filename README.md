

# LinkedIn Clone

This is a LinkedIn clone developed using the MERN stack (MongoDB, Express.js, React, Node.js), Tailwind CSS, DaisyUI, Cloudinary for photo storage, and Mailtrap for sending emails.

## Overview

This project replicates key functionalities of the LinkedIn platform, including:

- **User Authentication**: Sign up, log in, and log out with full authentication using JWT (JSON Web Tokens).
- **Profile Management**: Users can create and edit their profiles, including adding profile pictures (stored using Cloudinary).
- **Post Creation**: Users can create posts, share updates, and engage with other users through likes and comments.
- **Connections**: Users can follow each other to build their professional network.
- **Notifications**: Users are notified of new connections and post activities.


## Features

- **Responsive UI**: Designed using Tailwind CSS and DaisyUI for a fully responsive and modern interface.
- **Photo Storage**: Profile pictures and other images are stored securely using Cloudinary.
- **Email Notifications**: Users receive email notifications for account activity (powered by Mailtrap).
  
## Tech Stack

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary
- **Email Service**: Mailtrap

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/diegovilhalva/linkedin-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd linkedin-clone
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   # Backend dependencies
   npm install

   # Frontend dependencies
   cd ./frontend
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `root` directory with the following variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MAILTRAP_TOKEN=your_mailtrap_token
   EMAIL_FROM=your_email_provided_by_mailtrap
   EMAIL_FROM_NAME=your_name
   NODE_ENV=developement
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development servers:
   ```bash
   # Start the backend
   cd server
   npm run dev

   # Start the frontend
   cd ../client
   npm start
   ```

6. Open the application at `http://localhost:5173`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.    

