//import { productos } from "./Json/products.js";

const options = {method: 'GET'};
let productos = [];

async function fetchData() {
  try {
    const response = await fetch('http://localhost:8090/gamertx/products', options);
    if (response.ok) {
      console.log(`La solicitud bien` );
    }
    const data = await response.json();
    productos = data;
  } catch (err) {
    console.error(err);
  }
}
console.log(productos)
fetchData();



//Se crea un fragmento para evitar el reflow al renderizar los productos
const fragmentoProductos = new DocumentFragment();
const templateProducto = document.querySelector('#template__producto').content;
let productosRenderizados = '';

function hayEstrellas(rating) {
    let totalEstrellas = 5;
    let estrellas = '';
    for (let i = 0; i < rating; i++) {
        estrellas += '<ion-icon class="fs-xs star-active" name="star"></ion-icon>';
        totalEstrellas--;
    }

    for (let i = 0; i < totalEstrellas; i++) {
        estrellas += '<ion-icon class="fs-xs star" name="star"></ion-icon>';
    }
    return estrellas;
}

function hayDescuento(producto,precioConDescuentoAplicado) {
    let descuentoProducto = '';

    //Verificamos si el producto tiene descuento, si es asi el contenido que se mostrara subrayado sera el precio del producto, porque tiene descuento
    if (precioConDescuentoAplicado) {
        descuentoProducto = producto.precio;
    }

    //Si no tiene descuento, se pasara una cadena vacia, porque no tiene descuento
    return descuentoProducto;
}

export function separarProductosParaMostrar(numeroProductosInicioMostrar,numeroProductosFinalMostrar) {
    const productosParaMostrar = productos.slice(numeroProductosInicioMostrar, numeroProductosFinalMostrar)
    
    return productosParaMostrar;
   
}

export function renderizadoProductos(arregloProductos) {
    arregloProductos.forEach(producto => {
        const clone = document.importNode(templateProducto, true);

        //Se verifican el numero de estrellas del producto para renderizarlas
        const estrellas = hayEstrellas(producto.rating)
    
        //Se verifica si el producto tiene descuento para renderizarlo
        const descuentoProducto = hayDescuento(producto,producto.precioDescuento);
    
        //Se verifica si el producto tiene descuento, si es asi el precio del producto sera el precio con descuento, si no, sera el precio normal
        if (descuentoProducto !== ''){
            producto.precio = producto.precioDescuento;
        }
        
        //Se renderiza el producto
        clone.querySelector('.producto').setAttribute("data-id",producto.productId);
        clone.querySelector('.producto__imagen').src = producto.urlsImages[0];
        clone.querySelector('.producto__imagen').alt = producto.name;
        clone.querySelector('.producto__imagen').setAttribute("title",producto.name)
        clone.querySelector('.stars').innerHTML = estrellas;
        clone.querySelector('.reviews').textContent = `reviews (${producto.numeroReviews})`;
        clone.querySelector('.producto__nombre').textContent = producto.name;
        clone.querySelector('.producto__descuento').textContent = descuentoProducto;
        clone.querySelector('.producto__precio').textContent = `$${producto.price}`;

        //Se crea el HTML de cada producto
        fragmentoProductos.appendChild(clone);
    });
    return productosRenderizados = fragmentoProductos;
}