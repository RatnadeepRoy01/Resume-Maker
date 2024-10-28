
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
      },
      async authorize(credentials) {


        const url = "http://localhost:3000/api/getUser";
        console.log(credentials, "ggggggggggg");
        const response = await postData(credentials, url);
        console.log(response,"ffffff")
        if (response.email)
        {
         console.log(credentials.email,"dddddddddddd")
          return response;
        }
          else throw new Error("Invalid password");
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "github") {
        const email = user.email;

        const url = "http://localhost:3000/api/getUser";
        console.log(user, "gggh");
        const response = await postData(user, url);

      if(response.state == "success")
      return true;
      else 
      throw new Error("Invalid")
      }
         return true;  
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Add email to JWT token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email; // Add user email to session
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_SECRET_KEY,
});
