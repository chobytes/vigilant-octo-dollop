PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE department(
id int primary key not null,
dept char(50) not null,
emp_id int not null
);
CREATE TABLE company(
id int primary key not null,
name text not null,
age int not null,
address char(50) not null,
salary real
);
INSERT INTO "company" VALUES(1,'hannah',24,'illinois',0.01);
INSERT INTO "company" VALUES(2,'chocola',24,'catland',1.00000000000000015623e+14);
INSERT INTO "company" VALUES(3,'bob',100,'somewhere',0.0);
INSERT INTO "company" VALUES(4,'jill',13,'nowhere',12.0);
INSERT INTO "company" VALUES(5,'notacat',27,'upstairs',10000.0);
INSERT INTO "company" VALUES(6,'doggo friend',19,'outside',1300.0);
COMMIT;
