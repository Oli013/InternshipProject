show databases;
use mysql;
create database student_Dtls;
show databases;
use student_Dtls;
drop database student_Dtls;
show databases;
create database studentDB;
use studentDB;
create table studentDtls(
  id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    enrolNo INT NOT NULL,
    course VARCHAR(255) NOT NULL,
    programme VARCHAR(255) NOT NULL,
    month VARCHAR(50) NOT NULL
);
 create table student(
	  id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    enrolNo bigint NOT NULL,
    course VARCHAR(255) NOT NULL,
    programme VARCHAR(255) NOT NULL,
    grade VARCHAR(10)  NULL,
    marks INT NULL,
    remarks VARCHAR(10) NULL,
    month VARCHAR(50) NOT NULL,
    year INT NOT NULL
 );
show tables;
create table loginDtls(
	id INT AUTO_INCREMENT PRIMARY KEY,
	userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL ,
    Contact bigint NOT NULL
);
select * from studentDtls;

use studentDB;
select * from studentDtls;
select * from studentDtls where course like 'bsc' && month like 'JUNE';
select * from student;
delete from student where name like 'olivia';
select * from student where course like 'bsc' && month like 'JUNE';
select * from loginDtls;
drop table student;
drop table loginDtls;