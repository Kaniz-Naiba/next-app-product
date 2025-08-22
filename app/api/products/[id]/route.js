import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("next_product_app");
    const collection = db.collection("products");

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
    }

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    const serializedProduct = { ...product, id: product._id.toString() }; // Use `id` for frontend
    return new Response(JSON.stringify(serializedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch product" }), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("next_product_app");
    const collection = db.collection("products");

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
    }

    const body = await req.json();
    const updateData = {
      name: body.name,
      description: body.description,
      price: body.price,
    };

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    const updatedProduct = { ...result.value, id: result.value._id.toString() };
    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to update product" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("next_product_app");
    const collection = db.collection("products");

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Product deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to delete product" }), { status: 500 });
  }
}
