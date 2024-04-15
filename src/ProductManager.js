//const fs = require("fs");
import fs from "fs";
const path = "./products.json";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct = async (product) => {
    const prod = await this.getProducts();

    prod.length === 0
      ? (product.id = 1)
      : (product.id = prod[prod.length - 1].id + 1);
    prod.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(prod));
    console.log("*********************************************************");
    console.log("Se ha agregado el producto: ");
    return console.log(product);
  };

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      console.log(products);
      return products;
    } else {
      return [];
    }
  };

  getProductById = async (id) => {
    const prod = await this.getProducts();
    console.log("*********************************************************");
    console.log("Buscar producto por el id: ", id);

    const productindex = prod.findIndex((e) => e.id == id);

    if (productindex === -1) {
      return console.log("Not found");
    } else {
      console.log("Producto Encontrado");
      console.log(prod[productindex]);
      return prod[productindex];
    }
  };

  updateProduct = async (id, product) => {
    const prod = await this.getProducts();
    const productindex = prod.findIndex((e) => e.id == id);
    product.id = id;
    let newTodos = [...prod];

    newTodos[productindex] = { ...product };
    await fs.promises.writeFile(this.path, JSON.stringify(newTodos));
    return console.log(newTodos);
  };

  deleteProduct = async (id) => {
    const prod = await this.getProducts();
    const productindex = prod.findIndex((e) => e.id == id);
    prod.splice(productindex, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(prod));
    return console.log(prod);
  };
}
const pro = new ProductManager("./products.json");

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
pro.getProducts();
