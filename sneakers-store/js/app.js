
// ========================================
// 1. CONFIGURACIÓN DE LA TIENDA
// ========================================

// Cambia este número por tu WhatsApp real.
// Perú: 51 + número de celular.
const NUMERO_WHATSAPP = "51999999999";

// ========================================
// 2. LISTA DE PRODUCTOS
// ========================================

const productos = [
    {
        id: 1,
        nombre: "Air Max 270",
        marca: "Nike",
        categoria: "Nike",
        precio: 429,
        anterior: 499,
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        descripcion: "Comodidad y estilo para todos los días.",
        tallas: [38, 39, 40, 41, 42, 43],
        oferta: "14% OFF"
    },
    {
        id: 2,
        nombre: "Ultraboost Running",
        marca: "Adidas",
        categoria: "Adidas",
        precio: 389,
        anterior: 459,
        imagen: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=700",
        descripcion: "Amortiguación ideal para correr.",
        tallas: [38, 39, 40, 41, 42, 43],
        oferta: "15% OFF"
    },
    {
        id: 3,
        nombre: "Air Jordan Retro",
        marca: "Jordan",
        categoria: "Jordan",
        precio: 549,
        anterior: 629,
        imagen: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700",
        descripcion: "Diseño urbano con personalidad.",
        tallas: [39, 40, 41, 42, 43, 44],
        oferta: "13% OFF"
    },
    {
        id: 4,
        nombre: "RS-X Original",
        marca: "Puma",
        categoria: "Puma",
        precio: 319,
        anterior: 379,
        imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700",
        descripcion: "Estilo moderno y deportivo.",
        tallas: [38, 39, 40, 41, 42, 43],
        oferta: "16% OFF"
    },
    {
        id: 5,
        nombre: "Nike Air Force 1",
        marca: "Nike",
        categoria: "Nike",
        precio: 399,
        anterior: 449,
        imagen: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700",
        descripcion: "Un clásico que nunca pasa de moda.",
        tallas: [38, 39, 40, 41, 42, 43, 44],
        oferta: "11% OFF"
    },
    {
        id: 6,
        nombre: "Adidas Forum Low",
        marca: "Adidas",
        categoria: "Adidas",
        precio: 349,
        anterior: 419,
        imagen: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=700",
        descripcion: "Inspiración clásica para tu outfit.",
        tallas: [38, 39, 40, 41, 42],
        oferta: "17% OFF"
    },
    {
        id: 7,
        nombre: "Jordan High Style",
        marca: "Jordan",
        categoria: "Jordan",
        precio: 579,
        anterior: 649,
        imagen: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700",
        descripcion: "Diseño urbano para destacar.",
        tallas: [39, 40, 41, 42, 43, 44],
        oferta: "11% OFF"
    },
    {
        id: 8,
        nombre: "Puma Street Rider",
        marca: "Puma",
        categoria: "Puma",
        precio: 289,
        anterior: 339,
        imagen: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700",
        descripcion: "Ligereza y comodidad en cada paso.",
        tallas: [38, 39, 40, 41, 42, 43],
        oferta: "15% OFF"
    }
];

// ========================================
// 3. VARIABLES Y ELEMENTOS DEL DOM
// ========================================

let carrito = JSON.parse(localStorage.getItem("carritoSneakers")) || [];
let categoriaActual = "Todos";

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const emptyProducts = document.getElementById("emptyProducts");

const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

// ========================================
// 4. FORMATO DE PRECIOS
// ========================================

function formatoPrecio(precio) {
    return "S/ " + precio.toFixed(2);
}

// ========================================
// 5. MOSTRAR PRODUCTOS
// ========================================

function mostrarProductos(lista) {

    productsGrid.innerHTML = "";

    emptyProducts.hidden = lista.length !== 0;

    lista.forEach(producto => {

        const tallasHTML = producto.tallas.map(talla =>
            `<option value="${talla}">${talla}</option>`
        ).join("");

        const tarjeta = document.createElement("article");

        tarjeta.className = "product-card";

        tarjeta.innerHTML = `
            <div class="product-image">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                >
                <span class="product-badge">${producto.oferta}</span>
            </div>

            <div class="product-info">

                <span class="product-brand">${producto.marca}</span>

                <h3>${producto.nombre}</h3>

                <p class="product-description">
                    ${producto.descripcion}
                </p>

                <div class="product-price">
                    <span class="current-price">
                        ${formatoPrecio(producto.precio)}
                    </span>

                    <span class="old-price">
                        ${formatoPrecio(producto.anterior)}
                    </span>
                </div>

                <select
                    class="size-select"
                    id="size-${producto.id}"
                    aria-label="Seleccionar talla de ${producto.nombre}"
                >
                    <option value="">Seleccionar talla</option>
                    ${tallasHTML}
                </select>

                <button
                    class="add-button"
                    data-id="${producto.id}"
                >
                    AGREGAR AL CARRITO +
                </button>

            </div>
        `;

        productsGrid.appendChild(tarjeta);
    });
}

// ========================================
// 6. BUSCADOR Y FILTROS
// ========================================

function filtrarProductos() {

    const busqueda = searchInput.value.toLowerCase().trim();

    let resultado = productos.filter(producto => {

        const coincideNombre =
            producto.nombre.toLowerCase().includes(busqueda);

        const coincideMarca =
            producto.marca.toLowerCase().includes(busqueda);

        const coincideCategoria =
            categoriaActual === "Todos" ||
            producto.categoria === categoriaActual;

        return (coincideNombre || coincideMarca) && coincideCategoria;
    });

    // Ordenar por precio
    if (sortSelect.value === "low") {
        resultado.sort((a, b) => a.precio - b.precio);
    }

    if (sortSelect.value === "high") {
        resultado.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(resultado);
}

// Eventos del buscador
searchInput.addEventListener("input", filtrarProductos);

sortSelect.addEventListener("change", filtrarProductos);

// Eventos de las categorías
document.querySelectorAll(".filter-btn").forEach(boton => {

    boton.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            ?.classList.remove("active");

        boton.classList.add("active");

        categoriaActual = boton.dataset.category;

        filtrarProductos();
    });
});

// ========================================
// 7. AGREGAR PRODUCTOS AL CARRITO
// ========================================

function agregarAlCarrito(id, talla) {

    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    if (!producto.tallas.includes(talla)) {
        mostrarNotificacion("Selecciona una talla válida.");
        return;
    }

    // Cada combinación de producto y talla es independiente.
    const existente = carrito.find(item =>
        item.id === id && item.talla === talla
    );

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            talla: talla,
            cantidad: 1
        });
    }

    guardarCarrito();
    mostrarNotificacion("¡Producto agregado al carrito!");
}

// Evento para agregar productos
productsGrid.addEventListener("click", evento => {

    const boton = evento.target.closest(".add-button");

    if (!boton) return;

    const id = Number(boton.dataset.id);

    const selector = document.getElementById(`size-${id}`);

    const talla = Number(selector.value);

    if (!selector.value) {
        mostrarNotificacion("Primero selecciona una talla.");
        selector.focus();
        return;
    }

    agregarAlCarrito(id, talla);
});

// ========================================
// 8. GUARDAR EL CARRITO
// ========================================

function guardarCarrito() {

    localStorage.setItem(
        "carritoSneakers",
        JSON.stringify(carrito)
    );

    actualizarCarrito();
}

// ========================================
// 9. ACTUALIZAR EL CARRITO
// ========================================

function actualizarCarrito() {

    cartItems.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <p>Tu carrito está vacío.</p>
                <p>¡Agrega tus zapatillas favoritas!</p>
            </div>
        `;

    }

    carrito.forEach(item => {

        const subtotal = item.precio * item.cantidad;

        total += subtotal;
        cantidadTotal += item.cantidad;

        const elemento = document.createElement("div");

        elemento.className = "cart-item";

        elemento.innerHTML = `

            <img src="${item.imagen}" alt="${item.nombre}">

            <div class="cart-item-info">

                <h3>${item.nombre}</h3>

                <p class="cart-size">Talla: ${item.talla}</p>

                <p>${formatoPrecio(item.precio)}</p>

                <div class="cart-actions">

                    <button
                        class="quantity-btn"
                        data-action="minus"
                        data-id="${item.id}"
                        data-size="${item.talla}"
                        aria-label="Disminuir cantidad"
                    >−</button>

                    <span class="quantity-number">
                        ${item.cantidad}
                    </span>

                    <button
                        class="quantity-btn"
                        data-action="plus"
                        data-id="${item.id}"
                        data-size="${item.talla}"
                        aria-label="Aumentar cantidad"
                    >+</button>

                    <button
                        class="remove-button"
                        data-action="remove"
                        data-id="${item.id}"
                        data-size="${item.talla}"
                    >Eliminar</button>

                </div>

            </div>
        `;

        cartItems.appendChild(elemento);
    });

    cartCount.textContent = cantidadTotal;

    cartTotal.textContent = formatoPrecio(total);
}

// ========================================
// 10. MODIFICAR CANTIDADES Y ELIMINAR
// ========================================

cartItems.addEventListener("click", evento => {

    const boton = evento.target.closest("[data-action]");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const talla = Number(boton.dataset.size);
    const accion = boton.dataset.action;

    const item = carrito.find(p =>
        p.id === id && p.talla === talla
    );

    if (!item) return;

    if (accion === "plus") {
        item.cantidad++;
    }

    if (accion === "minus") {
        item.cantidad--;

        if (item.cantidad <= 0) {
            carrito = carrito.filter(p =>
                !(p.id === id && p.talla === talla)
            );
        }
    }

    if (accion === "remove") {
        carrito = carrito.filter(p =>
            !(p.id === id && p.talla === talla)
        );

        mostrarNotificacion("Producto eliminado.");
    }

    guardarCarrito();
});

// ========================================
// 11. ABRIR Y CERRAR CARRITO
// ========================================

function abrirCarrito() {

    cartPanel.classList.add("active");
    overlay.classList.add("active");

    cartPanel.setAttribute("aria-hidden", "false");

    document.body.classList.add("cart-open");
}

function cerrarCarrito() {

    cartPanel.classList.remove("active");
    overlay.classList.remove("active");

    cartPanel.setAttribute("aria-hidden", "true");

    document.body.classList.remove("cart-open");
}

document.getElementById("openCart")
    .addEventListener("click", abrirCarrito);

document.getElementById("closeCart")
    .addEventListener("click", cerrarCarrito);

document.getElementById("continueShopping")
    .addEventListener("click", cerrarCarrito);

overlay.addEventListener("click", cerrarCarrito);

// ========================================
// 12. FINALIZAR COMPRA POR WHATSAPP
// ========================================

document.getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (carrito.length === 0) {

            mostrarNotificacion("Tu carrito está vacío.");

            return;
        }

        let total = 0;

        let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

        carrito.forEach(item => {

            const subtotal = item.precio * item.cantidad;

            total += subtotal;

            mensaje +=
                `• ${item.nombre}\n` +
                `  Talla: ${item.talla}\n` +
                `  Cantidad: ${item.cantidad}\n` +
                `  Precio: ${formatoPrecio(subtotal)}\n\n`;
        });

        mensaje +=
            `TOTAL: ${formatoPrecio(total)}\n\n` +
            "Quisiera información para completar mi compra.";

        const url =
            `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");

        // El carrito se conserva hasta confirmar el pedido.
    });

// ========================================
// 13. NOTIFICACIONES
// ========================================

let toastTimer;

function mostrarNotificacion(mensaje) {

    toast.textContent = mensaje;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ========================================
// 14. MENÚ PARA CELULARES
// ========================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});

navLinks.querySelectorAll("a").forEach(enlace => {

    enlace.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });

});

// ========================================
// 15. INICIALIZAR LA TIENDA
// ========================================

mostrarProductos(productos);

actualizarCarrito();
