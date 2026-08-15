--
-- Database: `mukurtham`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `slug_url` VARCHAR(200) DEFAULT NULL,
    `icon` VARCHAR(100) DEFAULT NULL,
    `image` VARCHAR(250) DEFAULT NULL,
    `color` VARCHAR(20) DEFAULT NULL,
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `updated_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `categories_name_unique` (`name`)
);
-- --------------------------------------------------------

--
-- Table structure for table `category_services`
--

CREATE TABLE IF NOT EXISTS `category_services` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `state_id` INT UNSIGNED DEFAULT NULL,
  `city_id` INT UNSIGNED DEFAULT NULL,
  `locality_id` INT UNSIGNED DEFAULT NULL,
  `service_name` VARCHAR(250) NOT NULL,
  `service_description` TEXT DEFAULT NULL,
  `service_address` TEXT DEFAULT NULL,
  `service_banner_image` VARCHAR(250) DEFAULT NULL,
  `capacity` INT UNSIGNED NOT NULL DEFAULT 0,
  `number_of_rooms` INT UNSIGNED NOT NULL DEFAULT 0,
  `facility_ids` VARCHAR(100) DEFAULT NULL,
  `car_parking` VARCHAR(10) DEFAULT NULL,
  `ac_available` VARCHAR(10) DEFAULT NULL,
  `latitude` VARCHAR(100) DEFAULT NULL,
  `longitude` VARCHAR(100) DEFAULT NULL,
  `pricing_type` VARCHAR(50) DEFAULT NULL,
  `amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `discount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `tax_percentage` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `tax_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `final_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,


  PRIMARY KEY (`id`),
  KEY `idx_category_services_category_id` (`category_id`),
  KEY `idx_category_services_user_id` (`user_id`),
  KEY `idx_category_services_locality_id` (`locality_id`)
);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `is_popular` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE IF NOT EXISTS `facilities` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Table structure for table `localities`
--

CREATE TABLE IF NOT EXISTS `localities` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_id` INT UNSIGNED NOT NULL,
  `city_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`),
  KEY `idx_localities_state_id` (`state_id`),
  KEY `idx_localities_city_id` (`city_id`)
);

-- --------------------------------------------------------

--
-- Table structure for table `otp_request`
--

CREATE TABLE IF NOT EXISTS `otp_request` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mobile` VARCHAR(20) NOT NULL,
  `otp_hash` TEXT NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `verified_at` DATETIME DEFAULT NULL,
  `attempts` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`),
  KEY `idx_otp_request_mobile` (`mobile`)
);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(10) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `is_active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`),
  UNIQUE KEY `roles_code_unique` (`code`)
);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE IF NOT EXISTS `states` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `states_name_unique` (`name`)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `refresh_token` TEXT DEFAULT NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_mobile_unique` (`mobile`),
  KEY `idx_users_role_id` (`role_id`)
);



CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `category_service_id` INT UNSIGNED NOT NULL,
  `gallery_type` VARCHAR(10) NOT NULL,
  `occasion_type` VARCHAR(100) DEFAULT NULL,
  `gallery_image` VARCHAR(250) DEFAULT NULL,
  `gallery_video` VARCHAR(250) DEFAULT NULL,

  `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `updated_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,


  PRIMARY KEY (`id`),
  KEY `idx_gallery_user_id` (`user_id`),
  KEY `idx_gallery_category_service_id` (`category_service_id`),
  KEY `idx_gallery_gallery_type` (`gallery_type`)
);

CREATE TABLE IF NOT EXISTS `service_reviews` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,

    `user_id` INT UNSIGNED NOT NULL,
    `category_service_id` INT UNSIGNED NOT NULL,

    `rating` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `review_title` VARCHAR(250) DEFAULT NULL,
    `review_description` TEXT DEFAULT NULL,

    `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,

    `created_by` INT UNSIGNED DEFAULT NULL,
    `updated_by` INT UNSIGNED DEFAULT NULL,

    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,

    PRIMARY KEY (`id`),
    KEY `idx_service_reviews_user_id` (`user_id`),
    KEY `idx_service_reviews_category_service_id` (`category_service_id`),
    KEY `idx_service_reviews_rating` (`rating`)
);

CREATE TABLE IF NOT EXISTS `service_dates` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `category_id` INT UNSIGNED DEFAULT NULL,
    `category_service_id` INT UNSIGNED DEFAULT NULL,
    `date_type` VARCHAR(50) DEFAULT NULL,
    `service_date` DATE DEFAULT NULL,

    `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `updated_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,

    PRIMARY KEY (`id`),
    KEY `idx_service_dates_category_id` (`category_id`),
    KEY `idx_service_dates_type` (`date_type`)
);

