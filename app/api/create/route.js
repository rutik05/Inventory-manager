import Product from "@/app/models/productModel";
import dbConnect from "@/app/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request){
    try {
      await dbConnect();
      const req = await request.json();
      // console.log(req);
      const createProduct = await Product.create(req);
      // console.log(createProduct);

    return NextResponse.json(req, { status: 200 });
    } catch (error) {
      console.log(error.message);
      // Return an error response
      return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
  }
  