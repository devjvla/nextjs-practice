import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";


export async function GET(request: NextRequest, { params }: { params: { id: string} }) {
    let response_data = { result: {}, status: 400 };

	try {
		const product = await prisma.product.findUnique({
			where: { id: parseInt(params.id) }
		});

		if(!product) {
            response_data.status = 404;
			throw new Error("Product not found.");
		}

		response_data.result = { ...product };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
		
		if (error instanceof Error) {
			response_data.result = { "message": error.message };
		}
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    let response_data = { result: {}, status: 400 };

	try {
		const { name, cost, quantity } = await request.json();
	
		// Validate request body
		const validate = schema.safeParse({ name, cost, quantity });

		if(!validate.success){
			throw new Error("Invalid fields.");
		}
		
		// Check if Product exists
		const check_product = await prisma.product.findUnique({ where: { id: parseInt(params.id) } });

		if(!check_product) {
			response_data.status = 404;
			throw new Error("Prodcut not found.");
		}
	
		// Update Product record
		const update_product = await prisma.product.update({
			data: { name, cost, quantity }, 
			where: { id: parseInt(params.id) }
		});

		response_data.result = { ...update_product };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
		
		if (error instanceof Error) {
			response_data.result = { "message": error.message };
		}
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    let response_data = { result: {}, status: 400 };

	try {
		// Check if Product exists
		const check_product = await prisma.product.findUnique({ where: { id: parseInt(params.id) } });

		if(!check_product) {
			response_data.status = 404;
			throw new Error("Product not found.");
		}
	
		// Delete Product record
		await prisma.product.delete({ where: { id: parseInt(params.id) } });

		response_data.result = { "message": "Product record has been deleted" };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
		
		if (error instanceof Error) {
			response_data.result = { "message": error.message };
		}
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}