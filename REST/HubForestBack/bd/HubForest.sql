CREATE DATABASE  IF NOT EXISTS `hubforest` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hubforest`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hubforest
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `analisis`
--

DROP TABLE IF EXISTS `analisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analisis` (
  `idanalisis` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `pmuestra` int DEFAULT NULL,
  `manalisis` int DEFAULT NULL,
  `mmanalisis` int DEFAULT NULL,
  PRIMARY KEY (`idanalisis`),
  KEY `manalisis_idx` (`manalisis`),
  KEY `mmanalisis_idx` (`mmanalisis`),
  KEY `pmuestra_idx` (`pmuestra`),
  CONSTRAINT `manalisis` FOREIGN KEY (`manalisis`) REFERENCES `metodologiaanalisis` (`idmanalisis`),
  CONSTRAINT `mmanalisis` FOREIGN KEY (`mmanalisis`) REFERENCES `metodologiaanalisis` (`idmanalisis`),
  CONSTRAINT `pmuestra` FOREIGN KEY (`pmuestra`) REFERENCES `procesadomuestra` (`idpmuestra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analisis`
--

LOCK TABLES `analisis` WRITE;
/*!40000 ALTER TABLE `analisis` DISABLE KEYS */;
/*!40000 ALTER TABLE `analisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodoalmacenamiento`
--

DROP TABLE IF EXISTS `metodoalmacenamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodoalmacenamiento` (
  `idmalmac` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idmalmac`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodoalmacenamiento`
--

LOCK TABLES `metodoalmacenamiento` WRITE;
/*!40000 ALTER TABLE `metodoalmacenamiento` DISABLE KEYS */;
INSERT INTO `metodoalmacenamiento` VALUES (1,'asf','asdf','asfd');
/*!40000 ALTER TABLE `metodoalmacenamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodologia`
--

DROP TABLE IF EXISTS `metodologia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodologia` (
  `idmetodologia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `fichero` varchar(150) DEFAULT NULL,
  `descripcion` mediumtext,
  PRIMARY KEY (`idmetodologia`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodologia`
--

LOCK TABLES `metodologia` WRITE;
/*!40000 ALTER TABLE `metodologia` DISABLE KEYS */;
INSERT INTO `metodologia` VALUES (3,'sdfg','sdg','sdg');
/*!40000 ALTER TABLE `metodologia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodologiaanalisis`
--

DROP TABLE IF EXISTS `metodologiaanalisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodologiaanalisis` (
  `idmanalisis` int NOT NULL AUTO_INCREMENT,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmanalisis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodologiaanalisis`
--

LOCK TABLES `metodologiaanalisis` WRITE;
/*!40000 ALTER TABLE `metodologiaanalisis` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodologiaanalisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodomuestreo`
--

DROP TABLE IF EXISTS `metodomuestreo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodomuestreo` (
  `idmmuestreo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idmmuestreo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodomuestreo`
--

LOCK TABLES `metodomuestreo` WRITE;
/*!40000 ALTER TABLE `metodomuestreo` DISABLE KEYS */;
INSERT INTO `metodomuestreo` VALUES (1,'asdf','asdf','asdf'),(2,'asdf','asdf','asdf');
/*!40000 ALTER TABLE `metodomuestreo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modificacionmetododemuestreo`
--

DROP TABLE IF EXISTS `modificacionmetododemuestreo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modificacionmetododemuestreo` (
  `idmmmuestreo` int NOT NULL AUTO_INCREMENT,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmmmuestreo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modificacionmetododemuestreo`
--

LOCK TABLES `modificacionmetododemuestreo` WRITE;
/*!40000 ALTER TABLE `modificacionmetododemuestreo` DISABLE KEYS */;
INSERT INTO `modificacionmetododemuestreo` VALUES (1,'asdf','asf',NULL),(2,'asdf','asf',NULL);
/*!40000 ALTER TABLE `modificacionmetododemuestreo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modificacionmetodologiaanalisis`
--

DROP TABLE IF EXISTS `modificacionmetodologiaanalisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modificacionmetodologiaanalisis` (
  `idmmanalisis` int NOT NULL AUTO_INCREMENT,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmmanalisis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modificacionmetodologiaanalisis`
--

LOCK TABLES `modificacionmetodologiaanalisis` WRITE;
/*!40000 ALTER TABLE `modificacionmetodologiaanalisis` DISABLE KEYS */;
/*!40000 ALTER TABLE `modificacionmetodologiaanalisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muestra`
--

DROP TABLE IF EXISTS `muestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muestra` (
  `idmuestra` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `muestreo` int DEFAULT NULL,
  `malmacec` int DEFAULT NULL,
  `mmuestreo` int DEFAULT NULL,
  `mmmuestreo` int DEFAULT NULL,
  PRIMARY KEY (`idmuestra`),
  KEY `muestreo_idx` (`muestreo`),
  KEY `malmac_idx` (`malmacec`),
  KEY `mmuestreo_idx` (`mmuestreo`),
  KEY `mmmuestreo_idx` (`mmmuestreo`),
  CONSTRAINT `malmac` FOREIGN KEY (`malmacec`) REFERENCES `metodoalmacenamiento` (`idmalmac`),
  CONSTRAINT `mmmuestreo` FOREIGN KEY (`mmmuestreo`) REFERENCES `modificacionmetododemuestreo` (`idmmmuestreo`),
  CONSTRAINT `mmuestreo` FOREIGN KEY (`mmuestreo`) REFERENCES `metodomuestreo` (`idmmuestreo`),
  CONSTRAINT `muestreo1` FOREIGN KEY (`muestreo`) REFERENCES `muestreo` (`idmuestreo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muestra`
--

LOCK TABLES `muestra` WRITE;
/*!40000 ALTER TABLE `muestra` DISABLE KEYS */;
INSERT INTO `muestra` VALUES (1,'asfdas',5,1,1,1);
/*!40000 ALTER TABLE `muestra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muestreo`
--

DROP TABLE IF EXISTS `muestreo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muestreo` (
  `idmuestreo` int NOT NULL AUTO_INCREMENT,
  `nombremuestreo` varchar(45) DEFAULT NULL,
  `fichero` varchar(150) DEFAULT NULL,
  `tipoubicacion` int DEFAULT NULL,
  `proyecto` int DEFAULT NULL,
  `metodologia` int DEFAULT NULL,
  PRIMARY KEY (`idmuestreo`),
  KEY `tipoubicacion_idx` (`tipoubicacion`),
  KEY `proyecto_idx` (`proyecto`),
  KEY `metodologia_idx` (`metodologia`),
  CONSTRAINT `metodologia` FOREIGN KEY (`metodologia`) REFERENCES `metodologia` (`idmetodologia`),
  CONSTRAINT `proyecto` FOREIGN KEY (`proyecto`) REFERENCES `proyecto` (`idproyecto`),
  CONSTRAINT `tipoubicacion` FOREIGN KEY (`tipoubicacion`) REFERENCES `tipoubicacion` (`idtipoubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muestreo`
--

LOCK TABLES `muestreo` WRITE;
/*!40000 ALTER TABLE `muestreo` DISABLE KEYS */;
INSERT INTO `muestreo` VALUES (5,'asdf','asfd',1,2,3);
/*!40000 ALTER TABLE `muestreo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muestreorealizado`
--

DROP TABLE IF EXISTS `muestreorealizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muestreorealizado` (
  `idmuestreor` int NOT NULL AUTO_INCREMENT,
  `fechamuestreo` datetime(1) DEFAULT NULL,
  `fichero` varchar(150) DEFAULT NULL,
  `usuario` int DEFAULT NULL,
  `ubicacion` int DEFAULT NULL,
  `muestreo` int DEFAULT NULL,
  PRIMARY KEY (`idmuestreor`),
  KEY `usuario_idx` (`usuario`),
  KEY `ubicacion_idx` (`ubicacion`),
  KEY `muestreo_idx` (`muestreo`),
  CONSTRAINT `muestreo` FOREIGN KEY (`muestreo`) REFERENCES `muestreo` (`idmuestreo`),
  CONSTRAINT `ubicacion` FOREIGN KEY (`ubicacion`) REFERENCES `ubicacion` (`idubicacion`),
  CONSTRAINT `usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muestreorealizado`
--

LOCK TABLES `muestreorealizado` WRITE;
/*!40000 ALTER TABLE `muestreorealizado` DISABLE KEYS */;
/*!40000 ALTER TABLE `muestreorealizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametro`
--

DROP TABLE IF EXISTS `parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametro` (
  `idparametro` int NOT NULL AUTO_INCREMENT,
  `nombreparametro` varchar(45) DEFAULT NULL,
  `analisis` int DEFAULT NULL,
  PRIMARY KEY (`idparametro`),
  KEY `analisis_idx` (`analisis`),
  CONSTRAINT `analisis` FOREIGN KEY (`analisis`) REFERENCES `analisis` (`idanalisis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametro`
--

LOCK TABLES `parametro` WRITE;
/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `idpermisos` int NOT NULL AUTO_INCREMENT,
  `usuario` int DEFAULT NULL,
  `proyecto` int DEFAULT NULL,
  PRIMARY KEY (`idpermisos`),
  KEY `usuario1_idx` (`usuario`),
  CONSTRAINT `proyecto1` FOREIGN KEY (`idpermisos`) REFERENCES `proyecto` (`idproyecto`),
  CONSTRAINT `usuario1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preparacionanalisis`
--

DROP TABLE IF EXISTS `preparacionanalisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preparacionanalisis` (
  `idpanalisis` int NOT NULL AUTO_INCREMENT,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idpanalisis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preparacionanalisis`
--

LOCK TABLES `preparacionanalisis` WRITE;
/*!40000 ALTER TABLE `preparacionanalisis` DISABLE KEYS */;
/*!40000 ALTER TABLE `preparacionanalisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procesadomuestra`
--

DROP TABLE IF EXISTS `procesadomuestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procesadomuestra` (
  `idpmuestra` int NOT NULL AUTO_INCREMENT,
  `descripcion` mediumtext,
  `fichero` varchar(150) DEFAULT NULL,
  `muestra` int DEFAULT NULL,
  `panalisis` int DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idpmuestra`),
  KEY `muestra_idx` (`muestra`),
  KEY `panalisis_idx` (`panalisis`),
  CONSTRAINT `muestra` FOREIGN KEY (`muestra`) REFERENCES `muestra` (`idmuestra`),
  CONSTRAINT `panalisis` FOREIGN KEY (`panalisis`) REFERENCES `preparacionanalisis` (`idpanalisis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procesadomuestra`
--

LOCK TABLES `procesadomuestra` WRITE;
/*!40000 ALTER TABLE `procesadomuestra` DISABLE KEYS */;
/*!40000 ALTER TABLE `procesadomuestra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `idproyecto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `fichero` varchar(150) DEFAULT NULL,
  `descripcion` mediumtext,
  `encargado` int DEFAULT NULL,
  PRIMARY KEY (`idproyecto`),
  KEY `encargado_idx` (`encargado`),
  CONSTRAINT `encargado` FOREIGN KEY (`encargado`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (2,'asdf','asdf','asdf',6);
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoubicacion`
--

DROP TABLE IF EXISTS `tipoubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoubicacion` (
  `idtipoubicacion` int NOT NULL AUTO_INCREMENT,
  `tipoubicacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtipoubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoubicacion`
--

LOCK TABLES `tipoubicacion` WRITE;
/*!40000 ALTER TABLE `tipoubicacion` DISABLE KEYS */;
INSERT INTO `tipoubicacion` VALUES (1,'Bosquesed'),(4,'asdfas');
/*!40000 ALTER TABLE `tipoubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `idubicacion` int NOT NULL AUTO_INCREMENT,
  `latitud` varchar(45) DEFAULT NULL,
  `longitud` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'2','3');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad`
--

DROP TABLE IF EXISTS `unidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad` (
  `idunidad` int NOT NULL AUTO_INCREMENT,
  `nombreunidad` varchar(45) DEFAULT NULL,
  `descripcion` mediumtext,
  `parametro` int DEFAULT NULL,
  PRIMARY KEY (`idunidad`),
  KEY `parametro_idx` (`parametro`),
  CONSTRAINT `parametro` FOREIGN KEY (`parametro`) REFERENCES `parametro` (`idparametro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (6,'asdf@gmail.com','Adios','sdfgfswec','admin'),(7,'asdf@gmail.com','asdfa','7e5bf5436ee5318727c8c7b5ace219a1','admin'),(8,'sdfsf@wei.com','HOLA','sdwefa','admin');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-19 23:24:22
