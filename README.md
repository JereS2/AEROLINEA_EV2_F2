# FJF Airlines 

Sitio de reserva de vuelos hecho con **React + Vite + Bootstrap 5** para la Evaluación Parcial 2 de DSY1104 (Desarrollo Fullstack II, Duoc UC).

## Cómo ejecutarlo

```bash
npm install
npm run dev          # abre el sitio en http://localhost:5173
npm run test:run     # corre las pruebas una vez
npm run coverage     # pruebas + reporte de cobertura (carpeta coverage/, mínimo 70 %)
```

Cuentas de prueba:

- Administrador: `admin@fjf.cl` / `admin123`
- Pasajero: `pedro@correo.cl` / `1234`

Pago simulado: cualquier tarjeta de 16 dígitos es aprobada, salvo las que terminan en `0000`, que se rechazan.

## Estructura

```
src/
  data/          datosIniciales.js (datos de ejemplo) y db.js (CRUD en localStorage)
  utils/         validaciones y cálculos de la reserva
  context/       AuthContext (sesión) y ReservaContext (reserva en curso)
  components/    componentes reutilizables (VueloCard, MapaAsientos, LoginForm…)
  pages/tienda/  vistas públicas
  pages/admin/   panel de administración (solo rol admin)
  tests/         pruebas con Vitest y React Testing Library
```

## Tecnologías

- React 19, React Router
- Bootstrap 5 y Bootstrap Icons
- qrcode.react (QR del pase de abordar)
- Vitest, React Testing Library y @vitest/coverage-v8

## Integrantes

- Jeremías Salinas
- Felipe Olguín
- Fernando Pérez
