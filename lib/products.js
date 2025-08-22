let products = [
  { id: "1", name: "Laptop", description: "High performance laptop", price: 1200 },
  { id: "2", name: "Phone", description: "Latest smartphone", price: 800 },
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function addProduct(product) {
  const newProduct = { id: Date.now().toString(), ...product };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id, updated) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updated };
  return products[index];
}

export function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  return products.splice(index, 1)[0];
}
