# 🧸 Juguetería - Tienda Online

Una aplicación web moderna desarrollada en Angular para una juguetería, con funcionalidades completas de e-commerce.

## 🚀 Características

- **Catálogo completo** de juguetes organizados por categorías y subcategorías
- **Sistema de búsqueda** avanzado por nombre, marca o tipo
- **Carrito de compras** funcional con gestión de cantidades
- **Página de ofertas** con productos en descuento
- **Información de marcas** con logos y descripciones
- **Formulario de contacto** con validaciones
- **Diseño responsivo** optimizado para móviles y desktop
- **Accesibilidad** implementada con ARIA labels

## 🛠️ Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **Bootstrap 5** - Framework CSS para el diseño
- **TypeScript** - Lenguaje de programación
- **RxJS** - Manejo de observables y estado
- **Angular Router** - Navegación entre páginas

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd final
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
ng serve
```

4. **Abrir en el navegador:**
```
http://localhost:4200
```

## 🏗️ Estructura del Proyecto

```
src/app/
├── acerca/                 # Página "Acerca de"
├── contacto/              # Página de contacto
├── inicio/                # Página principal con catálogo
├── productos/             # Detalle de productos
├── services.ts           # Servicios (carrito, búsqueda, etc.)
├── app.ts                # Componente principal con navegación
├── app.routes.ts         # Configuración de rutas
├── ofertas.component.ts  # Página de ofertas
├── marcas.component.ts   # Página de marcas
└── carrito.component.ts  # Carrito de compras
```

## 🎯 Funcionalidades Principales

### Catálogo de Productos
- Más de 200 productos organizados en 17 categorías principales
- Filtrado por subcategorías específicas
- Imágenes de alta calidad con lazy loading
- Información detallada de cada producto

### Sistema de Búsqueda
- Búsqueda en tiempo real
- Filtrado por nombre, marca o categoría
- Resultados con contador de productos encontrados
- Navegación fácil entre resultados

### Carrito de Compras
- Agregar/remover productos
- Modificar cantidades
- Cálculo automático de totales
- Envío gratis sobre $5000
- Persistencia de datos durante la sesión

### Navegación
- Menú desplegable con categorías y subcategorías
- Navegación responsive
- Breadcrumbs para mejor UX
- Icono de carrito con contador

## 🎨 Diseño y UX

- **Paleta de colores** vibrante y atractiva para niños
- **Animaciones suaves** para mejorar la experiencia
- **Iconos intuitivos** de Bootstrap Icons
- **Tipografía legible** con Inter font
- **Espaciado consistente** siguiendo principios de diseño

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints** optimizados para todos los dispositivos
- **Navegación adaptativa** con menú hamburguesa
- **Imágenes responsivas** con aspect ratio mantenido

## ♿ Accesibilidad

- **ARIA labels** en todos los elementos interactivos
- **Navegación por teclado** completamente funcional
- **Contraste de colores** adecuado
- **Textos alternativos** en todas las imágenes
- **Estructura semántica** correcta

## 🚀 Scripts Disponibles

```bash
# Servidor de desarrollo
npm start
ng serve

# Construcción para producción
npm run build
ng build

# Ejecutar tests
npm test
ng test

# Linting
ng lint
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para consultas sobre el proyecto:
- Email: pueblasa08@gmail.com

---

**Desarrollado con ❤️ para hacer felices a los niños**
