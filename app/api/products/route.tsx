import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

interface Product {
    id: number;
    name: string;
    price: number;
}

const SAMPLE_PRODUCTS_JSON: Product[] = [
    {
        id: 1,
        name: "Milk",
        price: 169
    },
    {
        id: 2,
        name: "Eggs",
        price: 59.50
    },
    {
        id: 3,
        name: "Coffee",
        price: 319.50
    }
];

export function GET(request: NextRequest) {
    return NextResponse.json(SAMPLE_PRODUCTS_JSON);
}

export async function POST(request: NextRequest) {
    const { name, price }: Product = await request.json();
    const validation = schema.safeParse({ name, price });

    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    SAMPLE_PRODUCTS_JSON.push({ id: SAMPLE_PRODUCTS_JSON.length + 1, name, price });

    return NextResponse.json({ ...SAMPLE_PRODUCTS_JSON[SAMPLE_PRODUCTS_JSON.length - 1] }, { status: 201 });
}