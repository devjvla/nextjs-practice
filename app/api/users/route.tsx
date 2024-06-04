import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, firstName: "Kobe", lastName: "Bryant" },
        { id: 2, firstName: "Dwyane", lastName: "Wade" },
        { id: 3, firstName: "Stephen", lastName: "Curry" },
    ]);
}

export async function POST(request: NextRequest) {
    const req_body = await request.json();

    if(!req_body.firstName || !req_body.lastName)
        return NextResponse.json({ 'error': 'Missing required fields!' }, { status: 400 });

    return NextResponse.json({ id: 1, ...req_body }, { status: 201 });
}