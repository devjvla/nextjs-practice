import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
	let response_data = { result: {}, status: 400 };

	try {
		const products = await prisma.product.findMany();
		
		response_data.result = { ...products };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}

export async function POST(request: NextRequest) {
    let response_data = { result: {}, status: 400 };

	try {
		const { name, cost, quantity } = await request.json();

		// Validate request body
		const validate = schema.safeParse({ name, cost, quantity });

		if(!validate.success){
			throw new Error("Invalid fields");
		}

		// Create new Product record
		const create_product = await prisma.product.create({
			data: { name, cost, quantity }
		});

		response_data.result = { ...create_product };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
		
		if (error instanceof Error) {
			response_data.result = { "message": error.message };
		}
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}