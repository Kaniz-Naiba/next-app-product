import { getProductById } from "@/lib/products";

export async function GET(req, context) {
  // Await the params object
  const { params } = await context;
  const { id } = params;

  const product = getProductById(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
