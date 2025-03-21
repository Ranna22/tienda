document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        {
            imagen: "im/planta1.png",
            nombre: "Cactus Mini",
            descripcion: "Ideal para decoración en interiores.",
            precio: 150
        },
        {
            imagen: "im/planta2.jpg",
            nombre: "Bonsái Ficus",
            descripcion: "Un bonsái elegante para tu hogar.",
            precio: 1200
        },
        {
            imagen: "im/herramienta1.jpg",
            nombre: "Tijeras de podar",
            descripcion: "Corte preciso para tus plantas.",
            precio: 300
        },
        {
            imagen: "im/maceta1.jpg",
            nombre: "Maceta de barro",
            descripcion: "Perfecta para plantas medianas.",
            precio: 250
        }
    ];

    let contenedor = document.getElementById('productos-container');

    productos.forEach((producto, index) => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.setAttribute('data-id', index);
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-carrito">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });

    // Llamar a la función para agregar los eventos de los botones
    addEventToButtons();
    renderCart(); // Cargar el carrito inicial al cargar la página
});

// Función para agregar al carrito
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Llamar a la función para actualizar el carrito visible
    renderCart();
}

// Agregar eventos a los botones "Agregar al carrito"
function addEventToButtons() {
    const botones = document.querySelectorAll('.agregar-carrito');
    botones.forEach((boton, index) => {
        const productName = boton.previousElementSibling.previousElementSibling.previousElementSibling.innerText; // Nombre del producto
        const productPrice = boton.previousElementSibling.previousElementSibling.innerText; // Precio del producto
        boton.addEventListener('click', function() {
            addToCart(index, productName, productPrice);
            playSound(); // Reproducir sonido al agregar al carrito
            showNotification(`${productName} agregado al carrito`); // Mostrar notificación
        });
    });
}

// Función para reproducir el sonido al agregar al carrito
function playSound() {
    try {
        const audio = new Audio('im/sound/SD_ALERT_3.mp3');  // Asegúrate de que esta ruta sea correcta
        audio.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);  // Mostrar error en consola si el sonido no se reproduce
        });
    } catch (error) {
        console.error('Error al cargar el archivo de sonido:', error);  // Mostrar error si el archivo no se carga
    }
}

// Función para mostrar la notificación
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000); // Eliminar la notificación después de 3 segundos
}

// Función para renderizar el carrito de compras
function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";  // Limpiar el carrito

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    const productos = [
        {
            imagen: "im/planta1.png",
            nombre: "Cactus Mini",
            descripcion: "Ideal para decoración en interiores.",
            precio: 150
        },
        {
            imagen: "im/planta2.jpg",
            nombre: "Bonsái Ficus",
            descripcion: "Un bonsái elegante para tu hogar.",
            precio: 1200
        },
        {
            imagen: "im/herramienta1.jpg",
            nombre: "Tijeras de podar",
            descripcion: "Corte preciso para tus plantas.",
            precio: 300
        },
        {
            imagen: "im/maceta1.jpg",
            nombre: "Maceta de barro",
            descripcion: "Perfecta para plantas medianas.",
            precio: 250
        }
    ];

    for (const productId in cart) {
        const producto = productos[productId];
        const cantidad = cart[productId];

        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
            <p>${producto.nombre} x${cantidad} - $${producto.precio * cantidad}</p>
            <button onclick="removeFromCart('${productId}')">Eliminar</button>
        `;
        cartContainer.appendChild(item);
    }
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();  // Actualizar la vista del carrito después de eliminar el producto
}
