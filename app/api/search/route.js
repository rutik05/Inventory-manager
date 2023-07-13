import Product from "@/app/models/productModel";
import dbConnect from "@/app/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    await dbConnect();
    try {
        let req =  request.nextUrl.searchParams.get('query');
        const products = await Product.aggregate([{
            $match: {
                name: {
                    $regex: new RegExp(`^${req}`, 'i')
                }   
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                quantity: 1,
                created: 1
            }
        }
        ])
        return NextResponse.json(
            products)
        }
    catch (error) {
    return NextResponse.json({ error: error.message });
}
}
