CREATE DATABASE  IF NOT EXISTS `hubforest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
-- Table structure for table `analysis_preparation`
--

DROP TABLE IF EXISTS `analysis_preparation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analysis_preparation` (
  `Id_analysis_preparation` int NOT NULL AUTO_INCREMENT,
  `name_analysis_preparation` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_analysis_preparation`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analysis_preparation`
--

LOCK TABLES `analysis_preparation` WRITE;
/*!40000 ALTER TABLE `analysis_preparation` DISABLE KEYS */;
INSERT INTO `analysis_preparation` VALUES (1,'Preparacion de analisis 1');
/*!40000 ALTER TABLE `analysis_preparation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analysis_technique`
--

DROP TABLE IF EXISTS `analysis_technique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analysis_technique` (
  `id_analysis_technique` int NOT NULL AUTO_INCREMENT,
  `name_analysis_technique` varchar(100) NOT NULL,
  `description_analysis_technique` varchar(5000) NOT NULL,
  `bib_analysis_technique` varchar(200) NOT NULL,
  `file_analysis_tecnique` varchar(100) NOT NULL,
  PRIMARY KEY (`id_analysis_technique`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analysis_technique`
--

LOCK TABLES `analysis_technique` WRITE;
/*!40000 ALTER TABLE `analysis_technique` DISABLE KEYS */;
INSERT INTO `analysis_technique` VALUES (1,'tecnica de analisis 1','ejemplo','bib_tecnica de analisis','file');
/*!40000 ALTER TABLE `analysis_technique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characteristic`
--

DROP TABLE IF EXISTS `characteristic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characteristic` (
  `id_characteristic` int NOT NULL AUTO_INCREMENT,
  `name_characteristic` varchar(100) NOT NULL,
  `description_characteristic` varchar(5000) NOT NULL,
  `data_type_characteristic` enum('number','set') NOT NULL,
  `bibref_characteristic` varchar(200) NOT NULL,
  `file_characteristic` varchar(100) NOT NULL,
  PRIMARY KEY (`id_characteristic`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characteristic`
--

LOCK TABLES `characteristic` WRITE;
/*!40000 ALTER TABLE `characteristic` DISABLE KEYS */;
INSERT INTO `characteristic` VALUES (1,'Caracteristica','descripcion caracteristica','number','bib_ref_caracteristica','fichero');
/*!40000 ALTER TABLE `characteristic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characteristic_sample`
--

DROP TABLE IF EXISTS `characteristic_sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characteristic_sample` (
  `id_characteristic` int NOT NULL,
  `id_unit` int NOT NULL,
  PRIMARY KEY (`id_characteristic`,`id_unit`),
  KEY `unit_idx` (`id_unit`),
  CONSTRAINT `charact` FOREIGN KEY (`id_characteristic`) REFERENCES `characteristic` (`id_characteristic`),
  CONSTRAINT `unit` FOREIGN KEY (`id_unit`) REFERENCES `unit` (`id_unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characteristic_sample`
--

LOCK TABLES `characteristic_sample` WRITE;
/*!40000 ALTER TABLE `characteristic_sample` DISABLE KEYS */;
INSERT INTO `characteristic_sample` VALUES (1,1);
/*!40000 ALTER TABLE `characteristic_sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecosystem`
--

DROP TABLE IF EXISTS `ecosystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecosystem` (
  `id_ecosystem` int NOT NULL AUTO_INCREMENT,
  `name_ecosystem` varchar(50) NOT NULL,
  `description_ecosystem` varchar(5000) DEFAULT '--',
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
-- Table structure for table `lab_process`
--

DROP TABLE IF EXISTS `lab_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lab_process` (
  `id_lab_process` int NOT NULL AUTO_INCREMENT,
  `name_lab_process` varchar(100) NOT NULL,
  `description_lab_process` varchar(5000) NOT NULL,
  `bib_lab_process` varchar(100) NOT NULL,
  `file_lab_process` varchar(100) NOT NULL,
  PRIMARY KEY (`id_lab_process`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_process`
--

LOCK TABLES `lab_process` WRITE;
/*!40000 ALTER TABLE `lab_process` DISABLE KEYS */;
INSERT INTO `lab_process` VALUES (1,'proceso de laboratorio','ejemplo proceso','bib proceso laboratorio','file');
/*!40000 ALTER TABLE `lab_process` ENABLE KEYS */;
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
  `responsable_project` int NOT NULL,
  `organization_project` varchar(100) NOT NULL,
  `description_project` varchar(500) DEFAULT '--',
  `file_project` varchar(100) NOT NULL,
  `code_project` varchar(50) NOT NULL,
  `acronym_project` varchar(15) NOT NULL,
  `id_sampling_methodology` int NOT NULL,
  PRIMARY KEY (`id_project`),
  UNIQUE KEY `code_project_UNIQUE` (`code_project`),
  UNIQUE KEY `acronym_project_UNIQUE` (`acronym_project`),
  KEY `responsable project_idx` (`responsable_project`),
  KEY `id_sampling_methodology` (`id_sampling_methodology`),
  CONSTRAINT `responsable project` FOREIGN KEY (`responsable_project`) REFERENCES `user` (`id_user`),
  CONSTRAINT `sampling_method` FOREIGN KEY (`id_sampling_methodology`) REFERENCES `sampling_methodology` (`id_sampling_methodology`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'proyecto1','2024-04-16','2025-04-16',1,'esei','Proyecto de prueba','files','123ASD','P1',0);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_ecosystem`
--

DROP TABLE IF EXISTS `project_ecosystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_ecosystem` (
  `id_project` int NOT NULL,
  `id_ecosystem` int NOT NULL,
  `number_replicas_by_sampling` int NOT NULL,
  `number_samplings` int DEFAULT '1',
  PRIMARY KEY (`id_project`,`id_ecosystem`),
  KEY `project_idx` (`id_project`),
  KEY `ecosystem_idx` (`id_ecosystem`),
  CONSTRAINT `ecosystem` FOREIGN KEY (`id_ecosystem`) REFERENCES `ecosystem` (`id_ecosystem`),
  CONSTRAINT `project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_ecosystem`
--

LOCK TABLES `project_ecosystem` WRITE;
/*!40000 ALTER TABLE `project_ecosystem` DISABLE KEYS */;
INSERT INTO `project_ecosystem` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `project_ecosystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replica`
--

DROP TABLE IF EXISTS `replica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `replica` (
  `id_project` int NOT NULL,
  `id_ecosystem` int NOT NULL,
  `id_site` int NOT NULL,
  `id_sampling` int NOT NULL,
  `date_sampling` date NOT NULL,
  `id_replica` varchar(30) NOT NULL COMMENT 'country code (ES) number code site (XXX) sequential sampling occurrence (XX) code replica (A,B,C)\r\n ',
  PRIMARY KEY (`id_replica`),
  KEY `id_replica` (`id_replica`),
  KEY `ecos_rep` (`id_ecosystem`),
  KEY `site_rep` (`id_site`),
  KEY `sampl_rep` (`id_sampling`),
  KEY `proj_rep` (`id_project`),
  CONSTRAINT `ecos_rep` FOREIGN KEY (`id_ecosystem`) REFERENCES `sampling` (`id_ecosystem`),
  CONSTRAINT `proj_rep` FOREIGN KEY (`id_project`) REFERENCES `sampling` (`id_project`),
  CONSTRAINT `sampl_rep` FOREIGN KEY (`id_sampling`) REFERENCES `sampling` (`id_sampling`),
  CONSTRAINT `site_rep` FOREIGN KEY (`id_site`) REFERENCES `sampling` (`id_site`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replica`
--

LOCK TABLES `replica` WRITE;
/*!40000 ALTER TABLE `replica` DISABLE KEYS */;
INSERT INTO `replica` VALUES (1,1,1,1,'2024-06-06','AJ270');
/*!40000 ALTER TABLE `replica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sampling`
--

DROP TABLE IF EXISTS `sampling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sampling` (
  `id_project` int NOT NULL,
  `id_ecosystem` int NOT NULL,
  `id_sampling` int NOT NULL AUTO_INCREMENT,
  `id_site` int NOT NULL,
  `date_sampling` date NOT NULL,
  `time_sampling` time NOT NULL,
  `temp_air_sampling` int NOT NULL,
  `collectors_sampling` varchar(500) NOT NULL COMMENT 'Name of collectors separated by ; 	',
  PRIMARY KEY (`id_sampling`),
  KEY `ecosS` (`id_ecosystem`),
  KEY `projectS` (`id_project`) /*!80000 INVISIBLE */,
  KEY `siteS_idx` (`id_site`),
  CONSTRAINT `ecosS` FOREIGN KEY (`id_ecosystem`) REFERENCES `project_ecosystem` (`id_ecosystem`),
  CONSTRAINT `projectS` FOREIGN KEY (`id_project`) REFERENCES `project_ecosystem` (`id_project`),
  CONSTRAINT `siteS` FOREIGN KEY (`id_site`) REFERENCES `site` (`id_site`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sampling`
--

LOCK TABLES `sampling` WRITE;
/*!40000 ALTER TABLE `sampling` DISABLE KEYS */;
INSERT INTO `sampling` VALUES (1,1,1,1,'2024-06-06','10:10:00',20,'colector');
/*!40000 ALTER TABLE `sampling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sampling_methodology`
--

DROP TABLE IF EXISTS `sampling_methodology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sampling_methodology` (
  `id_sampling_methodology` int NOT NULL,
  `name_methodology` varchar(100) NOT NULL,
  `description_methodology` varchar(5000) NOT NULL,
  `bibref_methodology` varchar(200) NOT NULL,
  `file_methodology` varchar(100) NOT NULL,
  PRIMARY KEY (`id_sampling_methodology`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sampling_methodology`
--

LOCK TABLES `sampling_methodology` WRITE;
/*!40000 ALTER TABLE `sampling_methodology` DISABLE KEYS */;
INSERT INTO `sampling_methodology` VALUES (0,'methodology1','methodology1','bibref','file');
/*!40000 ALTER TABLE `sampling_methodology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site`
--

DROP TABLE IF EXISTS `site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site` (
  `id_site` int NOT NULL AUTO_INCREMENT,
  `country_site` varchar(60) NOT NULL,
  `state_province_site` varchar(60) NOT NULL,
  `city_town_site` varchar(60) NOT NULL,
  `geographical_direction1` enum('N','S','E','W') NOT NULL,
  `coordinate1_value_site` decimal(9,7) NOT NULL COMMENT 'first geographical position two int (grade) and seven decimals (minutes)\r\n ',
  `geographical_direction2` enum('N','S','E','W') NOT NULL,
  `coordinate2_value_site` decimal(9,7) NOT NULL COMMENT 'Second geographical position two int (grade) and seven decimals (minutes) 	',
  `owner_site` varchar(100) NOT NULL,
  `slope_form_site` varchar(2) NOT NULL COMMENT 'combines S,V,C,T,X',
  `slope_gradient_site` varchar(2) NOT NULL COMMENT 'values between 01-10',
  `orientation_site` varchar(4) NOT NULL COMMENT 'combination (2 or more elements) of for values N,E,S,W',
  PRIMARY KEY (`id_site`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site`
--

LOCK TABLES `site` WRITE;
/*!40000 ALTER TABLE `site` DISABLE KEYS */;
INSERT INTO `site` VALUES (1,'España','Ourense','Ourense','N',10.2222000,'S',7.2222000,'Estado','NO','NO','N');
/*!40000 ALTER TABLE `site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_method`
--

DROP TABLE IF EXISTS `storage_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_method` (
  `id_storage_method` int NOT NULL,
  `name_storage_method` varchar(100) NOT NULL,
  `description_storage_method` varchar(5000) NOT NULL,
  `storage_container` enum('plastic bag','PVC core','plastic container','document') NOT NULL,
  `size_storage_container` int DEFAULT '0',
  `unit_storage_container` varchar(30) DEFAULT '--',
  PRIMARY KEY (`id_storage_method`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_method`
--

LOCK TABLES `storage_method` WRITE;
/*!40000 ALTER TABLE `storage_method` DISABLE KEYS */;
INSERT INTO `storage_method` VALUES (1,'almacenamiento','ejemplo almacenamiento','plastic bag',0,'--');
/*!40000 ALTER TABLE `storage_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technique_sample`
--

DROP TABLE IF EXISTS `technique_sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technique_sample` (
  `id_technique_sample` int NOT NULL,
  `name_technique_sample` varchar(100) NOT NULL,
  `description_technique_sample` varchar(5000) NOT NULL,
  `bib_technique_sample` varchar(200) NOT NULL,
  `file_technique_sample` varchar(100) NOT NULL,
  PRIMARY KEY (`id_technique_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technique_sample`
--

LOCK TABLES `technique_sample` WRITE;
/*!40000 ALTER TABLE `technique_sample` DISABLE KEYS */;
INSERT INTO `technique_sample` VALUES (1,'tecnica','ejemplo tecnica','bib tecnica','file');
/*!40000 ALTER TABLE `technique_sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporal_sampling_site_params`
--

DROP TABLE IF EXISTS `temporal_sampling_site_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporal_sampling_site_params` (
  `id_ecosystem_param` int NOT NULL AUTO_INCREMENT,
  `id_project` int NOT NULL,
  `id_ecosystem` int NOT NULL,
  `category_param` enum('ecosystem','humus','soil_auger','soil_pit') NOT NULL,
  `name_ecosystem_param` varchar(50) NOT NULL,
  `values_ecosystem_param` varchar(200) DEFAULT '--' COMMENT 'string de valores separados por ;',
  PRIMARY KEY (`id_ecosystem_param`,`id_project`,`id_ecosystem`),
  KEY `ecosystSampSite_idx` (`id_ecosystem`),
  KEY `projectSampSite` (`id_project`),
  CONSTRAINT `ecosystSampSite` FOREIGN KEY (`id_ecosystem`) REFERENCES `project_ecosystem` (`id_ecosystem`),
  CONSTRAINT `projectSampSite` FOREIGN KEY (`id_project`) REFERENCES `project_ecosystem` (`id_project`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporal_sampling_site_params`
--

LOCK TABLES `temporal_sampling_site_params` WRITE;
/*!40000 ALTER TABLE `temporal_sampling_site_params` DISABLE KEYS */;
INSERT INTO `temporal_sampling_site_params` VALUES (1,1,1,'ecosystem','ecosystem_param','--');
/*!40000 ALTER TABLE `temporal_sampling_site_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporal_sampling_site_values`
--

DROP TABLE IF EXISTS `temporal_sampling_site_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporal_sampling_site_values` (
  `id_ecosystem_param` int NOT NULL,
  `id_replica` varchar(30) NOT NULL,
  `id_sampling` int NOT NULL,
  `value_ecosystem_param` varchar(60) NOT NULL,
  PRIMARY KEY (`id_ecosystem_param`,`id_replica`,`id_sampling`),
  KEY `sampling_temp_idx` (`id_sampling`),
  KEY `replica_idx` (`id_replica`),
  CONSTRAINT `ecos_param` FOREIGN KEY (`id_ecosystem_param`) REFERENCES `temporal_sampling_site_params` (`id_ecosystem_param`),
  CONSTRAINT `sampling` FOREIGN KEY (`id_sampling`) REFERENCES `replica` (`id_sampling`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporal_sampling_site_values`
--

LOCK TABLES `temporal_sampling_site_values` WRITE;
/*!40000 ALTER TABLE `temporal_sampling_site_values` DISABLE KEYS */;
INSERT INTO `temporal_sampling_site_values` VALUES (1,'AJ270',1,'20');
/*!40000 ALTER TABLE `temporal_sampling_site_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_in_analysis`
--

DROP TABLE IF EXISTS `token_in_analysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_in_analysis` (
  `id_token_in_analysis` int NOT NULL AUTO_INCREMENT,
  `id_token_in_lab` int NOT NULL,
  `id_analysis_technique` int NOT NULL,
  `id_analysis_preparation` int NOT NULL,
  PRIMARY KEY (`id_token_in_analysis`,`id_token_in_lab`),
  UNIQUE KEY `id_token_in_analysis` (`id_token_in_analysis`),
  KEY `analisis_prep_idx` (`id_analysis_preparation`),
  KEY `analisis_tec_idx` (`id_analysis_technique`),
  KEY `token_in_lab_idx` (`id_token_in_lab`),
  CONSTRAINT `analisis_prep` FOREIGN KEY (`id_analysis_preparation`) REFERENCES `analysis_preparation` (`Id_analysis_preparation`),
  CONSTRAINT `analisis_tec` FOREIGN KEY (`id_analysis_technique`) REFERENCES `analysis_technique` (`id_analysis_technique`),
  CONSTRAINT `token_in_lab` FOREIGN KEY (`id_token_in_lab`) REFERENCES `token_in_lab` (`id_token_in_lab`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_in_analysis`
--

LOCK TABLES `token_in_analysis` WRITE;
/*!40000 ALTER TABLE `token_in_analysis` DISABLE KEYS */;
INSERT INTO `token_in_analysis` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `token_in_analysis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_in_lab`
--

DROP TABLE IF EXISTS `token_in_lab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_in_lab` (
  `id_token_in_lab` int NOT NULL AUTO_INCREMENT,
  `id_token_in_sampling` int NOT NULL,
  `id_lab_process` int NOT NULL,
  PRIMARY KEY (`id_token_in_lab`,`id_token_in_sampling`),
  UNIQUE KEY `id_token_in_lab` (`id_token_in_lab`),
  KEY `lab_process_idx` (`id_lab_process`),
  KEY `token_sampl_idx` (`id_token_in_sampling`),
  CONSTRAINT `lab_process` FOREIGN KEY (`id_lab_process`) REFERENCES `lab_process` (`id_lab_process`),
  CONSTRAINT `token_sampl` FOREIGN KEY (`id_token_in_sampling`) REFERENCES `token_in_sampling` (`id_token_in_sampling`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COMMENT='items processing in lab from token collected in sampling ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_in_lab`
--

LOCK TABLES `token_in_lab` WRITE;
/*!40000 ALTER TABLE `token_in_lab` DISABLE KEYS */;
INSERT INTO `token_in_lab` VALUES (1,1,1);
/*!40000 ALTER TABLE `token_in_lab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_in_sampling`
--

DROP TABLE IF EXISTS `token_in_sampling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_in_sampling` (
  `id_token_in_sampling` int NOT NULL AUTO_INCREMENT,
  `id_project` int NOT NULL,
  `id_ecosystem` int NOT NULL,
  `id_storage_method` int NOT NULL,
  `id_technique_sample` int NOT NULL,
  PRIMARY KEY (`id_token_in_sampling`,`id_project`,`id_ecosystem`),
  UNIQUE KEY `id_token_in_sampling` (`id_token_in_sampling`),
  KEY `project_tok_idx` (`id_project`),
  KEY `ecos_tok_idx` (`id_ecosystem`),
  KEY `storage_meth_idx` (`id_storage_method`),
  CONSTRAINT `ecos_tok` FOREIGN KEY (`id_ecosystem`) REFERENCES `project_ecosystem` (`id_ecosystem`),
  CONSTRAINT `project_tok` FOREIGN KEY (`id_project`) REFERENCES `project_ecosystem` (`id_project`),
  CONSTRAINT `storage_meth` FOREIGN KEY (`id_storage_method`) REFERENCES `storage_method` (`id_storage_method`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_in_sampling`
--

LOCK TABLES `token_in_sampling` WRITE;
/*!40000 ALTER TABLE `token_in_sampling` DISABLE KEYS */;
INSERT INTO `token_in_sampling` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `token_in_sampling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id_unit` int NOT NULL AUTO_INCREMENT,
  `name_unit` varchar(100) DEFAULT '--',
  `description_unit` varchar(5000) DEFAULT '--',
  PRIMARY KEY (`id_unit`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'unidad','ejemplo unidad');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
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
  `organization_user` varchar(100) DEFAULT '--',
  `email_user` varchar(60) DEFAULT '--',
  `file_curr_user` varchar(100) DEFAULT '--',
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
INSERT INTO `user` VALUES (1,'admin','admin','admin','hubforest','admin@email.com',NULL,'21232f297a57a5a743894a0e4a801fc3','SI'),(2,'user','user','user','hubforest','user@email.com',NULL,'ee11cbb19052e40b07aac0ca060c23ee','NO');
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

-- Dump completed on 2024-05-17  6:34:13
