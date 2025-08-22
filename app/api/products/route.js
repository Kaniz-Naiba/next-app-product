import clientPromise from "@/lib/mongodb";

// GET /api/products?featured=true
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("next_product_app");
    const collection = db.collection("products");

    const url = new URL(req.url);
    const featured = url.searchParams.get("featured");

    const query = featured === "true" ? { featured: true } : {};
    const products = await collection.find(query).toArray();

    const serializedProducts = products.map(p => ({
      ...p,
      id: p._id.toString(),
    }));

    return new Response(JSON.stringify(serializedProducts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch products" }), { status: 500 });
  }
}

// POST /api/products
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("next_product_app");
    const collection = db.collection("products");

    const body = await req.json();
    const newProduct = {
      ...body,
      featured: body.featured || false,
    };

    const result = await collection.insertOne(newProduct);
    newProduct.id = result.insertedId.toString();

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to add product" }), { status: 500 });
  }
}
