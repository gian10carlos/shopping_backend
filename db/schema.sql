-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2024 a las 16:47:07
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `pinoza_store`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `categories`
--
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `categorie` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `descriptionorder`
--
CREATE TABLE `descriptionorder` (
  `id` int(11) NOT NULL,
  `id_history_order` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `historyorder`
--
CREATE TABLE `historyorder` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `dateOrder` datetime DEFAULT NULL,
  `amount` decimal(10, 2) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `products`
--
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `nameproduct` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `imge_path` varchar(255) DEFAULT NULL,
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `user`
--
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `categories`
--
ALTER TABLE
  `categories`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `descriptionorder`
--
ALTER TABLE
  `descriptionorder`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `id_history_order` (`id_history_order`),
ADD
  KEY `id_product` (`id_product`);

--
-- Indices de la tabla `historyorder`
--
ALTER TABLE
  `historyorder`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `user_id` (`user_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE
  `products`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `categorie_id` (`categorie_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE
  `user`
ADD
  PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE
  `categories`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descriptionorder`
--
ALTER TABLE
  `descriptionorder`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historyorder`
--
ALTER TABLE
  `historyorder`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE
  `products`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE
  `user`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `descriptionorder`
--
ALTER TABLE
  `descriptionorder`
ADD
  CONSTRAINT `descriptionorder_ibfk_1` FOREIGN KEY (`id_history_order`) REFERENCES `historyorder` (`id`),
ADD
  CONSTRAINT `descriptionorder_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `historyorder`
--
ALTER TABLE
  `historyorder`
ADD
  CONSTRAINT `historyorder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE
  `products`
ADD
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;