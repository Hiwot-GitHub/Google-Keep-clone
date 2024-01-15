import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from 'bcrypt';

const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
      password: { label: "Password", type: "password" , placeholder: "password"}
            },
            async authorize(credentials, req: any){
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({where: {email: credentials.email}});
                if (!user) return null;
                const passwordMatched = await bcrypt.compare(credentials.password, user.hashedPassword!);
                return passwordMatched? user : null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}