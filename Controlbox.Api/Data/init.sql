-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS controlbox CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE controlbox;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de libros
CREATE TABLE IF NOT EXISTS Books (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    Summary TEXT,
    Category VARCHAR(100)
);

-- Tabla de reseñas
CREATE TABLE IF NOT EXISTS Reviews (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    BookId INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (BookId) REFERENCES Books(Id) ON DELETE CASCADE
);

-- Datos de ejemplo (opcional)
INSERT INTO Books (Title, Author, Summary, Category) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Una saga familiar mágica en el pueblo de Macondo.', 'Realismo mágico'),
('1984', 'George Orwell', 'Una distopía sobre el control totalitario.', 'Ciencia ficción'),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Un caballero loco y su fiel escudero.', 'Clásico'),
('Rayuela', 'Julio Cortázar', 'Una novela que rompe la estructura tradicional.', 'Experimental');
