Mini Social Video App
A mini social app built using React Native with Expo where users can view different videos and create their own videos. The backend services for authentication, databases, and storage are managed with Appwrite.

Table of Contents
Features
Tech Stack
Installation
Appwrite Setup
Usage
Folder Structure
License
Features
User authentication (Sign up, Login) with Appwrite
Video feed to view videos uploaded by other users
Video upload functionality for users to create and share their own videos
Data persistence with Appwrite's database service
Secure video storage using Appwrite's file storage
Responsive UI with React Native and Expo
Tech Stack
Frontend:

React Native
Expo (for development and building)
NativeWind (for styling)
Backend:

Appwrite (Authentication, Databases, Storage)
Other Tools:

Redux (for state management)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/mini-social-video-app.git
cd mini-social-video-app
Install dependencies:

bash
Copy code
npm install
Start the Expo server:

bash
Copy code
expo start
Appwrite Setup
Install Appwrite: Follow the Appwrite installation guide to set up your backend.

Create a Project:

Go to the Appwrite console and create a new project.
Set up Authentication:

Enable Email/Password authentication in the Appwrite console.
Create Databases and Storage:

Set up a database to store video metadata (e.g., user ID, video title, video URL).
Enable storage to allow users to upload their videos.
Configure API Keys and Endpoints:

In your React Native project, set up environment variables or directly configure the Appwrite API endpoint and project ID in your code.
Example:

js
Copy code
const client = new Client()
    .setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]')
    .setProject('[YOUR_PROJECT_ID]');
Usage
User Authentication:
Users can sign up and log in using Appwrite's authentication services.
View Videos:
Users can view videos uploaded by other users in the video feed.
Create and Upload Videos:
Users can record or select videos from their device and upload them to the platform.
Folder Structure
