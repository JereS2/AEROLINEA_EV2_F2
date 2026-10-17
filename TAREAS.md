# Tareas pendientes — FJF Airlines (EV2 DSY1104)

**Fecha límite interna: domingo 18:00.** Lo que no esté listo a esa hora lo termina Jeremias.

## Cómo trabajar

1. Clonar el repo, `npm install` y `npm run dev`.
2. Crear tu rama: `git checkout -b compañero1` (o `compañero2`).
3. Cada página que te toca ya existe y dice "En construcción". Reemplaza su contenido.
4. Saca los datos de `src/data/db.js`. Ahí ya están las funciones de CRUD que necesitas, así que no hay que crear datos nuevos.
5. Usa las clases de estilo que ya existen (`tarjeta`, `btn-fjf`, `btn-fjf-azul`, `text-suave`, `precio`) para que todo se vea igual.
6. Escribe tus tests en `src/tests/` y córrelos con `npm run test:run`. Todos deben pasar.
7. Haz commits seguido, sube tu rama y abre un Pull Request hacia `main`.

## Ejemplos para copiar

| Si tienes que hacer… | Mira este archivo |
| --- | --- |
| Un listado con Ver / Editar / Eliminar | `src/pages/admin/VuelosAdmin.jsx` |
| Un formulario para crear y editar | `src/components/FormularioVuelo.jsx`, `NuevoVuelo.jsx`, `EditarVuelo.jsx` |
| Una página de detalle | `src/pages/admin/MostrarVuelo.jsx` |
| Una página simple con tarjetas | `src/pages/tienda/Nosotros.jsx` |
| Un formulario con validación y mensaje de error | `src/components/LoginForm.jsx`, `src/pages/tienda/Registro.jsx` |
| Una lista de vuelos | `src/components/ListaVuelos.jsx` |
| Tests | `src/tests/` (hay ejemplos de render, props, estado, eventos y mocks) |

---

## Compañero 1 — Admin de Destinos y Usuarios

- [ ] **`admin/DestinosAdmin.jsx`**: tabla con los destinos (nombre, descripción, cantidad de vuelos), con botones Editar y Eliminar y un botón "Nuevo destino". Usa `obtenerDestinos()`, `eliminarDestino(id)` y `obtenerVuelosPorDestino(id)`.
- [ ] **`admin/NuevoDestino.jsx`** y **`admin/EditarDestino.jsx`**: crear un `components/FormularioDestino.jsx` (nombre obligatorio, descripción obligatoria, ícono) igual que `FormularioVuelo`. Usa `agregarDestino()` y `editarDestino(id, datos)`.
- [ ] **`admin/UsuariosAdmin.jsx`**: tabla de usuarios (nombre, correo, rol, fecha de registro) con Ver, Editar y Eliminar. Usa `obtenerUsuarios()` y `eliminarUsuario(id)`.
- [ ] **`admin/NuevoUsuario.jsx`** y **`admin/EditarUsuario.jsx`**: crear `components/FormularioUsuario.jsx` (nombre, apellido, correo válido, contraseña de 4 a 10 caracteres, rol pasajero/admin). Usa `validarCorreo()` y `validarPassword()` de `utils/validaciones.js`.
- [ ] **`admin/MostrarUsuario.jsx`**: datos del usuario y su **historial de compras** en una tabla. Usa `obtenerUsuarioPorId(id)` y `obtenerReservasDeUsuario(email)`.
- [ ] **Tests (mínimo 3)**:
    - `FormularioDestino` muestra un error si el nombre está vacío.
    - `FormularioUsuario` llama a `onGuardar` con los datos cuando todo está bien (usar `vi.fn()`).
    - CRUD de destinos en `db.js`: agregar y eliminar.

## Compañero 2 — Páginas públicas

- [ ] **`tienda/Ofertas.jsx`**: título, texto y `<ListaVuelos vuelos={obtenerVuelosEnOferta()} />`.
- [ ] **`tienda/Destinos.jsx`**: tarjetas de cada destino (copiar las tarjetas `tarjeta-destino` de `Home.jsx`), cada una con link a `/destinos/:id`.
- [ ] **`tienda/DetalleDestino.jsx`**: nombre y descripción del destino + `<ListaVuelos vuelos={obtenerVuelosPorDestino(id)} />`. Usa `useParams()` como en `DetalleVuelo.jsx`.
- [ ] **`tienda/Blog.jsx`**: tarjetas con los artículos de `obtenerBlogs()`, con link a `/blog/:id`.
- [ ] **`tienda/DetalleBlog.jsx`**: el artículo completo con `obtenerBlogPorId(id)`. Escribir el contenido real de los 2 artículos en `src/data/datosIniciales.js`.
- [ ] **`tienda/Contacto.jsx`**: formulario con nombre, correo y mensaje, todos obligatorios, el correo validado y el mensaje con al menos 10 caracteres. Al enviar se muestra "Mensaje enviado" y se limpia el formulario. Copiar la forma de `Registro.jsx`.
- [ ] **Tests (mínimo 3)**:
    - `Contacto` muestra un error si se envía vacío.
    - `Contacto` muestra "Mensaje enviado" con datos válidos.
    - `Ofertas` muestra solo los vuelos que tienen `precioOferta`.

## Jeremias

- [ ] `tienda/MisReservas.jsx`: tabla con las reservas del usuario y botón Cancelar (`cancelarReserva(codigo)`).
- [ ] `admin/Dashboard.jsx`: tarjetas con el total de reservas, vuelos y usuarios, más accesos rápidos.
- [ ] `admin/ReservasAdmin.jsx` y `admin/MostrarReserva.jsx` (boleta).
- [ ] `admin/Reportes.jsx` (ventas por destino) y `admin/Perfil.jsx`.
- [ ] Revisar y unir los Pull Requests.
- [ ] Documento de cobertura, ERS V2 y presentación.
