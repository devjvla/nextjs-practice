import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	let response_data = { result: {}, status: 400 };

	try {
		const user = await prisma.user.findUnique({
			where: { id: parseInt(params.id) }
		});

		if(!user) {
			throw new Error("User not found.");
		}

		response_data.result = { ...user };
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
		const { firstName, lastName, email, password } = await request.json();
	
		// Validate request body
		const validate = schema.safeParse({ firstName, lastName, email, password });

		if(!validate.success){
			throw new Error("Invalid fields.");
		}
		
		// Check if User exists
		const check_user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

		if(!check_user) {
			throw new Error("User not found.");
		}
	
		// Update User record
		const update_user = await prisma.user.update({
			data: { firstName, lastName, email, password }, 
			where: { id: parseInt(params.id) }
		});

		response_data.result = { ...update_user };
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
		// Check if User exists
		const check_user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

		if(!check_user) {
			throw new Error("User not found.");
		}
	
		// Delete User record
		await prisma.user.delete({ where: { id: parseInt(params.id) } });

		response_data.result = { "message": "User record has been deleted" };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
		
		if (error instanceof Error) {
			response_data.result = { "message": error.message };
		}
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}