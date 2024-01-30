-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-01-2024 a las 22:48:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controldb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `changes`
--

CREATE TABLE `changes` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `new_version` int(10) NOT NULL,
  `aproved_by` varchar(100) DEFAULT NULL,
  `claimant` varchar(100) DEFAULT NULL,
  `details` longtext DEFAULT NULL,
  `status` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `changes`
--

INSERT INTO `changes` (`id`, `code`, `reason`, `new_version`, `aproved_by`, `claimant`, `details`, `status`, `created_at`, `updated_at`) VALUES
(60, 'R-IT01', 'Cambio de reglas', 9, 'Isabel Gomez', 'IT', '*Se actualiza el item 3: Es responsable de hacer cumplir este procedimiento la Gerencia de Proyectos y negocios estratégicos. Lo deben conocer el Gerente de mercadeo, Coordinador de innovación y desarrollo de nuevos proyectos y Especialistas de Línea.\n* Se modifica la politica: 5.1	Para seleccionar un proveedor es importante tener presente que no tenga distribuidores exclusivos en algunas zonas del país o en todo el país según el mercado objetivo y que cumpla con los lineamientos establecidos en el SAGRILAFT.\n* Se agrega en las responsabilidades del proceso las del Gerente de proyectos y negocios estrategicos \n* Se agrega la actividad: H-	Enviar el modelo de contrato o acuerdo de distribución para su revisión y aprobación de ambas partes.\n* Se liminan las actividades: I-	Definir acuerdo de distribución entre ambas partes; J-	Revisar y negociar las condiciones contractuales; L-	Firmar el contrato.', 1, '2024-01-30 19:15:44', '2024-01-30 19:15:44'),
(61, 'R-IT01', 'erh', 10, 'thr', 'fgh', '* Se actualiza el objetivo del proceso: Establecer  y poner en marcha el plan estratégico de la organización; dondo cumplimiento a las politicas y objetivos estrategicos garantizando el crecimiento y la permanencia del negocio en el mercado local e internacional.\n* Se cambia el responsable del proceso: Gerente de proyectos y negocios estrategicos.\n* Se incluyen indicadores: * Cumplimiento de la venta por línea \n* Margen de rentabilidad * % Venta internacional \n* % de participación en la venta de nuevos productos y nuevas líenas \n* Se incluye en las actividades de planificación: * Idenficación y definición de nuevos proyectos nacionales e internacionales \n* Se incluye en las responsabilidades del proceso al Gerente de Proyectos y negocios estrategicos \n* Se incluye en las actividades del hacer: * Ejecución de los planes de mercadeo por línea+G668+G673', 1, '2024-01-30 19:16:24', '2024-01-30 19:16:24'),
(62, 'R-IT01', 'WEFW', 11, 'FWEF', 'EFW', '* PUNTO 3: Se hacen cambios en las responsabilidades para incluir a todos los involucrados, incluyendo SST, \n\n* PUNTO 4: Se agrega concepto de proveedor critico para SG-SST\n\n* PUNTO 5:Se definen los criterios para la aplicación de los examenes medicos del personal de Soporte Qx, Freelance y apoyo logistico\n\n* Se definen politicas para el cumplimiento o no de los requisitos de SST\n\n* PUNTO 6: Se incluye la definición del criterio de requisitos SST y los \nexmenes medicos de ingreso para Soporte Qx, Freelance, Apoyo logistico\n\n* PUNTO 7: Etapa 1: se define el alcance de la revisión del cumplimeinto de \nla documentación por parte del Analista SST \netapa 1: punto h: se inlcuye la matriz de requisitos para proveedores y contratistas, sale del proceso el seguimiento de compra de ordenes importadas\n\n* Anexo 1: se ingresan los proveedores criticos que hacian falta \n\n* Anexo 2: es nuevo, se agregan los niveles de riesgos para contratistas ', 1, '2024-01-30 19:56:41', '2024-01-30 19:56:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `typology` int(10) NOT NULL,
  `process` int(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `code` varchar(20) NOT NULL,
  `version` int(10) NOT NULL,
  `last_revision` timestamp NULL DEFAULT NULL,
  `link` longtext DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `status` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documents`
--

INSERT INTO `documents` (`id`, `typology`, `process`, `name`, `code`, `version`, `last_revision`, `link`, `comments`, `status`, `created_at`, `updated_at`) VALUES
(36, 144, 179, 'Registro de it', 'R-IT01', 11, '2024-01-31 00:56:41', 'https://bioartcorp.sharepoint.com/:b:/s/IntranetBioArt/EYy_UiFNrHBKg35NSFfhG2kBilwN-uXFXgS4_k3-6OtJBA?e=kOpgCk', 'Este es un comentario el cual indica que porque se realizo  el cambio', 1, '2024-01-19 20:59:06', '2024-01-30 19:56:41'),
(37, 142, 182, 'Registro de control', 'R-GH03', 4, '2024-01-27 01:47:21', NULL, 'ninguno', 1, '2024-01-22 16:06:11', '2024-01-26 20:47:21'),
(44, 142, 172, 'Nuevo registro', 'R-CA35', 3, '2024-01-29 05:00:00', 'https://getbootstrap.com/docs/5.3/components/popovers/', 'wefwef', 1, '2024-01-22 16:14:09', '2024-01-30 19:26:16'),
(46, 141, 172, 'Logitsica', 'I-LO01', 1, '2024-01-22 21:14:51', NULL, 'ninguna', 1, '2024-01-22 16:14:51', '2024-01-22 16:14:51'),
(49, 143, 172, 'Samsung A14', 'PG-LO31', 2, '2024-01-27 00:19:26', NULL, 'N/A', 1, '2024-01-22 16:18:07', '2024-01-26 19:19:26'),
(50, 142, 174, 'Registro SST', 'R-SST01', 1, '2024-01-24 18:08:22', NULL, 'N/A', 1, '2024-01-24 13:08:22', '2024-01-24 13:08:22'),
(51, 144, 181, 'Gestion humana', 'C-GH01', 2, '2024-01-27 00:19:37', NULL, 'C-GH01	', 1, '2024-01-24 13:11:26', '2024-01-26 19:19:37'),
(53, 144, 174, 'Registro SST', 'PR-SST01', 3, '2024-01-27 00:19:57', 'https://outlook.office.com/mail/', 'Ninguna', 1, '2024-01-24 16:17:52', '2024-01-26 19:19:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `params`
--

CREATE TABLE `params` (
  `id` int(10) NOT NULL,
  `paramtype_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `param_foreign` int(10) UNSIGNED DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `params`
--

INSERT INTO `params` (`id`, `paramtype_id`, `name`, `param_foreign`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 'Activo', 1, 1, '2024-01-16 20:52:42', '2024-01-16 20:52:42'),
(2, 6, 'Inactivo', 1, 1, '2024-01-16 20:52:42', '2024-01-16 20:52:42'),
(100, 1, 'Destrucción', NULL, 1, '2024-01-16 20:53:56', '2024-01-16 20:53:56'),
(101, 1, 'Borrar', NULL, 1, '2024-01-16 20:53:56', '2024-01-16 20:53:56'),
(102, 1, 'Sustitucion nuevo', NULL, 1, '2024-01-16 21:10:55', '2024-01-16 21:10:55'),
(103, 1, 'Archivo historico', NULL, 1, '2024-01-16 21:10:55', '2024-01-16 21:10:55'),
(104, 1, 'N/A', NULL, 1, '2024-01-16 21:12:01', '2024-01-16 21:12:01'),
(105, 1, 'QUEMARLO2', NULL, 2, '2024-01-29 21:46:08', '2024-01-30 14:03:13'),
(106, 1, 'BOTARLO', NULL, 2, '2024-01-29 21:46:32', '2024-01-30 14:03:08'),
(107, 1, 'OTRA ', NULL, 2, '2024-01-29 21:47:35', '2024-01-30 14:01:36'),
(141, 2, 'Estrategico', NULL, 1, '2024-01-16 21:15:33', '2024-01-16 21:15:33'),
(142, 2, 'Manual de funciones', NULL, 1, '2024-01-16 21:15:33', '2024-01-16 21:15:33'),
(143, 2, 'Misional', NULL, 1, '2024-01-16 21:15:33', '2024-01-16 21:15:33'),
(144, 2, 'Apoyo', NULL, 1, '2024-01-16 21:15:33', '2024-01-16 21:15:33'),
(145, 2, 'otra', NULL, 2, '2024-01-30 14:14:35', '2024-01-30 14:14:45'),
(172, 3, 'LOGISTICA', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(173, 3, 'GERENCIAL', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(174, 3, 'proceso', NULL, 2, '2024-01-16 21:22:30', '2024-01-30 14:03:58'),
(175, 3, 'MERCADEO', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(176, 3, 'COMERCIAL', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(177, 3, 'GESTION FINACIERA', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(178, 3, 'GESTION DIRECCION TECNICA', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(179, 3, 'GESTION IT', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(180, 3, 'SERVICIO TECNICO', NULL, 1, '2024-01-16 21:22:30', '2024-01-16 21:22:30'),
(181, 3, 'GESTION HUMANA', NULL, 1, '2024-01-16 21:22:30', '2024-01-18 13:43:35'),
(182, 3, 'GESTION LOGISTICA', NULL, 1, '2024-01-16 21:22:30', '2024-01-18 13:43:59'),
(210, 4, 'R-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:02'),
(211, 4, 'PR-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:06'),
(212, 4, 'C-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:11'),
(213, 4, 'I-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:24'),
(214, 4, 'M-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:27'),
(215, 4, 'MF-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:33'),
(216, 4, 'MT-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:37'),
(217, 4, 'P-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:39'),
(218, 4, 'PO-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:42'),
(219, 4, 'PL-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:47'),
(220, 4, 'PG-', NULL, 1, '2024-01-16 21:28:06', '2024-01-18 13:45:51'),
(310, 5, 'GE', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(311, 5, 'LO', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(312, 5, 'CA', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(313, 5, 'AT', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(314, 5, 'CO', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(315, 5, 'DT', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(316, 5, 'ST', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(317, 5, 'GF', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(318, 5, 'GH', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(319, 5, 'IT', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(320, 5, 'ME', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(321, 5, 'SQ', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(322, 5, 'SST', NULL, 1, '2024-01-16 21:47:52', '2024-01-16 21:47:52'),
(1001, NULL, 'SERVICIO TECNICO', NULL, 1, '2024-01-30 13:27:52', '2024-01-30 13:27:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `param_types`
--

CREATE TABLE `param_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `range_min` int(10) DEFAULT NULL,
  `range_max` int(10) DEFAULT NULL,
  `status` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `param_types`
--

INSERT INTO `param_types` (`id`, `name`, `range_min`, `range_max`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Disposicion final', 100, 130, 1, '2024-01-16 20:48:13', '2024-01-16 20:48:13'),
(2, 'Tipologia', 141, 160, 1, '2024-01-16 20:49:14', '2024-01-16 20:49:14'),
(3, 'Proceso', 172, 200, 1, '2024-01-16 20:49:43', '2024-01-16 20:49:43'),
(4, 'Letra de codigo', 210, 300, 1, '2024-01-16 20:50:29', '2024-01-16 20:50:29'),
(5, 'Iniciales de proceso', 310, 400, 1, '2024-01-16 20:50:53', '2024-01-16 20:50:53'),
(6, 'Estados', 1, 10, 1, '2024-01-16 20:51:48', '2024-01-16 20:51:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `storages`
--

CREATE TABLE `storages` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `responsible` varchar(100) DEFAULT NULL,
  `saved_in` varchar(200) NOT NULL,
  `saved_format` varchar(200) NOT NULL,
  `actived_saved` varchar(45) NOT NULL,
  `inactived_saved` varchar(45) NOT NULL,
  `last_move` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `storages`
--

INSERT INTO `storages` (`id`, `code`, `responsible`, `saved_in`, `saved_format`, `actived_saved`, `inactived_saved`, `last_move`, `status`, `updated_at`, `created_at`) VALUES
(5, 'I-LO01', 'Logistica', 'Carpeta', 'Fisico', '1 año', '2 años', 103, 1, '2024-01-23 15:48:05', '2024-01-22 16:24:31'),
(6, 'R-IT01', 'Coordinar it', 'Intranet', 'digital', '1 año', '2 años', 102, 1, '2024-01-23 15:48:14', '2024-01-22 16:38:56'),
(7, 'R-GH03', 'Gestion humana', 'Digital', 'consecutivo', '1 año', '2 años', 104, 1, '2024-01-23 16:26:56', '2024-01-23 16:26:56'),
(8, 'R-SST01', 'SST', 'Digital', '/folder/here', '1 año', '2 años', 102, 1, '2024-01-24 13:06:51', '2024-01-24 13:06:51'),
(9, 'C-GH01', 'gh', 'fISICO', 'cARPET', '2AÑOS', '4años', 100, 1, '2024-01-24 13:10:45', '2024-01-24 13:10:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `email` varchar(200) NOT NULL,
  `status` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `status`, `created_at`, `updated_at`) VALUES
(3, 'test', '$2b$10$sBeC4q3B.ZsRYFnyEFGkVehqvhJ5zTLMPh8flFa3iJ53GMwIcplfm', 'test@gmail.com', 1, '2024-01-25 13:14:04', '2024-01-25 13:14:04'),
(4, 'test2', '$2b$10$0LxVOChCiy2hc11eXpLqnOLqVaK.Ghnach3cYTChZt.9eT2PHwk0y', 'joan@gmail.com', 1, '2024-01-25 13:20:06', '2024-01-29 16:51:06'),
(5, 'test404', '$2b$10$621eqL2F02qQ.65IJRGZc.DoZ/uzO0Ws3aZuB84pU.kRp9Fpk5H9e', 'test404@gmail.com', 1, '2024-01-29 14:20:08', '2024-01-29 14:20:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `changes`
--
ALTER TABLE `changes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `typology` (`typology`),
  ADD KEY `process` (`process`),
  ADD KEY `status` (`status`);

--
-- Indices de la tabla `params`
--
ALTER TABLE `params`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `paramtype_id` (`paramtype_id`),
  ADD KEY `status` (`status`);

--
-- Indices de la tabla `param_types`
--
ALTER TABLE `param_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `storages`
--
ALTER TABLE `storages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status` (`status`),
  ADD KEY `last_move` (`last_move`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `changes`
--
ALTER TABLE `changes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `param_types`
--
ALTER TABLE `param_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `storages`
--
ALTER TABLE `storages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`status`) REFERENCES `params` (`id`);

--
-- Filtros para la tabla `params`
--
ALTER TABLE `params`
  ADD CONSTRAINT `params_ibfk_1` FOREIGN KEY (`paramtype_id`) REFERENCES `param_types` (`id`),
  ADD CONSTRAINT `params_ibfk_2` FOREIGN KEY (`paramtype_id`) REFERENCES `param_types` (`id`),
  ADD CONSTRAINT `params_ibfk_3` FOREIGN KEY (`status`) REFERENCES `params` (`id`);

--
-- Filtros para la tabla `storages`
--
ALTER TABLE `storages`
  ADD CONSTRAINT `storages_ibfk_2` FOREIGN KEY (`status`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `storages_ibfk_3` FOREIGN KEY (`last_move`) REFERENCES `params` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
