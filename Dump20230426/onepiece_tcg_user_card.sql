-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: onepiece_tcg
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `user_card`
--

DROP TABLE IF EXISTS `user_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_card` (
  `card_id` bigint NOT NULL,
  `details_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`card_id`,`details_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_card`
--

LOCK TABLES `user_card` WRITE;
/*!40000 ALTER TABLE `user_card` DISABLE KEYS */;
INSERT INTO `user_card` VALUES (5,2,3,1),(7,2,3,1),(9,2,3,1),(10,2,3,4),(11,2,3,2),(14,2,3,1),(17,2,3,4),(18,2,3,4),(23,2,3,4),(25,2,3,2),(34,2,3,1),(60,2,3,1),(61,2,3,1),(91,2,3,1),(100,2,3,1),(101,2,3,1),(203,2,3,3),(204,2,3,3),(209,2,3,3),(210,2,3,3),(219,2,3,1),(221,2,3,3),(222,2,3,2),(229,2,3,2),(230,2,3,3),(235,2,3,4),(236,2,3,1),(239,2,3,2),(240,2,3,3),(243,2,3,3),(245,2,3,4),(404,2,3,4),(410,2,3,2),(414,2,3,1),(416,2,3,1),(419,2,3,4),(422,2,3,4),(424,2,3,2),(428,2,3,2),(437,2,3,2),(449,2,3,3),(501,2,3,2);
/*!40000 ALTER TABLE `user_card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-26 10:40:57
