-- -------------------------------------------------------------
-- TablePlus 5.8.0(526)
--
-- https://tableplus.com/
--
-- Database: carbon_footprint
-- Generation Time: 2024-02-01 14:53:56.9670
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `electricity`;
CREATE TABLE `electricity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `kwh` int DEFAULT NULL,
  `low` int DEFAULT NULL,
  `high` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `natural_gas`;
CREATE TABLE `natural_gas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `month` varchar(255) DEFAULT NULL,
  `therms` int DEFAULT NULL,
  `average_temperature` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `travel`;
CREATE TABLE `travel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `gas` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `water`;
CREATE TABLE `water` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cons` int DEFAULT NULL,
  `date_paid` date DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `electricity` (`id`, `date`, `kwh`, `low`, `high`) VALUES
(1, '2021-01-13', 735, 9, 57),
(2, '2021-02-11', 627, -8, 39),
(3, '2021-03-14', 673, -4, 70),
(4, '2021-04-12', 570, 25, 81),
(5, '2021-05-11', 548, 32, 86),
(6, '2021-06-10', 1020, 37, 91),
(7, '2021-07-12', 777, 54, 91),
(8, '2021-08-10', 600, 61, 93),
(9, '2021-09-09', 713, 57, 95),
(10, '2021-10-10', 587, 50, 88),
(11, '2021-11-08', 510, 30, 77),
(12, '2021-12-09', 603, 12, 61),
(13, '2023-01-13', 666, -8, 57),
(14, '2023-02-13', 662, 0, 52),
(15, '2023-03-14', 575, 18, 57),
(16, '2023-04-12', 493, 12, 79),
(17, '2023-05-11', 541, 30, 86),
(18, '2023-06-12', 531, 45, 90),
(19, '2023-07-12', 458, 48, 91),
(20, '2023-08-10', 576, 63, 91),
(21, '2023-09-11', 584, 55, 100),
(22, '2023-10-10', 480, 45, 88),
(23, '2023-11-08', 516, 28, 82),
(24, '2023-12-11', 581, 16, 66);

INSERT INTO `natural_gas` (`id`, `month`, `therms`, `average_temperature`) VALUES
(1, 'Jan 2021', 61, 30),
(2, 'Feb 2021', 72, 21),
(3, 'Mar 2021', 48, 45),
(4, 'Apr 2021', 16, 52),
(5, 'May 2021', 12, 60),
(6, 'Jun 2021', 9, 75),
(7, 'Jul 2021', 4, 76),
(8, 'Aug 2021', 5, 78),
(9, 'Sep 2021', 5, 71),
(10, 'Oct 2021', 4, 61),
(11, 'Nov 2021', 10, 41),
(12, 'Dec 2021', 47, 40);

INSERT INTO `travel` (`id`, `type`, `date`, `location`, `time`, `gas`) VALUES
(1, 'airplane', '2021-07-23', 'ORD - SFO', '4 hrs 40 min', 2133),
(2, 'airplane', '2021-07-30', 'SFO - PDX', '1 hr 45 min', 644),
(3, 'airplane', '2021-08-04', 'PDX - ORD', '3 hrs 55 min', 2117),
(4, 'airplane', '2021-11-06', 'ORD - ATL', '1 hr 45 min', 739),
(5, 'airplane', '2021-11-15', 'ATL - ORD', '1 hr 55 min', 739),
(6, 'car', '2021-12-31', 'Vineyard', NULL, 248),
(7, 'airplane', '2023-03-18', 'ORD - PHD', NULL, 678),
(8, 'airplane', '2023-04-01', 'PHD - ORD', NULL, 678),
(9, 'airplane', '2023-04-23', 'ORD - NH', NULL, 6275),
(10, 'airplane', '2023-05-04', 'NH - SFO', NULL, 5126),
(11, 'airplane', '2023-05-18', 'ORD - SFO', NULL, 1846),
(12, 'airplane', '2023-05-23', 'SFO - ORD', NULL, 1846),
(13, 'airplane', '2023-05-26', 'ORD - PHD', NULL, 678),
(14, 'airplane', '2023-07-14', 'ORD - YVR', NULL, 1761),
(15, 'airplane', '2023-07-23', 'YVR - ORD', NULL, 1761),
(16, 'airplane', '2023-10-03', 'ORD - IAH', NULL, 925),
(17, 'airplane', '2023-10-05', 'IAH - MEX', NULL, 764),
(18, 'airplane', '2023-10-09', 'MEX - ORD', NULL, 1687),
(19, 'car', '2023-01-27', 'Home - Lyon, MI', NULL, 235),
(20, 'car', '2023-01-29', 'Lyon, MI - Cherry Hill, NJ', NULL, 269),
(21, 'car', '2023-02-11', 'Cherry Hill, NJ - Home', NULL, 782),
(22, 'car', '2023-06-17', 'Home - Kettle Maraine State Forest', NULL, 124),
(23, 'car', '2023-06-19', 'Kettle Maraine State Forest - Home', NULL, 124),
(24, 'car', '2023-09-20', 'Home - Champaign', NULL, 156),
(25, 'car', '2023-09-23', 'Champaign - Home', NULL, 156);

INSERT INTO `water` (`id`, `cons`, `date_paid`, `total`) VALUES
(1, 7, '2020-02-04', 83.72),
(2, 3, '2020-04-03', 35.88),
(3, 4, '2020-06-03', 47.84),
(4, 3, '2020-08-06', 35.88),
(5, 3, '2020-10-04', 35.88),
(6, 2, '2020-12-03', 35.88),
(7, 4, '2021-02-05', 47.84),
(8, 3, '2021-04-16', 35.88),
(9, 3, '2021-06-03', 35.88),
(10, 9, '2021-08-05', 107.64),
(11, 3, '2021-10-08', 35.88),
(12, 5, '2021-12-12', 59.80),
(13, 3, '2022-02-04', 0.00),
(14, 3, '2023-02-25', 36.69),
(15, 7, '2023-04-25', 85.61),
(16, 9, '2023-06-25', 110.07),
(17, 5, '2023-08-25', 61.15),
(18, 3, '2023-10-25', 36.69),
(19, 4, '2023-12-25', 48.92);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;