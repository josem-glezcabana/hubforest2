-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-06-2023 a las 15:19:18
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
-- Base de datos: `PsEduca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `field_entity`
--

CREATE TABLE `field_entity` (
  `id_form_entity` int(6) NOT NULL,
  `id_field_entity` int(6) NOT NULL,
  `name_field_entity` varchar(50) NOT NULL,
  `primary_field_entity` enum('SI','NO') NOT NULL,
  `autoincrement_field_entity` enum('SI','NO') NOT NULL,
  `null_field_entity` enum('SI','NO') NOT NULL,
  `type_field_entity` enum('int','string','date','enum') NOT NULL,
  `max_length_field_entity` int(4) NOT NULL,
  `class_field_entity` varchar(60) NOT NULL,
  `on_blur_field_entity` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `field_entity`
--
ALTER TABLE `field_entity`
  ADD PRIMARY KEY (`id_form_entity`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `field_entity`
--
ALTER TABLE `field_entity`
  MODIFY `id_form_entity` int(6) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
