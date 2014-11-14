-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2014 at 08:30 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `skalez_games`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
  `clerk_id` char(3) NOT NULL,
  `first_name` char(10) NOT NULL,
  `last_name` char(20) NOT NULL,
  `address` char(50) NOT NULL,
  `email` char(50) NOT NULL,
  `phone_num` char(10) NOT NULL,
  `soc_ins_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`clerk_id`, `first_name`, `last_name`, `address`, `email`, `phone_num`, `soc_ins_num`) VALUES
('101', 'Scott', 'Melanson', '222 Baker St., Sarnia, ON', 'scott.mel@lambton.ca', '5198994563', 100999256),
('102', 'Lewis', 'Menelaws', '68 Rich Lane, Sarnia, ON', 'lewis.men@lambton.ca', '5197421122', 589362478),
('103', 'Ashika', 'Shallow', '564 Christina, Sarnia, ON', 'ashallow@lambton.ca', '2264236523', 321654987);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` char(4) NOT NULL,
  `order_date` date NOT NULL,
  `customer_id` char(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `customer_id`) VALUES
('9012', '2003-04-26', '1001'),
('9101', '2003-02-03', '1148'),
('9171', '2003-07-28', '1254');

-- --------------------------------------------------------

--
-- Table structure for table `order_lines`
--

CREATE TABLE IF NOT EXISTS `order_lines` (
  `order_id` char(4) NOT NULL,
  `product_id` char(5) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_lines`
--

INSERT INTO `order_lines` (`order_id`, `product_id`, `quantity`) VALUES
('9012', 'CP105', 4),
('9012', 'XB109', 5),
('9101', 'PS103', 5),
('9101', 'PS117', 3),
('9171', 'NO105', 10),
('9171', 'NO107', 6);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` char(5) NOT NULL,
  `title` char(30) NOT NULL,
  `platform` char(15) NOT NULL,
  `glanguage` char(10) NOT NULL,
  `developer` char(40) DEFAULT NULL,
  `publisher` char(40) NOT NULL,
  `rating` char(3) NOT NULL DEFAULT 'NYR',
  `genre` char(30) NOT NULL,
  `price` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `title`, `platform`, `glanguage`, `developer`, `publisher`, `rating`, `genre`, `price`) VALUES
('CP101', 'The Sims 4', 'PC', 'English', 'Maxis', 'EA', 'T', 'Simulation', '59.99'),
('CP103', 'Bioshock Infinite', 'PC', 'English', 'Irrational Games', '2K Games', 'M', 'Adventure', '19.99'),
('CP105', 'Dragon Age: Inquisition', 'PC', 'English', 'BioWare', 'EA', 'M', 'Combat', '79.99'),
('NO101', 'Bayonetta 2', 'Wii U', 'English', '', 'Nintendo', 'M', 'Shooter', '64.99'),
('NO103', 'Mario Kart 8', 'Wii U', 'English', '', 'Nintendo', 'E', 'Racing', '60.70'),
('NO105', 'Rayman Legends', 'Wii U', 'Japanese', '', 'Ubisoft', 'E', 'Adventure', '28.89'),
('NO107', 'Super Smash Bros Brawl', 'Wii', 'English', '', 'Nintendo', 'T', 'Fighting', '29.99'),
('NO109', 'Lego Harry Potter Years 1-4', 'Wii', 'English', '', 'Warner Bros', 'E', 'Adventure', '16.99'),
('NO111', 'Donkey Kong Country Returns', 'Wii', 'English', '', 'Nintendo', 'E', 'Adventure', '29.96'),
('NO113', 'Animal Crossing: New Leaf', 'Nintendo 3DS', 'English', '', 'Nintendo', 'E', 'Life', '19.94'),
('NO115', 'Bravely Default', 'Nintendo 3DS', 'Japanese', 'Square Enix', 'Nintendo', 'T', 'RPG', '39.96'),
('NO117', 'Virtues Last Reward', 'Nintendo 3DS', 'Japanese', '', 'Aksys', 'M', 'Story', '29.99'),
('PS101', 'NHL 15', 'PS3', 'English', '', 'EA', 'E', 'Sports', '69.99'),
('PS103', 'Grand Theft Auto V', 'PS3', 'English', '', 'Rockstar Games', 'M', 'Action', '54.02'),
('PS105', 'The Last Of Us', 'PS3', 'English', 'Naughty Dog', 'Sony Computer Entertainment', 'M', 'Survival Action', '39.99'),
('PS107', 'Destiny', 'PS4', 'English', 'Bungie', 'Activision', 'T', 'Action Adventure', '69.99'),
('PS109', 'Assassins Creed Unity', 'PS4', 'French', '', 'Ubisoft', 'M', 'Action Adventure', '69.99'),
('PS111', 'Little Big Planet 3', 'PS4', 'English', '', 'Sony Computer Entertainment', 'E', 'Adventure', '62.99'),
('PS113', 'Danganronpa 2: Goodbye Despair', 'PSVITA', 'English', '', 'NIS America', 'M', 'Survival', '39.99'),
('PS115', 'Final Fantasy X|X2', 'PSVITA', 'English', '', 'Square Enix', 'T', 'RPG', '34.96'),
('PS117', 'ModNation Racers: Road Trip', 'PSVITA', 'French', '', 'Sony Computer Entertainment', 'E', 'Racing', '13.00'),
('XB101', 'Minecraft', 'XBOX 360', 'English', 'Mojang', 'Microsoft', 'E', 'Puzzle', '19.83'),
('XB103', 'Assassins Creed Rogue', 'XBOX 360', 'English', '', 'Ubisoft', 'M', 'Action Adventure', '59.99'),
('XB105', 'Diablo: Reaper of Souls', 'XBOX 360', 'English', 'Blizzard', 'Activision', 'M', 'Action', '44.99'),
('XB107', 'Mortal Kombat X', 'XBOX ONE', 'English', 'NetherRealm', 'Warner Bros', 'M', 'Fighting', '66.99'),
('XB109', 'Call of Duty: Advanced Warfare', 'XBOX ONE', 'English', 'Sledgehammer', 'Activision', 'M', 'Shooter', '69.96'),
('XB111', 'Batman Arkham Knight', 'XBOX ONE', 'French', 'Rocksteady', 'Warner Bros', 'T', 'Fighting', '56.99');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`PID` int(11) NOT NULL,
  `FirstName` char(255) NOT NULL,
  `LastName` char(255) NOT NULL,
  `UserName` char(255) NOT NULL,
  `Password` char(255) NOT NULL,
  `Email` char(255) NOT NULL,
  `Gender` char(255) NOT NULL,
  `privilege` varchar(255) NOT NULL,
  `get_emails` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`PID`, `FirstName`, `LastName`, `UserName`, `Password`, `Email`, `Gender`, `privilege`, `get_emails`) VALUES
(5, 'Serenity', 'Melanson', 'SerenityTheFool', '34e7c886aed89b79eb76d0cbd94c49ea', 'serenitythefool@gmail.com', 'female', 'member', 0),
(7, 'Scott', 'Melanson', 'OtakuScott', '34e7c886aed89b79eb76d0cbd94c49ea', 'otakuscott1438@hotmail.com', 'male', 'member', 1),
(8, 'Steve', 'Stevenson', 'SteveTheMan', '179ad45c6ce2cb97cf1029e212046e81', 'scott_melanson@outlook.com', 'male', 'member', 0),
(11, 'Jim', 'Jim', 'Jim', '5d41402abc4b2a76b9719d911017c592', 'jim@jim.jim', 'male', 'member', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
 ADD PRIMARY KEY (`clerk_id`), ADD UNIQUE KEY `employees_soc_ins_num_uq` (`soc_ins_num`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
 ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_lines`
--
ALTER TABLE `order_lines`
 ADD PRIMARY KEY (`order_id`,`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
 ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`PID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
