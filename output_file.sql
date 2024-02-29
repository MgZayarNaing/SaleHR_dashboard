-- MySQL dump 10.13  Distrib 8.1.0, for macos12.6 (x86_64)
--
-- Host: localhost    Database: laravel_pos
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'drink','ACTIVE','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(2,'food','ACTIVE','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Prof. Dasia Gutmann III','7226 Virginia Highway\nSouth Fay, OK 11768','386-950-0518','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(2,'Jaeden Braun II','9976 Adam Mill Apt. 399\nHirthebury, CO 72983','(769) 200-1971','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(3,'Molly Thiel','570 Ford Trace\nAlizestad, UT 34866-2869','1-304-755-5637','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `subtotal` int unsigned NOT NULL,
  `tax` int unsigned DEFAULT NULL,
  `discount` int unsigned DEFAULT NULL,
  `total` int unsigned NOT NULL,
  `payment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `charge` int unsigned NOT NULL,
  `refund` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices_customer_id_foreign` (`customer_id`),
  KEY `invoices_order_id_foreign` (`order_id`),
  CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'9aa0114c-fb35-432d-a702-a00f8145562d',1,1,5000,0,0,5000,'cash',5000,0,'2023-11-16 08:19:17','2023-11-16 08:19:17',NULL);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_10_19_074226_create_categories_table',1),(6,'2023_10_19_101909_create_products_table',1),(7,'2023_10_20_063507_create_shops_table',1),(8,'2023_10_20_091121_create_table_numbers_table',1),(9,'2023_10_20_103839_create_orders_table',1),(10,'2023_10_20_165135_create_order_items_table',1),(11,'2023_10_21_075819_create_customers_table',1),(12,'2023_10_24_085907_create_invoices_table',1),(13,'2023_10_28_071212_create_permission_tables',1),(14,'2023_10_29_074358_add_description_to_roles',1),(15,'2023_11_08_133111_create_printers_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (3,'App\\Models\\User',1),(2,'App\\Models\\User',2),(1,'App\\Models\\User',11),(3,'App\\Models\\User',12),(2,'App\\Models\\User',13);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `qty` int unsigned NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SELECTED',
  `total_price` int unsigned NOT NULL,
  `profit` int unsigned NOT NULL,
  `ordered_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_user_id_foreign` (`user_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,2,'ORDERED',2000,200,'2023-11-16 14:49:17','2023-11-16 08:19:17','2023-11-16 08:44:52'),(2,1,11,2,15,'ORDERED',2000,200,'2023-11-16 14:50:43','2023-11-16 08:20:43','2023-11-16 08:44:52'),(3,1,11,1,3,'ORDERED',3600,1500,'2023-11-16 15:14:50','2023-11-16 08:44:50','2023-11-16 08:44:52');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `table_number_id` bigint unsigned NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `guest` int unsigned NOT NULL DEFAULT '1',
  `checkin` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_table_number_id_foreign` (`table_number_id`),
  CONSTRAINT `orders_table_number_id_foreign` FOREIGN KEY (`table_number_id`) REFERENCES `table_numbers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'PENDING',4,'2023-11-16 14:49:16','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'AUTH_UPDATE','api',NULL,NULL),(2,'ROLE_INDEX','api',NULL,NULL),(3,'ROLE_SHOW','api',NULL,NULL),(4,'ROLE_STORE','api',NULL,NULL),(5,'ROLE_UPDATE','api',NULL,NULL),(6,'ROLE_DESTROY','api',NULL,NULL),(7,'PERMISSION_INDEX','api',NULL,NULL),(8,'PERMISSION_SHOW','api',NULL,NULL),(9,'USER_INDEX','api',NULL,NULL),(10,'USER_SHOW','api',NULL,NULL),(11,'USER_STORE','api',NULL,NULL),(12,'USER_UPDATE','api',NULL,NULL),(13,'USER_DESTROY','api',NULL,NULL),(14,'SHOP_INDEX','api',NULL,NULL),(15,'SHOP_SHOW','api',NULL,NULL),(16,'SHOP_STORE','api',NULL,NULL),(17,'SHOP_UPDATE','api',NULL,NULL),(18,'SHOP_DESTROY','api',NULL,NULL),(19,'CATEGORY_INDEX','api',NULL,NULL),(20,'CATEGORY_SHOW','api',NULL,NULL),(21,'CATEGORY_STORE','api',NULL,NULL),(22,'CATEGORY_UPDATE','api',NULL,NULL),(23,'CATEGORY_DESTROY','api',NULL,NULL),(24,'PRODUCT_INDEX','api',NULL,NULL),(25,'PRODUCT_SHOW','api',NULL,NULL),(26,'PRODUCT_STORE','api',NULL,NULL),(27,'PRODUCT_UPDATE','api',NULL,NULL),(28,'PRODUCT_DESTROY','api',NULL,NULL),(29,'TABLE_NUMBER_INDEX','api',NULL,NULL),(30,'TABLE_NUMBER_SHOW','api',NULL,NULL),(31,'TABLE_NUMBER_STORE','api',NULL,NULL),(32,'TABLE_NUMBER_UPDATE','api',NULL,NULL),(33,'TABLE_NUMBER_DESTROY','api',NULL,NULL),(34,'ORDER_INDEX','api',NULL,NULL),(35,'ORDER_SHOW','api',NULL,NULL),(36,'ORDER_STORE','api',NULL,NULL),(37,'ORDER_UPDATE','api',NULL,NULL),(38,'ORDER_DESTROY','api',NULL,NULL),(39,'ORDER_ITEM_INDEX','api',NULL,NULL),(40,'ORDER_ITEM_SHOW','api',NULL,NULL),(41,'ORDER_ITEM_STORE','api',NULL,NULL),(42,'ORDER_ITEM_UPDATE','api',NULL,NULL),(43,'ORDER_ITEM_DESTROY','api',NULL,NULL),(44,'CUSTOMER_INDEX','api',NULL,NULL),(45,'CUSTOMER_SHOW','api',NULL,NULL),(46,'CUSTOMER_STORE','api',NULL,NULL),(47,'CUSTOMER_UPDATE','api',NULL,NULL),(48,'CUSTOMER_DESTROY','api',NULL,NULL),(49,'INVOICE_INDEX','api',NULL,NULL),(50,'INVOICE_SHOW','api',NULL,NULL),(51,'INVOICE_STORE','api',NULL,NULL),(52,'INVOICE_UPDATE','api',NULL,NULL),(53,'INVOICE_DESTROY','api',NULL,NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printers`
--

DROP TABLE IF EXISTS `printers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kitchen_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bar_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printers`
--

LOCK TABLES `printers` WRITE;
/*!40000 ALTER TABLE `printers` DISABLE KEYS */;
INSERT INTO `printers` VALUES (1,'192.168.1.100','192.168.1.100','192.168.1.100','2023-11-16 08:19:17','2023-11-16 08:19:17');
/*!40000 ALTER TABLE `printers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int unsigned NOT NULL,
  `original_price` int unsigned NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `qty` int unsigned DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'tea','https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',1200,700,'ACTIVE',17,1,'2023-11-16 08:19:16','2023-11-16 08:44:52',NULL),(2,'cola','https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',1200,700,'ACTIVE',5,1,'2023-11-16 08:19:16','2023-11-16 08:44:52',NULL),(3,'cocktail','https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',1200,700,'ACTIVE',20,1,'2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(4,'soda','https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',1200,700,'ACTIVE',20,1,'2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(5,'beer','https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',1200,700,'ACTIVE',20,1,'2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(6,'rice','https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',1200,700,'ACTIVE',NULL,2,'2023-11-16 08:19:16','2023-11-16 08:19:16',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(41,1),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(48,1),(49,1),(50,1),(51,1),(52,1),(53,1),(9,2),(11,2),(29,3),(34,3),(36,3),(37,3);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'SUPER_ADMIN','api',NULL,'2023-11-16 08:19:16','2023-11-16 08:19:16'),(2,'MANAGER','api',NULL,'2023-11-16 08:19:16','2023-11-16 08:19:16'),(3,'WAITER','api',NULL,'2023-11-16 08:19:16','2023-11-16 08:19:16');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shops`
--

DROP TABLE IF EXISTS `shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shops` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shops`
--

LOCK TABLES `shops` WRITE;
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
INSERT INTO `shops` VALUES (1,'teashop','198 Wiza Grove Suite 720\nMcDermottland, KS 06897','(520) 630-7955','14:49:00','14:49:00','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(2,'teashop2','338 Sanford Cape\nAdrianland, AR 12920','+1 (859) 945-6230','14:49:00','14:49:00','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL);
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_numbers`
--

DROP TABLE IF EXISTS `table_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_numbers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SUCCESS',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_numbers`
--

LOCK TABLES `table_numbers` WRITE;
/*!40000 ALTER TABLE `table_numbers` DISABLE KEYS */;
INSERT INTO `table_numbers` VALUES (1,'table 1',NULL,'PENDING','2023-11-16 08:19:16','2023-11-16 08:44:52',NULL),(2,'table 2',NULL,'SUCCESS','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(3,'table 3',NULL,'SUCCESS','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(4,'table 4',NULL,'SUCCESS','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL);
/*!40000 ALTER TABLE `table_numbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_unique` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Prof. Loraine Spinka','mable55@example.com','434.520.6153','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','30360 Adelle Walks\nWest Vern, OH 22306-0211','QEBPVZmnnY','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(2,'Fay Bednar','ilueilwitz@example.net','949-384-9078','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','7688 Micah Glen\nDarefort, TN 41506','vD0IYNRhTZ','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(3,'Mr. Emmet Ward','percy.bayer@example.net','(580) 510-8233','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','1301 Weissnat Ports Suite 222\nEdisonmouth, WA 60309-1969','AmwcCek9G8','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(4,'Dr. Cindy Hill','mertz.christa@example.org','802-328-5751','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','760 Dylan Estate\nBoyerfort, IN 80567-6477','YyXQm1uMzA','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(5,'Dell Dietrich','katelynn.sanford@example.net','+13043997119','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','642 Leslie Trail Suite 869\nLake Euna, AZ 29636','TcxZCjenBa','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(6,'Breanna Hirthe MD','angela94@example.net','+1-818-386-5192','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','51286 Nicolas Causeway Suite 568\nEast Amie, KY 19679','T2WLAqoh2U','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(7,'Cyril Quitzon','terry.davon@example.com','+1 (929) 682-8369','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','4006 Rice Green\nLake Flo, AZ 35196-7633','2kZ8u7sPXV','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(8,'Denis Schimmel','ukuhic@example.net','+1-551-730-1719','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','8304 Diego Dam Apt. 485\nMedhurstshire, WY 12511-5433','oGmMxkgNk2','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(9,'Antone O\'Connell','kuphal.aniyah@example.net','478-888-8150','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','580 Dusty Extensions\nVerniefurt, MN 07510-5384','pmjrwGQq7i','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(10,'Cedrick Lowe PhD','alessia.schmitt@example.com','+1-856-200-2225','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','348 Rossie Groves Suite 816\nTerryborough, TX 45861-1674','a7Kcwu6J1y','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(11,'superadmin','superadmin@admin.com','755704230','2023-11-16 08:19:16','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','8709 Easter Meadows Apt. 360\nWatsicashire, MS 91687-0254','krGtNoQDi2','2023-11-16 08:19:16','2023-11-16 08:19:16',NULL),(12,'kuro','kuro@gmail.com',NULL,NULL,'$2y$10$yyfnd2J8moSB0Zda5rkHlOooOykAaUthcfvUpQMo0H5w43pwxUESW',NULL,NULL,'2023-11-16 08:39:32','2023-11-16 08:39:32',NULL),(13,'kuro2','kuro2@gmail.com',NULL,NULL,'$2y$10$npKOICinpSPlR3v0gogu.uevq84GmD2Q98k6shAbTd8Jh5RqtMNOG',NULL,NULL,'2023-11-16 09:10:26','2023-11-16 09:10:26',NULL),(14,'Phyo Min Hein','phyominhein321@gmail.com','262253433',NULL,'$2y$10$wAQmiIvV3pEOxqGzmKrW4.7elw9gU.m77fHc3rY2IyFB6hLWAWhGK','yangon,myanmar',NULL,'2023-11-16 09:21:56','2023-11-16 09:21:56',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 21:47:51
