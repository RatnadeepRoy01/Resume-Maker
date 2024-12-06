import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { postData } from "./app/function/postData";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "suma@gmail.com" },
        password: { label: "Password", type: "password" },
        twoFACode: { label: "2FA Code", type: "text" },
        type: { label: "type", type: "text" },
      },
      async authorize(credentials) {
        const url = "http://localhost:3000/api/getUser";
        console.log("credentials", credentials);
        
        const response = await postData(credentials, url);
        console.log(response, "Response from database");
   

        if ( response && response.email ) {
          return { email: response.email, id: response._id }; // Return email and id
        } else if (response.state === "No entry found") {
          throw new Error("No entry found");
        } else if (response.state === "User already exist") {
          throw new Error("User already exist");
        } else {
          throw new Error("Invalid password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const url = "http://localhost:3000/api/getUser";
        console.log(user, "OAuth user");

        const response = await postData(user, url);

        if (response.state === "success") {
          return true;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id; // Store the user's ID in the token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.id = token.id; // Add ID to the session
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET_KEY,
});
