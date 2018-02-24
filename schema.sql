DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE comics(
id integer(10) auto_increment not null,
comic_name varchar(100) null,
brand_name varchar(50) null,
price decimal(10,2) null,
quantity integer(10) null,
primary key(id)
);

INSERT INTO comics (comic_name, brand_name, price, quantity)
VALUES ("Batman Adventures #12", "DC Comics", 2500.00, 3),
("NYX #3", "Marvel Comics", 1800.00, 6),
("Amazing Spider-Man #300", "Marvel Comics", 1500.00, 7),
("Spawn #1", "Image Comics", 800.00, 12),
("Batman #635", "DC Comics", 390.00, 1),
("Amazing Spider-Man #361", "Marvel Comics", 350.00, 8),
("Vengeance of Bane Special", "DC Comics", 1635.00, 2),
("Walking Dead #100", "Image Comics", 1250.00, 4),
("Y the Last Man #1", "Valiant Comics", 1000.00, 11);
