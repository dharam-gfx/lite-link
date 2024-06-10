# LiteLink - URL Shortener

LiteLink is a URL shortener application built using Next.js, Tailwind CSS, and Firebase. This project uses Headless UI for UI components.

## Demo

You can see a live demo of the application [here](https://litelink.vercel.app).

## Features

- Generate short URLs
- Redirect to original URLs
- Easy to use and responsive UI

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [Firebase](https://firebase.google.com/)

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/dharam-gfx/lite-link.git
   cd litelink


2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase

   Create a new Firebase project and set up Firestore, Authentication, and Storage. Copy the Firebase configuration and add them to your environment variables.

### Running the Application

1. Create a `.env` file in the root of your project and add your Firebase configuration:

   ```plaintext
   NEXT_PUBLIC_API_KEY=your-api-key
   NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_DATABASE_URL=your-database-url
   NEXT_PUBLIC_PROJECT_ID=your-project-id
   NEXT_PUBLIC_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_APP_ID=your-app-id
   ```

2. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the application running.

These variables are necessary for connecting to your Firebase project.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/dharam-gfx/lite-link/blob/main/LICENSE) file for more information.
```
