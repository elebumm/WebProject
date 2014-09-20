SET SCHEMA IBMTEAM4;

/* PRODUCTS table*/

CREATE TABLE products (
	product_id	  CHAR(5) NOT NULL,
	title         CHAR(30) NOT NULL,
	platform      CHAR(15) NOT NULL,
	language      CHAR(10) NOT NULL,
	developer     CHAR(30),
	publisher     CHAR(30) NOT NULL,
	rating        CHAR(3) NOT NULL DEFAULT 'NYR',
	genre         CHAR(10) NOT NULL,
	price         DECIMAL(4, 2) NOT NULL,
	PRIMARY KEY ( product_id )
);

INSERT INTO products VALUES
('PS101','NHL 15','PS3','English','','EA','E','Sports',69.99);
INSERT INTO products VALUES
('PS103','Grand Theft Auto V','PS3','English','','Rockstar Games','M','Action',54.02);
INSERT INTO products VALUES
('PS105','The Last Of Us','PS3','English','Naughty Dog','Sony Computer Entertainment','M','Survival Action',39.99);
INSERT INTO products VALUES
('PS107','Destiny','PS4','English','Bungie','Activision','T','Action Adventure',69.99);
INSERT INTO products VALUES
('PS109',"Assassin's Creed Unity",'PS4','French','','Ubisoft','M','Action Adventure',69.99);
INSERT INTO products VALUES
('PS111','Little Big Planet 3','PS4','English','','Sony Computer Entertainment','E','Adventure',62.99);
INSERT INTO products VALUES
('XB101','Minecraft','XBOX 360','English','Mojang','Microsoft','E','Puzzle',19.83);
INSERT INTO products VALUES
('XB103','Assassin\'s Creed Rogue','XBOX 360','English','','Ubisoft','M','Action Adventure',59.99);
INSERT INTO products VALUES
('XB105','Diablo: Reaper of Souls','XBOX 360','English','Blizzard','Activision','M','Action',44.99);
INSERT INTO products VALUES
('XB107','Mortal Kombat X','XBOX ONE','English','NetherRealm','Warner Bros','M','Fighting',66.99);
INSERT INTO products VALUES
('XB109','Call of Duty: Advanced Warfare','XBOX ONE','English','Sledgehammer','Activision','M','Shooter',69.96);
INSERT INTO products VALUES
('XB111','Batman Arkham Knight','XBOX ONE','French','Rocksteady','Warner Bros','T','Fighting',56.99);
INSERT INTO products VALUES
('NO101','Bayonetta 2','Wii U','English','','Nintendo','M','Shooter',64.99);
INSERT INTO products VALUES
('NO103','Mario Kart 8','Wii U','English','','Nintendo','E','Racing',60.70);
INSERT INTO products VALUES
('NO105','Rayman Legends','Wii U','Japanese','','Ubisoft','E','Adventure',28.89);
INSERT INTO products VALUES
('NO107','Super Smash Bros Brawl','Wii','English','','Nintendo','T','Fighting',29.99);
INSERT INTO products VALUES
('NO109','Lego Harry Potter Years 1-4','Wii','English','','Warner Bros','E','Adventure',16.99);
INSERT INTO products VALUES
('NO111','Donkey Kong Country Returns','Wii','English','','Nintendo','E','Adventure',29.96);
INSERT INTO products VALUES
('NO113','Animal Crossing: New Leaf','Nintendo 3DS','English','','Nintendo','E','Life',19.94);
INSERT INTO products VALUES
('NO115','Bravely Default','Nintendo 3DS','Japanese','Square Enix','Nintendo','T','RPG',39.96);
INSERT INTO products VALUES
('NO117','Virtue\'s Las Reward','Nintendo 3DS','Japanese','','Aksys','M','Story',29.99);
INSERT INTO products VALUES
('PS113','Danganronpa 2: Goodbye Despair','PSVITA','English','','NIS America','M','Survival',39.99);
INSERT INTO products VALUES
('PS115','Final Fantasy X|X2','PSVITA','English','','Square Enix','T','RPG',34.96);
INSERT INTO products VALUES
('PS117','ModNation Racers: Road Trip','PSVITA','French','','Sony Computer Entertainment','E','Racing',13.00);
INSERT INTO products VALUES
('CP101','The Sims 4','PC','English','Maxis','EA','T','Simulation',59.99);
INSERT INTO products VALUES
('CP103','Bioshock Infinite','PC','English','Irrational Games','2K Games','M','Adventure',19.99);
INSERT INTO products VALUES
('CP105','Dragon Age: Inquisition','PC','English','BioWare','EA','M','Combat',79.99);

