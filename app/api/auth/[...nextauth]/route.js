import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "39056011089-31qv1l2vp2mv875ltna0crjhi2fjt6qd.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        //SERVERLESS ROUTE ->Lambda->function ->mongodb only called when required
        await connectToDb();
        //check if a user already exists
        const userexists = await User.findOne({ email: profile.email });

        //if not create a new user and save to db
        if (!userexists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },

  },
});

export { handler as GET, handler as POST };
