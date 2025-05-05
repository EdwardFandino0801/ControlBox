CREATE DATABASE  IF NOT EXISTS `controlboxdb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `controlboxdb`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: controlboxdb
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `BookId` int NOT NULL,
  `Rating` int NOT NULL,
  `Comment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Reviews_BookId` (`BookId`),
  KEY `IX_Reviews_UserId` (`UserId`),
  CONSTRAINT `FK_Reviews_Books_BookId` FOREIGN KEY (`BookId`) REFERENCES `books` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Reviews_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (3,2,3,5,'El minimalismo explicado de forma práctica y amena. Recomendado.','2025-05-04 23:33:54.000000'),(4,3,4,3,'Buena historia pero el final fue algo predecible.','2025-05-04 23:33:54.000000'),(5,2,5,5,'Ideal para principiantes, explica HTML y CSS claramente.','2025-05-04 23:33:54.000000'),(6,1,6,1,'Divertido y mágico, perfecto para leer con niños. Prueba 123saoaasdasdasd','2025-05-04 23:33:54.000000'),(7,3,7,5,'Muy útil para padres primerizos. Me encantó.','2025-05-04 23:33:54.000000'),(8,1,8,5,'Inspirador, dan ganas de hacer la mochila y salir. ñññññasdjasdasd','2025-05-04 23:33:54.000000'),(9,2,9,4,'Buenas técnicas de escritura, ideal para redes sociales.','2025-05-04 23:33:54.000000'),(10,3,10,4,'Me ayudó a crear mi rutina diaria de yoga en casa.','2025-05-04 23:33:54.000000'),(11,1,11,5,'Clara introducción a Git y GitHub, ideal para estudiantes.','2025-05-04 23:33:54.000000'),(12,2,12,3,'Ideas interesantes, pero esperaba más ejercicios prácticos.','2025-05-04 23:33:54.000000'),(13,1,13,5,'Excelente para mejorar tus habilidades con React.','2025-05-04 23:33:54.000000'),(14,2,14,5,'Muy completo, ideal para scouts y aventureros.','2025-05-04 23:33:54.000000'),(15,3,15,4,'Información muy valiosa sobre diseño UX/UI.','2025-05-04 23:33:54.000000'),(16,2,16,5,'Muy buen enfoque práctico de JavaScript moderno.','2025-05-04 23:33:54.000000'),(17,1,17,4,'Entretenida pero con algunos clichés.','2025-05-04 23:33:54.000000'),(18,3,18,5,'Historias con mucha alma. Recomendado.','2025-05-04 23:33:54.000000'),(19,2,19,4,'Muy útil para entrevistas y liderazgo.','2025-05-04 23:33:54.000000'),(20,1,20,4,'Explica muy bien los fundamentos del vegetarianismo.','2025-05-04 23:33:54.000000'),(21,3,21,5,'Hermosa historia para niños. La amé.','2025-05-04 23:33:54.000000'),(22,2,22,5,'Motivador, ideal para quienes buscan un nuevo comienzo.','2025-05-04 23:33:54.000000'),(23,1,23,4,'Excelente para aprender Vue de forma gradual.','2025-05-04 23:33:54.000000'),(24,3,24,5,'Ilustraciones bellas y mensajes poderosos.','2025-05-04 23:33:54.000000'),(25,2,25,5,'Buena introducción a la ciberseguridad. Conciso.','2025-05-04 23:33:54.000000'),(26,1,26,5,'Cubre muy bien todas las áreas del marketing digital.','2025-05-04 23:33:54.000000'),(27,3,27,4,'Relatos muy creativos y bien escritos.','2025-05-04 23:33:54.000000'),(28,2,28,5,'Perfecto para quienes trabajan de forma independiente.','2025-05-04 23:33:54.000000'),(29,1,29,5,'Laravel explicado claramente con ejemplos útiles.','2025-05-04 23:33:54.000000'),(30,3,30,4,'Trucos prácticos que no conocía, me ayudaron mucho.','2025-05-04 23:33:54.000000'),(31,1,31,5,'Una historia que motiva a cambiar de mentalidad.','2025-05-04 23:33:54.000000'),(32,2,32,4,'Aprendí muchos conceptos nuevos sobre trabajo remoto.','2025-05-04 23:33:54.000000'),(33,3,33,5,'Excelentes consejos para gestionar proyectos personales.','2025-05-04 23:33:54.000000'),(34,1,34,3,'Repetitivo en algunos puntos pero útil.','2025-05-04 23:33:54.000000'),(35,2,35,5,'Me gustó cómo se enfocó en salud y bienestar.','2025-05-04 23:33:54.000000'),(36,3,36,4,'Historias simples pero con impacto.','2025-05-04 23:33:54.000000'),(37,1,37,5,'Perfecto para quienes recién comienzan a leer.','2025-05-04 23:33:54.000000'),(38,2,38,5,'Me reí mucho con estas historias.','2025-05-04 23:33:54.000000'),(39,3,39,4,'Muy buenos ejercicios prácticos para aplicar.','2025-05-04 23:33:54.000000'),(40,1,40,5,'Conceptos técnicos bien explicados.','2025-05-04 23:33:54.000000'),(41,2,41,5,'Lectura ligera pero enriquecedora.','2025-05-04 23:33:54.000000'),(42,3,42,4,'Ideal para descansar de lecturas densas.','2025-05-04 23:33:54.000000'),(43,1,43,5,'Muy inspirador para emprendedores.','2025-05-04 23:33:54.000000'),(44,2,44,3,'Faltó más profundidad en algunos capítulos.','2025-05-04 23:33:54.000000'),(45,3,45,5,'Explicaciones claras y útiles.','2025-05-04 23:33:54.000000'),(46,1,46,4,'Buen libro para tener como referencia.','2025-05-04 23:33:54.000000'),(47,2,47,5,'Historias conmovedoras con finales inesperados.','2025-05-04 23:33:54.000000'),(48,3,48,4,'Muy completo y actualizado.','2025-05-04 23:33:54.000000'),(49,1,49,5,'Uno de los mejores que he leído sobre tecnología.','2025-05-04 23:33:54.000000'),(50,2,50,5,'Ideal para jóvenes desarrolladores.','2025-05-04 23:33:54.000000'),(51,3,51,4,'Buenos fundamentos y bien estructurado.','2025-05-04 23:33:54.000000'),(52,1,52,5,'Lo usé para un proyecto y fue de mucha ayuda.','2025-05-04 23:33:54.000000'),(53,2,53,5,'Explicaciones visuales muy útiles.','2025-05-04 23:33:54.000000'),(54,3,54,5,'Lo terminé en un día, muy entretenido.','2025-05-04 23:33:54.000000'),(55,1,55,4,'Lectura liviana para vacaciones.','2025-05-04 23:33:54.000000'),(56,2,56,5,'Cubre todos los puntos importantes.','2025-05-04 23:33:54.000000'),(57,3,57,4,'Lo usaré como base para mis clases.','2025-05-04 23:33:54.000000'),(58,1,58,5,'Excelentes recomendaciones prácticas.','2025-05-04 23:33:54.000000'),(59,2,59,5,'Uno de mis favoritos este año.','2025-05-04 23:33:54.000000'),(60,3,60,4,'Muy bueno para estudiantes de diseño.','2025-05-04 23:33:54.000000');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-05 16:24:13
