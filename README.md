# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/11392053-d66c-4ece-8ac2-d1b9f8210297

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/11392053-d66c-4ece-8ac2-d1b9f8210297) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Mobile App Development**

This project now supports mobile app development using Capacitor. Here's how to work with the mobile version:

1. **Setup Development Environment**
   ```sh
   # Install dependencies
   npm install
   
   # Build and sync with mobile
   npm run cap:serve
   ```

2. **Development Workflow**
   - For live development:
     ```sh
     npm run cap:dev
     ```
   - For production build:
     ```sh
     npm run cap:build
     ```
   - After making changes:
     ```sh
     npm run build
     npx cap sync
     ```

3. **Android Studio**
   - Open Android project:
     ```sh
     npx cap open android
     ```
   - Build APK: Build → Generate Signed Bundle/APK
   - Test on emulator or real device

4. **Testing on Device**
   - Enable USB debugging on your Android device
   - Connect via USB
   - Select your device in Android Studio
   - Click Run

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/11392053-d66c-4ece-8ac2-d1b9f8210297) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
