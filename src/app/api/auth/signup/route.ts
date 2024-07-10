
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import prisma from "@/lib/prismaSingleton";
import axios from "axios";
export async function POST(request: Request){
    
    try {
        const {username, email, password} = await request.json()
        
        const userEmailExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(userEmailExist){
            return NextResponse.json({
                msg: "Email already taken."
            }, {status: 400})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const code = Math.floor(100000 + Math.random() * 900000);

        const userCreated = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                verificationCode: code,
            }
        })

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "77c92447ce7990",
              pass: "049eaad1e31dd2"
            }
        });

        const mailOptions = {
            from: 'harshgupta20220@gmail.com',
            to: userCreated.email,
            subject: "Verify your email.",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    color: #ffffff;
                    padding: 10px 0;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .footer {
                    background-color: #f4f4f4;
                    color: #777;
                    padding: 10px 0;
                    text-align: center;
                    font-size: 12px;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #4CAF50;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    color: #ffffff;
                    background-color: #4CAF50;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 16px;
                }
                .button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Verify Your Email Address</h1>
                </div>
                <div class="content">
                    <p>Thank you for signing up! Please use the following verification code to complete your registration:</p>
                    <p class="code">${code}</p>
                </div>
                <div class="footer">
                    <p>If you did not request this email, please ignore it.</p>
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `
        }
        
        const mailResponse = await transport.sendMail(mailOptions);

        return NextResponse.json({
            msg: "Successfully Signed Up.",
            userId: userCreated.id,
        })
        
        

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "failed",
            error
        }, {status: 500})
        
    }
}


export async function PUT(request: Request) {
    const {code, userId} = await request.json()
    console.log(code);
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        
        if(user.verificationCode == code){
            return NextResponse.json({
                msg: "Verification Successful"
            }, {status: 200})
        }

        return NextResponse.json({
            msg: "Wrong Verification Code."
        }, {status: 400})

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            msg: "Error in Verification",
            error
        }, {status: 400})
    }
}