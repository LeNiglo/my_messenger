-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 31 jan. 2018 à 09:39
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `messenger`
--
CREATE DATABASE messenger;
USE messenger;
-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id_msg` int(11) NOT NULL AUTO_INCREMENT,
  `id_group` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `msg` varchar(5000) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_msg`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `friends`
--

DROP TABLE IF EXISTS `friends`;
CREATE TABLE IF NOT EXISTS `friends` (
  `id_user` int(11) NOT NULL,
  `id_friend` int(11) NOT NULL,
  `invitation` varchar(10) NOT NULL DEFAULT 'standBy'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id_group` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `group_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_group`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
