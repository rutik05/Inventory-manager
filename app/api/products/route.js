import Product from '@/app/models/productModel';
import dbConnect from '@/app/utils/connectDB';
import mongoose from 'mongoose';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    const products = await Product.find({}).select('-_id -__v').sort({created : -1}).exec();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Cannot find products', status: 404 });

  }
}

