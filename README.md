# ChatGPT-like Platform

This repository hosts a ChatGPT-like platform built using modern web technologies such as **Next.js**, **MongoDB**, **Google OAuth**, and **NextAuth**. The platform is designed to provide a seamless and intuitive user experience for interacting with an AI chatbot.

## Features

### 1. **New Chat Creation**
   - Users can start new chat sessions with the AI chatbot.
   - Each chat session is unique and allows for personalized interactions.

### 2. **Chat-wise Separate Conversation History**
   - Conversation history is stored and displayed per chat.
   - Each message includes a timestamp, enabling users to track their interactions over time.

### 3. **Customizable Navbar Color**
   - Users can personalize the platform by choosing their preferred navbar color through the settings menu.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js (API routes in Next.js)
- **Database**: MongoDB
- **Authentication**: Google OAuth via NextAuth

## Setup Instructions

### Prerequisites
- Node.js (>=16.x)
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)
- Google Cloud project with OAuth credentials

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/chatgpt-platform.git](https://github.com/pkundu307/realtimeaichat.git
   cd chatgpt-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Folder Structure

```
.Route (app)                              
┌ ○ /                                    
├ ○ /_not-found                          
├ ƒ /api/[email]                         
├ ƒ /api/auth/[...nextauth]              
├ ƒ /api/auth/login                      
├ ƒ /api/chats/[userId]                  
├ ƒ /api/chats/createChat                
├ ƒ /api/gemini                          
├ ƒ /api/messages                        
├ ƒ /api/messages/[chatId]               
├ ○ /profile                             
└ ○ /settingpage                         
+ First Load JS shared by all           
  ├ chunks/4bd1b696-5f153bf4b20098d3.js  
  ├ chunks/517-f38e9778a22d3b82.js       
  └ other shared chunks (total)          
```  

## Future Enhancements
- **Dark Mode**: Add a toggle for light and dark themes.
- **AI Model Selector**: Allow users to choose between different AI models.
- **Export Chats**: Enable users to download their conversation history.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and push the branch.
4. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- **OpenAI** for the inspiration behind the ChatGPT-like interface.
- **Next.js** for simplifying frontend and backend integration.
- **MongoDB** for providing a robust database solution.
- **NextAuth** for easy authentication integration.

---

Feel free to open issues for any bugs or feature requests. Enjoy building and interacting with the platform!










This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
