import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, { params }: { params: { id: number } }) {
    if(params.id > 10)
        return NextResponse.json({ "error": "User not found" }, { status: 404 });

    return NextResponse.json({ id: params.id, firstName: "John", lastName: "Doe" });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: number } }) {
    const req_body = await request.json();

    if(!Object.keys(req_body).length)
        return NextResponse.json({ "error": "Missing required fields" }, { status: 400 });
    
    const user = await fetch(`http://localhost:3000/api/users/${params.id}`);
    const user_data = await user.json();

    if(user_data.error)
        return NextResponse.json(user_data, { status: 404 });

    return NextResponse.json({ ...user_data, ...req_body }, { status: 200 });
}