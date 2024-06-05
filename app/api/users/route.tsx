import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
	let response_data = { result: {}, status: 400 };

	try {
		const users = await prisma.user.findMany();
		
		response_data.result = { ...users };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}

export async function POST(request: NextRequest) {
	let response_data = { result: {}, status: 400 };

	try {
		const { firstName, lastName, email, password } = await request.json();

		// Validate request body
		const validate = schema.safeParse({ firstName, lastName, email, password });

		if(!validate.success){
			throw new Error("Invalid fields");
		}

		// Check if email is already in the database
		const check_email = await prisma.user.findUnique({ where: { email } });

		if(check_email) {
			response_data.status = 201;
			throw new Error("Cannot create User record because Email is already registered");
		}

		// Create new User record
		const create_user = await prisma.user.create({
			data: { firstName, lastName, email, password }
		});

		response_data.result = { ...create_user };
		response_data.status = 200;
	} catch (error) {
		response_data.result = { "message": "An error occured" };
		
		if (error instanceof Error) {
			response_data.result = { "message": error.message };
		}
	}

	return NextResponse.json(response_data.result, { status: response_data.status });
}