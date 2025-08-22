import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  

callbacks: {
  async redirect({ url, baseUrl }) {
    // If a relative URL is provided, redirect to it
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Otherwise, use products as fallback
    return `${baseUrl}/products`;
  },
},



  pages: {
    signIn: "/login", // custom login page
  },
});

export { handler as GET, handler as POST };
