CREATE DATABASE IF NOT EXISTS leoutn_pisco;

USE leoutn_pisco;

CREATE TABLE db_game(
gm_id int unsigned not null auto_increment,
gm_name varchar(50),
gm_dev varchar(50),
gm_release int unsigned,
gm_device varchar(20),
gm_category varchar(20),
gm_price int unsigned,
gm_imageURL varchar(80),
gm_description varchar(400),
primary key(gm_id)
);

CREATE TABLE db_contacto(
c_id int unsigned not null auto_increment,
c_name varchar(50),
c_mail varchar(50),
c_subject varchar(50),
c_description varchar(500),
primary key(c_id)
);

CREATE TABLE db_user(
us_id int unsigned not null auto_increment,
us_user varchar(10),
us_mail varchar(80),
us_name varchar(80),
us_lastname varchar(80),
us_password varchar(12),
us_rol int unsigned,
primary key(c_id)
);


insert into db_games values(null,"Horizon Zero Dawn","Guerrilla Games","2017","bi-playstation","Mundo Abierto",5200,"07.webp","Acompaña a Aloy en su legendaria búsqueda para desentrañar los misterios de un futuro planeta Tierra gobernado por máquinas. ¡Ejecuta impresionantes ataques estratégicos contra tus presas y explora un majestuoso mundo abierto en este galardonado juego RPG de acción!");
insert into db_games values(null,"Marvel’s Spider-Man Remastered","Insomniac Games","2022","bi-pc-display","Superhéroes",6350,"02.webp"."En Marvel's Spider-Man Remasterizado, el mundo de Peter Parker choca con el de Spider-Man en una historia original repleta de acción. Encarna a un experimentado Peter Parker y lucha contra el hampa y un elenco de villanos archiconocidos en la Nueva York de Marvel. Balancéate por barrios bulliciosos y derrota a los villanos de forma espectacular.");
insert into db_games values(null,"Death Stranding","Kojima Productions","2020","bi-playstation","Acción",4530,"08.webp","El legendario creador de videojuegos Hideo Kojima nos ofrece una experiencia que redefine su género y que, ahora, se amplía con esta edición definitiva de DIRECTOR'S CUT. En el papel de Sam Bridges, tendrás la misión de llevar esperanza a la humanidad conectando a los últimos supervivientes de unos Estados Unidos arrasados.");
insert into db_games values(null,"Far Cry 5","UbiSoft","2018","bi-xbox","Acción",2500,"09.webp","Te damos la bienvenida a Hope County, Montana, la tierra de los valientes y de la libertad, pero también de la secta apocalíptica conocida como Proyecto de la Puerta del Edén.");
insert into db_games values(null,"Forza Horizon 5","Playground Games","2021","bi-xbox","Carreras",3500,"10.webp","Explora los paisajes dinámicos en constante evolución de México gracias a la acción que vivirás al conducir los mejores coches del mundo de forma ilimitada y divertida. Arranca hacia el parque de Hot Wheels Park y prueba las pistas más extremas jamás creadas, la expansión se vende por separado.");

