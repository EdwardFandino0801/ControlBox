# 📚 Controlbox - Aplicación de Reseñas de Libros

Controlbox es una aplicación web donde los usuarios pueden explorar libros, registrarse, iniciar sesión y dejar reseñas con calificaciones y comentarios.

## 📦 Tecnologías utilizadas

### Backend (.NET 8 + MySQL)
- ASP.NET Core Web API
- Entity Framework Core
- MySQL
- JWT para autenticación

### Frontend (React + Tailwind)
- React con Vite
- Context API
- Axios
- TailwindCSS
- Shadcn/UI

---

## 🛠️ Requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/)
- [Vite](https://vitejs.dev/)
- (Opcional) Docker

---

## ⚙️ Instalación local

### 🔧 Clona el repositorio

```bash
git clone https://github.com/EdwardFandino0801/ControlBox.git
cd controlbox

### 🔧 correr el Backend (.NET)
cd Controlbox.Api
dotnet restore
dotnet build
dotnet run
El backend estará corriendo en http://localhost:5008
En la ruta \Controlbox.Api\Data esta un archivo init.sql donde estan las consultas para crer la base de datos en MYSQL (Workbench) Tambien estan los archivos .sql de las tablas donde se ven ejemplos reales para hacer pruebas

### 🔧 correr el Frontend (React)
cd controlbox-frontend
npm install
npm run dev
El frontend estará disponible en http://localhost:5173