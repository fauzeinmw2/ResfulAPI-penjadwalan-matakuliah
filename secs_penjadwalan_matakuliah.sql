-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2022 at 04:36 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `secs_penjadwalan_matakuliah`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'Budi Hartono', '2022-06-04 14:08:59', '2022-06-04 14:08:59');

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nip` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`id`, `nama`, `nip`, `username`, `createdAt`, `updatedAt`) VALUES
(1, 'Jhoni Eka Putra, S.Kom', '112233', 'jhoni', '2022-06-04 14:13:53', '2022-06-04 14:13:53'),
(2, 'Hidayati, S.Kom', '223344', 'ayuhidayati', '2022-06-04 14:14:39', '2022-06-04 14:14:50'),
(3, 'Eka Puspita, S.Kom', '334455', 'eka', '2022-06-04 14:15:26', '2022-06-04 14:15:26'),
(4, 'Aria Amelia, S.Kom', '445566', 'aria', '2022-06-04 14:16:21', '2022-06-04 14:16:21'),
(7, 'Irdanelia, S.Kom', '788778', 'irda', '2022-06-08 14:09:58', '2022-06-08 14:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `id` int(11) NOT NULL,
  `id_dosen` int(11) NOT NULL,
  `id_matkul` int(11) NOT NULL,
  `hari` varchar(255) NOT NULL,
  `jam_mulai` time NOT NULL DEFAULT current_timestamp(),
  `jam_selesai` time NOT NULL DEFAULT current_timestamp(),
  `id_kelas` int(11) NOT NULL,
  `id_tapel` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id`, `id_dosen`, `id_matkul`, `hari`, `jam_mulai`, `jam_selesai`, `id_kelas`, `id_tapel`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 'Senin', '10:45:00', '12:00:00', 1, 1, '2022-06-04 14:30:18', '2022-06-04 14:30:18'),
(2, 1, 5, 'Sabtu', '13:15:00', '14:30:00', 4, 2, '2022-06-04 14:30:54', '2022-06-04 14:30:54'),
(3, 2, 6, 'Rabu', '08:00:00', '09:25:00', 2, 2, '2022-06-04 14:31:28', '2022-06-04 14:31:28'),
(4, 3, 5, 'Selasa', '13:00:00', '14:10:00', 4, 2, '2022-06-04 15:11:24', '2022-06-04 15:11:24');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `id` int(11) NOT NULL,
  `nama_jurusan` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`id`, `nama_jurusan`, `createdAt`, `updatedAt`) VALUES
(1, 'S1 Rekayasa Perangkat Lunak', '2022-06-04 14:18:21', '2022-06-04 14:18:21'),
(2, 'S1 Teknik Informatika', '2022-06-04 14:18:36', '2022-06-04 14:18:36'),
(3, 'S1 Sistem Informasi', '2022-06-04 14:18:44', '2022-06-04 14:18:44'),
(4, 'D3 Teknik Komputer', '2022-06-04 14:19:01', '2022-06-04 14:19:01');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `nama_kelas` varchar(255) NOT NULL,
  `id_jurusan` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `nama_kelas`, `id_jurusan`, `createdAt`, `updatedAt`) VALUES
(1, 'RPL A', 1, '2022-06-04 14:20:02', '2022-06-04 14:20:02'),
(2, 'RPL B', 1, '2022-06-04 14:20:11', '2022-06-04 14:20:11'),
(3, 'IF A', 2, '2022-06-04 14:20:34', '2022-06-04 14:20:34'),
(4, 'IF B', 2, '2022-06-04 14:20:43', '2022-06-04 14:20:43'),
(5, 'SI A', 3, '2022-06-04 14:21:00', '2022-06-04 14:21:00');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nim` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `id_jurusan` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nim`, `nama`, `id_jurusan`, `id_kelas`, `createdAt`, `updatedAt`) VALUES
(1, '021203', 'Fauzein Mulya Warman', 1, 1, '2022-06-04 14:22:45', '2022-06-04 14:22:45'),
(2, '435678', 'Fiki Naki', 2, 4, '2022-06-04 14:23:04', '2022-06-04 14:23:04'),
(3, '229908', 'Abdul Kholiq', 1, 1, '2022-06-04 14:23:32', '2022-06-04 14:23:32');

-- --------------------------------------------------------

--
-- Table structure for table `matakuliah`
--

CREATE TABLE `matakuliah` (
  `id` int(11) NOT NULL,
  `kode_matakuliah` varchar(255) NOT NULL,
  `nama_matakuliah` varchar(255) NOT NULL,
  `semester` int(11) DEFAULT NULL,
  `sks` int(11) DEFAULT NULL,
  `id_jurusan` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matakuliah`
--

INSERT INTO `matakuliah` (`id`, `kode_matakuliah`, `nama_matakuliah`, `semester`, `sks`, `id_jurusan`, `createdAt`, `updatedAt`) VALUES
(1, 'RPL001', 'Algoritma Dasar', 1, 4, 1, '2022-06-04 14:24:59', '2022-06-04 14:24:59'),
(2, 'RPL002', 'Pemrograman Web 1', 2, 3, 1, '2022-06-04 14:25:32', '2022-06-04 14:25:32'),
(4, 'RPL004', 'Game Programming', 0, 4, 1, '2022-06-04 14:26:54', '2022-06-04 14:26:54'),
(5, 'IF001', 'Pemrograman Berbasis Web', 2, 3, 2, '2022-06-04 14:27:15', '2022-06-04 14:27:15'),
(6, 'RPL005', 'IOT Programming', 0, 5, 1, '2022-06-04 14:27:39', '2022-06-04 14:27:39'),
(7, 'RPL006', 'Mobile Programming', 0, 3, 1, '2022-06-08 13:31:37', '2022-06-08 13:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `matkul_mahasiswa`
--

CREATE TABLE `matkul_mahasiswa` (
  `id` int(11) NOT NULL,
  `id_mahasiswa` int(11) NOT NULL,
  `id_matkul` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matkul_mahasiswa`
--

INSERT INTO `matkul_mahasiswa` (`id`, `id_mahasiswa`, `id_matkul`, `semester`, `createdAt`, `updatedAt`) VALUES
(1, 1, 4, 6, '2022-06-04 14:32:38', '2022-06-04 14:32:38'),
(3, 2, 6, 5, '2022-06-04 15:19:08', '2022-06-04 15:19:08'),
(5, 1, 6, 5, '2022-06-08 15:36:48', '2022-06-08 15:36:48'),
(7, 1, 7, 7, '2022-06-08 15:37:45', '2022-06-08 15:37:45');

-- --------------------------------------------------------

--
-- Table structure for table `tapel`
--

CREATE TABLE `tapel` (
  `id` int(11) NOT NULL,
  `tahun_pelajaran` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tapel`
--

INSERT INTO `tapel` (`id`, `tahun_pelajaran`, `createdAt`, `updatedAt`) VALUES
(1, '2020/2021', '2022-06-04 14:28:43', '2022-06-04 14:28:43'),
(2, '2021/2022', '2022-06-04 14:28:51', '2022-06-04 14:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2a$08$RmFMrKEDzwNlkTlSe2bJh.He1QvD3Qb.KXfwPG1CfRQ1OmVIszZQK', 'admin', '2022-06-04 14:08:59', '2022-06-04 14:08:59'),
(2, 'jhoni', '$2a$08$8Mwp1wr7WeS43WuqTrlGteIJAzRfbPV/gjvZz3Le4Mas94R4kuXgm', 'dosen', '2022-06-04 14:13:53', '2022-06-04 14:13:53'),
(3, 'ayuhidayati', '$2a$08$LhGSLzl.4tIA.WU2i6LNeOgFHyI2pdX1fVN3mxA4Ew0Y04Ms7Fr7m', 'dosen', '2022-06-04 14:14:40', '2022-06-04 14:14:50'),
(4, 'eka', '$2a$08$urXshC9pwYGXN2n5c3QPUuroJPMsqIEi.E20Ywba.HXLEf46zzloG', 'dosen', '2022-06-04 14:15:27', '2022-06-04 14:15:27'),
(5, 'aria', '$2a$08$cJPDgDZyD9z/FGu4bx.R.OoUPRyHMOdTTEsml8GznEy.rJmY7gfAC', 'dosen', '2022-06-04 14:16:21', '2022-06-04 14:16:21'),
(6, '021203', '$2a$08$fkMVXWVjsuiK30Le8PWV9uF34FDRguuIdWRXjpkh12zeHMIJLDc3y', 'mahasiswa', '2022-06-04 14:22:45', '2022-06-04 14:22:45'),
(7, '435678', '$2a$08$J0owCjAUZMWu//LDvIqmSuLquUKoqr0zohArVYRW7R8WbbyRONqH2', 'mahasiswa', '2022-06-04 14:23:04', '2022-06-04 14:23:04'),
(8, '229908', '$2a$08$RugMWenRbauE9O3gIpITxO2kMWORkp0hqTIpSHjbtKt3pJ1Dtj60S', 'mahasiswa', '2022-06-04 14:23:32', '2022-06-04 14:23:32'),
(14, 'irda', '$2a$08$iHiSiZMqzWBa0YigivWnmOLztPmWicjJ0S0c5x2Mg1yq.0EEDS3bq', 'dosen', '2022-06-08 14:09:58', '2022-06-08 14:09:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dosen` (`id_dosen`),
  ADD KEY `id_matkul` (`id_matkul`),
  ADD KEY `id_kelas` (`id_kelas`),
  ADD KEY `id_tapel` (`id_tapel`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jurusan` (`id_jurusan`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jurusan` (`id_jurusan`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `matakuliah`
--
ALTER TABLE `matakuliah`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jurusan` (`id_jurusan`);

--
-- Indexes for table `matkul_mahasiswa`
--
ALTER TABLE `matkul_mahasiswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mahasiswa` (`id_mahasiswa`),
  ADD KEY `id_matkul` (`id_matkul`);

--
-- Indexes for table `tapel`
--
ALTER TABLE `tapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dosen`
--
ALTER TABLE `dosen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `matakuliah`
--
ALTER TABLE `matakuliah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `matkul_mahasiswa`
--
ALTER TABLE `matkul_mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tapel`
--
ALTER TABLE `tapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_1` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_2` FOREIGN KEY (`id_matkul`) REFERENCES `matakuliah` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_3` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_4` FOREIGN KEY (`id_tapel`) REFERENCES `tapel` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `mahasiswa_ibfk_1` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `mahasiswa_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `matakuliah`
--
ALTER TABLE `matakuliah`
  ADD CONSTRAINT `matakuliah_ibfk_1` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `matkul_mahasiswa`
--
ALTER TABLE `matkul_mahasiswa`
  ADD CONSTRAINT `matkul_mahasiswa_ibfk_1` FOREIGN KEY (`id_mahasiswa`) REFERENCES `mahasiswa` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `matkul_mahasiswa_ibfk_2` FOREIGN KEY (`id_matkul`) REFERENCES `matakuliah` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
