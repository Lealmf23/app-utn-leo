
use leoutn_pisco;

create table db_games(
gm_id int unsigned not null auto_increment,
gm_name varchar(50),
gm_dev varchar(50),
gm_release int unsigned,
gm_device varchar(20),
gm_category varchar(20),
gm_price int unsigned,
gm_amount int unsigned,
primary key(gm_id)
);

create table db_contacto(
c_id int unsigned not null auto_increment,
c_name varchar(50),
c_mail varchar(50),
c_subject varchar(50),
c_description varchar(500),
primary key(c_id)
);



alter table db_games modify gm_device varchar(20);
alter table db_games modify gm_release int unsigned;
insert into db_games values(null,"Horizon Zero Dawn","Guerrilla Games","2017","PlayStation","Mundo Abierto",5200,20);
insert into db_games values(null,"Marvel’s Spider-Man Remastered","Insomniac Games","2022","PC","Superhéroes",6350,30);
insert into db_games values(null,"Death Stranding","Kojima Productions","2020","PlayStation","Acción",4530,10);
insert into db_games values(null,"Far Cry 5","UbiSoft","2018","Xbox","Acción",2500,15);
insert into db_games values(null,"Forza Horizon 4","Playground Games","2018","Xbox","Carreras",3500,20);
insert into db_games values(null,"God of War","Sony Santa Monica","2018","PlayStation","Mundo Abierto",4500,15);
insert into db_games values(null,"Horizon: Forbidden West","Guerrilla Games","2022","PlayStation","Aventura",6300,10);
insert into db_games values(null,"Resident Evil 8: Village","Capcom","2021","PC","Acción",5200,20);
insert into db_games values(null,"Star Wars Jedi: Fallen Order","Respawn Entertainment","2019","PC","Aventura",4500,30);
insert into db_games values(null,"Gotham Knights","Warner Bros. Games Montreal","2022","PC","Superhéroes",6300,20);
insert into db_games values(null,"A Plague Tale: Requiem","Asobo Studio","2022","Xbox","Aventura",4600,10);





select * from leoutn_pisco.db_games;
select * from leoutn_pisco.db_contacto;
UPDATE db_games SET gm_release=2022 WHERE gm_id = 2;

select * from leoutn_pisco.db_games where gm_name ="horizon Zero Dawn";
