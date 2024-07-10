import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import prisma from "./prismaSingleton";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: ""},
                password: {label: "Password", type: "password", placeholder: ""}
            },
            async authorize(credentials: any){
                try {
                    
    
                    if(!credentials.email || !credentials.password){
                        return null
                         
                    }
    
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email
                        },
    
                    })
    
                    if(!user){
                        console.log(("User not found."));
                        
                        return null
                    }
    
                    const correctPassword = await bcrypt.compare(credentials.password, user.password)
    
                    if(!correctPassword){
                        console.log("pASSWORD");
                        
                        return null
                    }
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.username
                        
                    }
                    
                } catch (error) {
                    return NextResponse.json({
                        error
                    })
                }
                
            }
        })
    ],
    secret: "123456",
    callbacks: {
        session: async ({session, token, user}: any) => {
            if(session && session.user){
                session.user.id = token.sub
                session.user.username = token.username
            }

            return session
             
        },
        
    },
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup'
    }
    
}