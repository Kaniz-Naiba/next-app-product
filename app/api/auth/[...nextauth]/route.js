import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs"; // For hashed passwords

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db("next_product_app");
          const users = db.collection("users");

          const user = await users.findOne({ email: credentials.email });
          if (!user) return null;

          // For plain password (not recommended)
          if (credentials.password === user.password) return { id: user._id, email: user.email, name: user.name };

          // For hashed passwords:
          // const isValid = await compare(credentials.password, user.password);
          // if (isValid) return { id: user._id, email: user.email, name: user.name };

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/products`;
    },
  },
});

export { handler as GET, handler as POST };
