import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("next_product_app"); // your DB name
    const collection = db.collection("products");

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
    }

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    // Convert _id to string
    const serializedProduct = { ...product, _id: product._id.toString() };

    return new Response(JSON.stringify(serializedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch product" }), { status: 500 });
  }
}
