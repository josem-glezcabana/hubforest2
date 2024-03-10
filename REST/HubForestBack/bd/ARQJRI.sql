-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-07-2023 a las 13:12:04
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ARQJRI`
--
DROP DATABASE IF EXISTS `ARQJRI`;
CREATE DATABASE IF NOT EXISTS `ARQJRI` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ARQJRI`;

CREATE USER IF NOT EXISTS 'ARQJRI_user'@'localhost' IDENTIFIED BY 'ARQJRI_password';
GRANT USAGE ON *.* TO `ARQJRI_user`@`localhost` REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `ARQJRI`.* TO `ARQJRI_user`@`localhost` WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

DROP TABLE IF EXISTS `area`;
CREATE TABLE IF NOT EXISTS `area` (
  `id_area` int(6) NOT NULL AUTO_INCREMENT,
  `nombre_area` varchar(60) NOT NULL,
  PRIMARY KEY (`id_area`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre_area`) VALUES
(1, 'Aprendizaje'),
(2, 'Desarrollo'),
(3, 'NEAE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
CREATE TABLE IF NOT EXISTS `etiqueta` (
  `id_etiqueta` int(6) NOT NULL AUTO_INCREMENT,
  `nombre_etiqueta` varchar(60) NOT NULL,
  PRIMARY KEY (`id_etiqueta`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `etiqueta`
--

INSERT INTO `etiqueta` (`id_etiqueta`, `nombre_etiqueta`) VALUES
(1, 'Convivencia escolar'),
(2, 'Inteligencia'),
(3, 'Atención y memoria'),
(4, 'Emociones'),
(5, 'Adaptación y conducta'),
(6, 'Lectura'),
(7, 'Escritura'),
(8, 'Matemáticas'),
(9, 'Comunicación y lenguaje'),
(10, 'TEA'),
(11, 'TDAH'),
(12, 'Creatividad'),
(13, 'Personalidad'),
(14, 'Motivación'),
(15, 'Capacidad sensorio-motriz'),
(16, 'Salud y calidad de vida'),
(17, 'Familia y contexto sociocultural');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `field_entity`
--

DROP TABLE IF EXISTS `field_entity`;
CREATE TABLE IF NOT EXISTS `field_entity` (
  `id_form_entity` int(6) NOT NULL,
  `id_field_entity` int(6) NOT NULL AUTO_INCREMENT,
  `name_field_entity` varchar(50) NOT NULL,
  `primary_field_entity` enum('SI','NO') NOT NULL,
  `autoincrement_field_entity` enum('SI','NO') NOT NULL,
  `null_field_entity` enum('SI','NO') NOT NULL,
  `type_field_entity` enum('int','string','date','enum') NOT NULL,
  `max_length_field_entity` decimal(4,0) NOT NULL,
  `class_field_entity` varchar(60) DEFAULT NULL,
  `on_blur_field_entity` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_field_entity`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `field_entity`
--

INSERT INTO `field_entity` (`id_form_entity`, `id_field_entity`, `name_field_entity`, `primary_field_entity`, `autoincrement_field_entity`, `null_field_entity`, `type_field_entity`, `max_length_field_entity`, `class_field_entity`, `on_blur_field_entity`) VALUES
(1, 1, 'id_etiqueta', 'SI', 'SI', 'NO', 'int', '6', 'none', 'none'),
(1, 2, 'nombre_etiqueta', 'NO', 'NO', 'NO', 'string', '40', 'none', 'none'),
(25, 53, 'id_programa', 'SI', 'SI', 'NO', 'int', '6', '', ''),
(25, 54, 'nombre_programa', 'NO', 'NO', 'NO', 'string', '60', '', ''),
(25, 55, 'acronimo_programa', 'NO', 'NO', 'NO', 'string', '20', '', ''),
(25, 56, 'nombre_original_programa', 'NO', 'NO', 'NO', 'string', '60', '', ''),
(25, 57, 'autor_programa', 'NO', 'NO', 'NO', 'string', '50', '', ''),
(25, 58, 'autor_original_programa', 'NO', 'NO', 'NO', 'string', '50', '', ''),
(25, 59, 'ano_programa', 'NO', 'NO', 'NO', 'int', '4', '', ''),
(25, 60, 'ano_original_programa', 'NO', 'NO', 'NO', 'int', '4', '', ''),
(25, 61, 'requistos_programa', 'NO', 'NO', 'NO', 'string', '300', '', ''),
(25, 62, 'poblacion_desde_programa', 'NO', 'NO', 'NO', 'int', '2', '', ''),
(25, 63, 'poblacion_hasta_programa', 'NO', 'NO', 'NO', 'int', '2', '', ''),
(25, 64, 'unidad_poblacion', 'NO', 'NO', 'NO', 'enum', '0', '', ''),
(25, 65, 'tipo_programa', 'NO', 'NO', 'NO', 'enum', '0', '', ''),
(25, 66, 'tiempo_aplicacion_programa', 'NO', 'NO', 'NO', 'int', '4', '', ''),
(25, 67, 'descrip_interp_programa', 'NO', 'NO', 'NO', 'string', '1000', '', ''),
(25, 68, 'fichero_programa', 'NO', 'NO', 'NO', 'string', '60', '', ''),
(25, 69, 'enlace_programa', 'NO', 'NO', 'NO', 'string', '100', '', ''),
(25, 70, 'formato_programa', 'NO', 'NO', 'NO', 'enum', '0', '', ''),
(25, 71, 'modo_correccion_programa', 'NO', 'NO', 'NO', 'enum', '0', '', ''),
(25, 72, 'modo_aplicacion_programa', 'NO', 'NO', 'NO', 'enum', '0', '', ''),
(25, 73, 'imagen_programa', 'NO', 'NO', 'NO', 'string', '60', '', ''),
(29, 74, 'id_area', 'SI', 'SI', 'NO', 'int', '6', '', ''),
(29, 75, 'nombre_area', 'NO', 'NO', 'NO', 'string', '60', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `form_entity`
--

DROP TABLE IF EXISTS `form_entity`;
CREATE TABLE IF NOT EXISTS `form_entity` (
  `id_form_entity` int(6) NOT NULL AUTO_INCREMENT,
  `name_entity` varchar(40) NOT NULL,
  PRIMARY KEY (`id_form_entity`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `form_entity`
--

INSERT INTO `form_entity` (`id_form_entity`, `name_entity`) VALUES
(1, 'etiqueta'),
(25, 'programa'),
(29, 'area'),
(30, 'area');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa`
--

DROP TABLE IF EXISTS `programa`;
CREATE TABLE IF NOT EXISTS `programa` (
  `id_programa` int(6) NOT NULL AUTO_INCREMENT,
  `nombre_programa` varchar(60) NOT NULL,
  `acronimo_programa` varchar(20) NOT NULL,
  `nombre_original_programa` varchar(60) NOT NULL,
  `autor_programa` varchar(50) NOT NULL,
  `autor_original_programa` varchar(50) NOT NULL,
  `ano_programa` int(4) NOT NULL,
  `ano_original_programa` int(4) NOT NULL,
  `requistos_programa` varchar(300) NOT NULL,
  `poblacion_desde_programa` int(2) NOT NULL,
  `poblacion_hasta_programa` int(2) NOT NULL,
  `unidad_poblacion` enum('MESES','AÑOS') NOT NULL,
  `tipo_programa` enum('EVALUACIÓN','INTERVENCIÓN','EVALUACIÓN E INTERVENCIÓN') NOT NULL,
  `tiempo_aplicacion_programa` int(4) NOT NULL COMMENT 'tiempo de aplicación de programa en min',
  `descrip_interp_programa` varchar(5000) NOT NULL COMMENT 'descripcion e interpretación del programa',
  `fichero_programa` varchar(60) NOT NULL,
  `enlace_programa` varchar(100) NOT NULL,
  `formato_programa` enum('PAPEL','ELECTRÓNICO','PAPEL Y ELECTRÓNICO') NOT NULL,
  `modo_correccion_programa` enum('PAPEL','ELECTRÓNICO','PAPEL Y ELECTRÓNICO') NOT NULL,
  `modo_aplicacion_programa` enum('INDIVIDUAL','COLECTIVO','INDIVIDUAL Y COLECTIVO') NOT NULL,
  `imagen_programa` varchar(60) NOT NULL,
  PRIMARY KEY (`id_programa`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programa`
--

INSERT INTO `programa` (`id_programa`, `nombre_programa`, `acronimo_programa`, `nombre_original_programa`, `autor_programa`, `autor_original_programa`, `ano_programa`, `ano_original_programa`, `requistos_programa`, `poblacion_desde_programa`, `poblacion_hasta_programa`, `unidad_poblacion`, `tipo_programa`, `tiempo_aplicacion_programa`, `descrip_interp_programa`, `fichero_programa`, `enlace_programa`, `formato_programa`, `modo_correccion_programa`, `modo_aplicacion_programa`, `imagen_programa`) VALUES
(1, 'Ciberbullying. Screenning de acoso entre iguales', 'SINACRONIMO', 'OCULTABLE', 'Garaigordobil, M.', 'OCULTABLE', 2013, 0, 'OCULTABLE', 10, 18, 'AÑOS', 'EVALUACIÓN', 20, 'Cyberbullying es un instrumento diseñado para realizar un screening rápido de la presencia de acoso escolar o violencia entre iguales en sus versiones presencial o tradicional (bullying) y tecnológica (cyberbullying). El adolescente debe indicar si durante el último año ha sufrido violencia por parte de sus compañeros, si la ha ejercido sobre otros o si la ha observado. Ello permite alertar sobre posibles problemas de Victimización, Agresión, Observación y Victimización agresiva del evaluado, así como conocer sus reacciones subjetivas como consecuencia de los mismos.', 'RECURSO?', 'https://web.teaediciones.com/Cyberbullying-Screening-de-acoso-entre-iguales.aspx', 'PAPEL', 'PAPEL', 'INDIVIDUAL Y COLECTIVO', 'IMAGEN'),
(2, 'q', 'q', 'q', 'q', 'q', 2023, 2000, 'q', 0, 0, 'MESES', 'EVALUACIÓN', 0, 'qaaa', 'Arquitectura.jpg', 'q', 'PAPEL', 'PAPEL', 'INDIVIDUAL', 'javi.jpg'),
(9, '1', '1', '1', '1', '1', 1, 1, '1', 1, 1, 'MESES', 'EVALUACIÓN', 1, '1', '1', '1', 'PAPEL', 'PAPEL', 'INDIVIDUAL', '1'),
(10, 'Sistema de Evaluación Cognitiva', 'DN-CAS', 'Das-Naglieri cognitive assessment system', 'Deaño, M.', 'Naglieri, J. A; Das, J. P.', 2013, 1997, 'formación psicológica o psicopedagógica', 5, 17, 'AÑOS', 'EVALUACIÓN', 60, 'El Das.Naglieri: Sistema de Evaluación Cognitiva es la adaptación española de la Batería Das.Naglieri: Cognitive Assessment System. Contituye un enfoque de evaluación, un instrumento diagnóstico y de selección de enfoques de intervención. Entiende la inteligencia como un grupo de procesos esenciales del funcionamiento cognitivo humano: planificación que proporciona control ejecutivo, uso de procesos y conocimiento, intencionalidad y autorregulación para actuar conforme a un objetivo; atención que proporciona actividad mental sostenida y selectiva; simultáneo y sucesivo proporcionan modos de operar sobre la información. Es un instrumento de diagnóstico del funcionamiento cognitivo, de sus fortalezas y debilidades y de clasificación: permite determinar la competencia individual normativa e ipsativa y las relaciones entre las puntuaciones PASS-logro; permite la clasificación (dificultades de aprendizaje, déficits de atención, discapacidad intelectual, sobredotación, lesión cerebral taumática, perturbación emocional, etc.). Es un sistema para el diseño del tipo de ayuda educativa basada en los procesos PASS; sus resultados pueden aumentar las posibilidades de una mejora eficaz., constituyen el punto de partida para determinar las relaciones entre las puntuaciones CAS, la instrucción y la selección de enfoques de intervención.', 'recurso', 'https://libreriaites.com/7279-dn-cas-juego-completo.html', 'PAPEL', 'PAPEL', 'INDIVIDUAL Y COLECTIVO', 'imagen'),
(21, '4', '4', '4', '4', '4', 4, 4, '4', 4, 4, 'MESES', 'EVALUACIÓN', 4, '4', 'Arquitectura.jpg', '4', 'PAPEL', 'PAPEL', 'INDIVIDUAL', 'javi.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_area`
--

DROP TABLE IF EXISTS `programa_area`;
CREATE TABLE IF NOT EXISTS `programa_area` (
  `id_programa` int(6) NOT NULL,
  `id_area` int(6) NOT NULL,
  PRIMARY KEY (`id_programa`,`id_area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programa_area`
--

INSERT INTO `programa_area` (`id_programa`, `id_area`) VALUES
(21, 1),
(21, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_etiqueta`
--

DROP TABLE IF EXISTS `programa_etiqueta`;
CREATE TABLE IF NOT EXISTS `programa_etiqueta` (
  `id_programa` int(6) NOT NULL,
  `id_etiqueta` int(6) NOT NULL,
  PRIMARY KEY (`id_programa`,`id_etiqueta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programa_etiqueta`
--

INSERT INTO `programa_etiqueta` (`id_programa`, `id_etiqueta`) VALUES
(21, 1),
(21, 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
