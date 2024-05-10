import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {username, email, password}  = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({email}) 

        if (!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 404})
        }

        // console.log("user does exists");
    
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt)
        const validPassword = await bcrypt.compare(password, user.password)

        // console.log("password",password, "user.password", user.password);
        
        if (!validPassword) {
            console.log("Check your credentials");
            
            return NextResponse.json({error: "Check your credentials"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET! , { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Loggin Successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        // console.log(response);
        
        return response

    } catch (error: any) {
        console.log(error);
        
        return NextResponse.json({error: error.message}, {status: 500})
    }
}