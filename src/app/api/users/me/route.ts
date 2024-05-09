import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helper/getDataFromToken";
connect()

export async function POST(request: NextRequest) {
    try {
        // extract data from token
        const userId = await getDataFromToken(request)
        const user = await User.findById({_id: userId}).select("-password")

        // check if there is no user
        if (!user) {
            return NextResponse.json({
                error: "User does not exists"
            })
        }

        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        
    }
}