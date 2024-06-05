import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

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

export function GET(request: NextRequest, { params }: { params: { id: number} }) {
    const [product] = SAMPLE_PRODUCTS_JSON.filter(product => product.id == params.id );

    if(!product)
        return NextResponse.json({ error: "Product is not found" }, { status: 404 });

    return NextResponse.json(product);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: number } }) {
    const req_body = await request.json();

    if(!Object.keys(req_body).length)
        return NextResponse.json({ "error": "Missing required fields" }, { status: 400 });
    
    const product = await fetch(`http://localhost:3000/api/products/${params.id}`);
    const product_data = await product.json();

    if(product_data.error)
        return NextResponse.json(product_data, { status: 404 });

    return NextResponse.json({ ...product_data, ...req_body });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const product = await fetch(`http://localhost:3000/api/products/${params.id}`);
    const product_data = await product.json();

    if(product_data.error)
        return NextResponse.json(product_data, { status: 404 });
    
    let index = SAMPLE_PRODUCTS_JSON.findIndex(product => product.id == params.id);
    SAMPLE_PRODUCTS_JSON.splice(index, 1);

    return NextResponse.json({ "message": "Product is successfully deleted." });
}