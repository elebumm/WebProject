SET SCHEMA IBMTEAM4;

/* PRODUCTS table*/

CREATE TABLE products (
	product_id	  CHAR(5) NOT NULL,
	title         CHAR(30) NOT NULL,
	platform      CHAR(15) NOT NULL,
	glanguage      CHAR(10) NOT NULL,
	developer     CHAR(40),
	publisher     CHAR(40) NOT NULL,
	rating        CHAR(3) NOT NULL DEFAULT 'NYR',
	genre         CHAR(30) NOT NULL,
	price         DECIMAL(4, 2) NOT NULL,
	PRIMARY KEY ( product_id )
);

CREATE TABLE employees (
	clerk_id		CHAR(3)		NOT NULL,
	first_name		CHAR(10)	NOT NULL,
	last_name		CHAR(20)	NOT NULL,
	address			CHAR(50)	NOT NULL,
	email			CHAR(50)	NOT NULL,
	phone_num		CHAR(10)	NOT NULL,
	soc_ins_num		INTEGER		NOT NULL,
	PRIMARY KEY (clerk_id)
);

CREATE TABLE customers (
	customer_id		CHAR(4)		NOT NULL,
	first_name		CHAR(10)	NOT NULL,
	last_name		CHAR(20)	NOT NULL,
	username		CHAR(15)	NOT NULL,
	upassword		CHAR(15)	NOT NULL,
	email			CHAR(50)	NOT NULL,
	date_of_birth	DATE		NOT NULL,
	gender			CHAR(1)		NOT NULL,
	PRIMARY KEY	( customer_id )
);

CREATE TABLE orders (
	order_id		CHAR(4)		NOT NULL,
	order_date		DATE		NOT NULL,
	customer_id		CHAR(4)		NOT NULL,
	PRIMARY KEY ( order_id )
);

CREATE TABLE order_lines (
	order_id		CHAR(4)		NOT NULL,
	product_id		CHAR(5)		NOT NULL,
	quantity		INTEGER		NOT NULL,
	PRIMARY KEY (order_id, product_id)
);

ALTER TABLE employees
	ADD CONSTRAINT employees_soc_ins_num_ck
		CHECK ( soc_ins_num > 0 AND soc_ins_num < 999999999 );
		
ALTER TABLE employees
	ADD CONSTRAINT employees_soc_ins_num_uq
		UNIQUE ( soc_ins_num);
		
ALTER TABLE customers
	ADD CONSTRAINT customers_gender_ck
		CHECK ( gender IN ( 'F', 'M' ));

ALTER TABLE orders
	ADD CONSTRAINT orders_customer_id_fk
		FOREIGN KEY( customer_id)
		REFERENCES customers( customer_id );
		
ALTER TABLE order_lines
	ADD CONSTRAINT lines_product_id_fk
	FOREIGN KEY (product_id)
	REFERENCES products ( product_id );
	
ALTER TABLE order_lines
	ADD CONSTRAINT lines_order_id_fk
	FOREIGN KEY (order_id)
	REFERENCES orders ( order_id );
			

INSERT INTO products VALUES
('PS101','NHL 15','PS3','English','','EA','E','Sports',69.99);
INSERT INTO products VALUES
('PS103','Grand Theft Auto V','PS3','English','','Rockstar Games','M','Action',54.02);
INSERT INTO products VALUES
('PS105','The Last Of Us','PS3','English','Naughty Dog','Sony Computer Entertainment','M','Survival Action',39.99);
INSERT INTO products VALUES
('PS107','Destiny','PS4','English','Bungie','Activision','T','Action Adventure',69.99);
INSERT INTO products VALUES
('PS109','Assassins Creed Unity','PS4','French','','Ubisoft','M','Action Adventure',69.99);
INSERT INTO products VALUES
('PS111','Little Big Planet 3','PS4','English','','Sony Computer Entertainment','E','Adventure',62.99);
INSERT INTO products VALUES
('XB101','Minecraft','XBOX 360','English','Mojang','Microsoft','E','Puzzle',19.83);
INSERT INTO products VALUES
('XB103','Assassins Creed Rogue','XBOX 360','English','','Ubisoft','M','Action Adventure',59.99);
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
('NO117','Virtues Last Reward','Nintendo 3DS','Japanese','','Aksys','M','Story',29.99);
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

INSERT INTO employees VALUES
('101','Scott','Melanson','222 Baker St., Sarnia, ON','scott.mel@lambton.ca','5198994563',100999256);
INSERT INTO employees VALUES
('102','Lewis','Menelaws','68 Rich Lane, Sarnia, ON','lewis.men@lambton.ca','5197421122',589362478);
INSERT INTO employees VALUES
('103','Ashika','Shallow','564 Christina, Sarnia, ON','ashallow@lambton.ca','2264236523',321654987);

INSERT INTO customers VALUES
('1001','Cali','Fornia','cali_fornia','fornication8','cali@live.com','1989-01-23','F');
INSERT INTO customers VALUES
('1148','John','Stool','brownstool','89toiletS','stool@yahoo.com','1995-05-15','M');
INSERT INTO customers VALUES
('1254','Matt','Fowler','flyaway','crazy23to','birds@gmail.com','1996-11-30','M');

INSERT INTO orders VALUES
('9101','2003-02-03','1148');
INSERT INTO orders VALUES
('9012','2003-04-26','1001');
INSERT INTO orders VALUES
('9171','2003-07-28','1254');

INSERT INTO order_lines VALUES
('9101','PS117',3);
INSERT INTO order_lines VALUES
('9101','PS103',5);
INSERT INTO order_lines VALUES
('9012','CP105',4);
INSERT INTO order_lines VALUES
('9012','XB109',5);
INSERT INTO order_lines VALUES
('9171','NO107',6);
INSERT INTO order_lines VALUES
('9171','NO105',10);
