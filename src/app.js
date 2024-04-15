//Importacion de librerias
import express from "express";
import { ProductManager } from "./ProductManager.js";

//Instancio la clase
const pro = new ProductManager("./src/products.json");

//Configuracion del servidor
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 8080;

//Servidor raiz
app.get("/", (req, res) => {
  res.send(`Server levantado sobre puerto: ${port}`);
});

//Ruta /products?limit=
app.get("/products", async (req, res) => {
  //Obtengo los productos
  const prod = await pro.getProducts();
  //Guardo el valor del limite
  const limite = req.query.limit;
  //Si existe limite, recorto el array SINO lo muestro entero
  if (limite) {
    const limiteProductos = prod.slice(0, limite);
    res.json(limiteProductos);
  } else {
    res.json(prod);
  }
});

// Ruta /products/pid:
app.get("/products/:pid", async (req, res) => {
  //Se pasa pid convertido a numero usando + al metodo getProductById
  const getPID = await pro.getProductById(+req.params.pid);
  console.log(getPID);
  if (getPID === undefined) {
    res.json("Producto no encontrado");
  } else {
    res.json(getPID);
  }
});

// Servidor en escucha
app.listen(port, (req, res) => {
  console.log(`Server levantado sobre puerto: ${port}`);
});
