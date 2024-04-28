CREATE DATABASE  IF NOT EXISTS `hubforest` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
-- Table structure for table `ecosystem`
--

DROP TABLE IF EXISTS `ecosystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecosystem` (
  `id_ecosystem` int NOT NULL AUTO_INCREMENT,
  `name_ecosystem` varchar(50) NOT NULL,
  `description_ecosystem` varchar(5000) DEFAULT NULL,
  `bib_ref_ecosystem` varchar(200) NOT NULL,
  PRIMARY KEY (`id_ecosystem`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecosystem`
--

LOCK TABLES `ecosystem` WRITE;
/*!40000 ALTER TABLE `ecosystem` DISABLE KEYS */;
INSERT INTO `ecosystem` VALUES (1,'Ecosistema1','Ecosistema de ejemplo','bib_ref_ecosystem');
/*!40000 ALTER TABLE `ecosystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id_project` int NOT NULL AUTO_INCREMENT,
  `name_project` varchar(100) NOT NULL,
  `start_date_project` date NOT NULL,
  `end_date_project` date NOT NULL,
  `responsable_project` int DEFAULT NULL,
  `organization_project` varchar(100) NOT NULL,
  `description_project` varchar(500) DEFAULT NULL,
  `file_project` varchar(100) DEFAULT NULL,
  `code_project` varchar(50) NOT NULL,
  `acronym_project` varchar(15) NOT NULL,
  PRIMARY KEY (`id_project`),
  UNIQUE KEY `code_project_UNIQUE` (`code_project`),
  UNIQUE KEY `acronym_project_UNIQUE` (`acronym_project`),
  KEY `responsable project_idx` (`responsable_project`),
  CONSTRAINT `responsable project` FOREIGN KEY (`responsable_project`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'proyecto1','2024-04-16','2025-04-16',1,'esei','Proyecto de prueba','files','123ASD','P1');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site`
--

DROP TABLE IF EXISTS `site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site` (
  `id_site` int NOT NULL AUTO_INCREMENT,
  `id_project` int NOT NULL,
  `id_ecosystem` int NOT NULL,
  `coorN_site` varchar(45) NOT NULL,
  `coorW_site` varchar(45) NOT NULL,
  `slope_site` varchar(45) NOT NULL,
  `orientation_site` varchar(45) NOT NULL,
  PRIMARY KEY (`id_site`),
  KEY `idProject_idx` (`id_project`),
  KEY `idEcosystem_idx` (`id_ecosystem`),
  CONSTRAINT `idEcosystem` FOREIGN KEY (`id_ecosystem`) REFERENCES `ecosystem` (`id_ecosystem`),
  CONSTRAINT `idProject` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site`
--

LOCK TABLES `site` WRITE;
/*!40000 ALTER TABLE `site` DISABLE KEYS */;
INSERT INTO `site` VALUES (1,1,1,'-4.1222','-6.2547','10','N');
/*!40000 ALTER TABLE `site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name_user` varchar(60) NOT NULL,
  `surname_user` varchar(60) NOT NULL,
  `position_user` varchar(60) NOT NULL,
  `organization_user` varchar(100) DEFAULT NULL,
  `email_user` varchar(60) DEFAULT NULL,
  `file_curr_user` varchar(100) DEFAULT NULL,
  `passwd` varchar(48) NOT NULL,
  `is_admin` varchar(10) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_user_UNIQUE` (`email_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','admin','hubforest','admin@email.com',NULL,'admin','SI'),(2,'user','user','user','hubforest','user@email.com',NULL,'user','NO');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_project` (
  `id_user` int NOT NULL,
  `id_project` int NOT NULL,
  `rol` varchar(5) NOT NULL,
  `date_user_project` date NOT NULL,
  PRIMARY KEY (`id_user`,`id_project`,`rol`),
  KEY `id_project_idx` (`id_project`),
  CONSTRAINT `id_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
INSERT INTO `user_project` VALUES (1,1,'dir','2024-04-16');
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 21:50:19
