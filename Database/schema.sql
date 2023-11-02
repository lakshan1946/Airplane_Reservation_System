DROP SCHEMA IF EXISTS ARS;
CREATE SCHEMA ARS;

USE ARS;


-- DROP TABLES
DROP TABLE IF EXISTS Airplane_Model;
DROP TABLE IF EXISTS Airplane;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Airport;
DROP TABLE IF EXISTS Discount;
DROP TABLE IF EXISTS Class_Price;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Registered_User;
DROP TABLE IF EXISTS VisitingUser;
DROP TABLE IF EXISTS Flight;
DROP TABLE IF EXISTS Reserve;
DROP TABLE IF EXISTS Booking;


-- DROP FUNCTIONS
DROP FUNCTION IF EXISTS get_age;
DROP FUNCTION IF EXISTS get_class_capacity;


-- DROP PROCEDURES
DROP PROCEDURE IF EXISTS Login;
DROP PROCEDURE IF EXISTS get_flights;
DROP PROCEDURE IF EXISTS get_flight_seats;
DROP PROCEDURE IF EXISTS InsertFlight;
DROP PROCEDURE IF EXISTS Flight_DELAY;
DROP PROCEDURE IF EXISTS Flight_Cancel;
DROP PROCEDURE IF EXISTS Flight_Update;
DROP PROCEDURE IF EXISTS User_Register;
DROP PROCEDURE IF EXISTS Add_Visiting_User;
DROP PROCEDURE IF EXISTS Reserve;
DROP PROCEDURE IF EXISTS Book;


-- DROP VIEWS
DROP VIEW IF EXISTS Passenger;
DROP VIEW IF EXISTS Passengers_With_Destination;


-- DROP TRIGGERS
DROP TRIGGER IF EXISTS FLIGHT_CHECK_BEFORE_INSERT;
DROP TRIGGER IF EXISTS FLIGHT_UPDATE_AFTER_INSERT;
DROP TRIGGER IF EXISTS Update_Membership_Status;


-- DROP REQUIRED FUNCTION SET
DROP PROCEDURE IF EXISTS FUNCTION_1;
DROP PROCEDURE IF EXISTS FUNCTION_2;
DROP PROCEDURE IF EXISTS FUNCTION_3;
DROP PROCEDURE IF EXISTS FUNCTION_4;
DROP PROCEDURE IF EXISTS FUNCTION_5;




-- 		*********************************************************************************************
-- 		************************************* Functions *********************************************
-- 		*********************************************************************************************


----------------------------------------------------------------------------
-------------------------------- GET AGE FROM DOB --------------------------
----------------------------------------------------------------------------

DELIMITER $$
CREATE FUNCTION get_age(birthday DATE)
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE age INT;
    SET age = TIMESTAMPDIFF(YEAR, birthday, CURDATE());
    RETURN age;
END;
$$
DELIMITER ;



--------------------------------------------------------------------------------
-------------------------- GET CLASS CAPACITY OF A PLANE -----------------------
--------------------------------------------------------------------------------
DELIMITER $$
CREATE FUNCTION get_class_capacity(Flight_ID INT, Class ENUM('Economy', 'Business', 'Platinum'))
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE capacity INT;    
    IF (Class = 'Platinum') THEN
        SELECT Platinum_capacity INTO capacity
        FROM Flight
        INNER JOIN Airplane ON Flight.Plane_ID = Airplane.Plane_ID
        INNER JOIN Airplane_Model ON Airplane.Model = Airplane_Model.Model
        WHERE Flight.Flight_ID = Flight_ID;
    ELSEIF (Class = 'Business') THEN
        SELECT Business_capacity INTO capacity
        FROM Flight
        INNER JOIN Airplane ON Flight.Plane_ID = Airplane.Plane_ID
        INNER JOIN Airplane_Model ON Airplane.Model = Airplane_Model.Model
        WHERE Flight.Flight_ID = Flight_ID;
    ELSEIF (Class = 'Economy') THEN
        SELECT Economy_capacity INTO capacity
        FROM Flight
        INNER JOIN Airplane ON Flight.Plane_ID = Airplane.Plane_ID
        INNER JOIN Airplane_Model ON Airplane.Model = Airplane_Model.Model
        WHERE Flight.Flight_ID = Flight_ID;
    ELSE
        SET capacity = NULL; -- Handle unknown class
    END IF;    
    RETURN capacity;
END;
$$
DELIMITER ;




-- 		******************************************************************************************
-- 		************************************ Tables **********************************************
-- 		******************************************************************************************


CREATE TABLE Airplane_Model (
  model VARCHAR(25),
  Platinum_capacity INT ,
  Business_capacity INT ,
  Economy_Capacity INT NOT NULL,
  Revenue FLOAT DEFAULT 0,
  PRIMARY KEY (model)
);

CREATE TABLE Airplane (
  Plane_ID VARCHAR(8),
  model VARCHAR(25) NOT NULL,
  PRIMARY KEY (Plane_ID),
  FOREIGN KEY (model) REFERENCES Airplane_Model(model) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Location (
  Location_ID INT,
  location_Name VARCHAR(50) NOT NULL,
  Parent_ID int,
  PRIMARY KEY (Location_ID),
  FOREIGN KEY (Parent_ID) REFERENCES Location(Location_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Airport (
  Airport_code VARCHAR(3) NOT NULL UNIQUE,
  Airport_name VARCHAR(50) NOT NULL,
  Location_ID INT NOT NULL,
  PRIMARY KEY (Airport_code),
  FOREIGN KEY(Location_ID) REFERENCES location(Location_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Discount (
  Membership ENUM('Normal','Frequent','Gold'),
  Discount NUMERIC(5,2),
  PRIMARY KEY (Membership)
);

CREATE TABLE Class_Price (
  Class ENUM('Economy','Business','Platinum'),
  differ_factor Numeric(2,1) NOT NULL,
  PRIMARY KEY (Class)
);

CREATE TABLE User (
  Passport_ID VARCHAR(15),
  User_type ENUM('Registered','Guest'),
  PRIMARY KEY (Passport_ID)
);

CREATE TABLE Registered_User (
	Passport_ID VARCHAR(15) NOT NULL UNIQUE,
	UserName VARCHAR(25) NOT NULL UNIQUE COLLATE utf8mb4_bin,
	Passcode VARCHAR(25) NOT NULL COLLATE utf8mb4_bin,
	First_Name VARCHAR(30) NOT NULL,
	Last_Name VARCHAR(50) NOT NULL,
	Phone_No VARCHAR(15) NOT NULL,
	gender ENUM('Male', 'Female', 'Other'),
	email VARCHAR(50) NOT NULL UNIQUE,
	Date_of_Birth date NOT NULL,
	Address_Line_01 VARCHAR(50) NOT NULL,
	Address_Line_02 VARCHAR(50),
	City VARCHAR(50) NOT NULL,
	Country VARCHAR(50) NOT NULL,
	No_of_bookings INT DEFAULT 0,
	Membership_status ENUM('Normal','Frequent','Gold') DEFAULT 'Normal',
	Joined TIMESTAMP DEFAULT NOW() NOT NULL,
	FOREIGN KEY (Membership_status) REFERENCES Discount(Membership) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Passport_ID) REFERENCES User(Passport_ID) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (Passport_ID)
);

CREATE TABLE Visiting_User (
	User_ID INT AUTO_INCREMENT,
	Passport_ID VARCHAR(15),
	First_Name VARCHAR(30) NOT NULL,
	Last_Name VARCHAR(50),
	Phone_No VARCHAR(15) NOT NULL,
	Date_of_Birth date NOT NULL,
	Address VARCHAR(100) ,
	Country VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	gender ENUM('Male', 'Female', 'Other'),
	PRIMARY KEY (User_ID),
	FOREIGN KEY (Passport_ID) REFERENCES User(Passport_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Flight (
  Flight_ID INT AUTO_INCREMENT,
  Flight_Name VARCHAR(6),
  Plane_ID VARCHAR(8) NOT NULL,
  Departure_Date_Time datetime,
  Arrival_Date_Time datetime,
  origin VARCHAR(3) NOT NULL,
  destination VARCHAR(3) NOT NULL,
  available_economy INT,
  available_business INT,
  available_platinum INT,
  flight_state ENUM(
		'Scheduled',
        'Delayed',
		'Departed-On-Time',
        'Departed-Delayed',
		'Landed',
		'Cancelled') Default 'Scheduled',
  Base_Price FLOAT NOT NULL,
  PRIMARY KEY (Flight_ID),
  FOREIGN KEY (destination) REFERENCES Airport(Airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (origin) REFERENCES Airport(Airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Plane_ID) REFERENCES Airplane(Plane_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Reserve (
  Reserve_ID INT AUTO_INCREMENT,
  Passport_ID VARCHAR(15) NOT NULL,
  Flight_ID INT NOT NULL,
  Seat_No INT NOT NULL,
  Class ENUM('Economy','Business','Platinum'),
  Passenger_Type ENUM('Guest','Normal','Frequent','Gold'),
  PRIMARY KEY (Reserve_ID),
  FOREIGN KEY (Flight_ID) REFERENCES Flight(Flight_ID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (passport_ID) REFERENCES User(Passport_ID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Class) REFERENCES Class_Price(Class) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Booking (
  Booking_ID INT AUTO_INCREMENT,
  Reserve_ID INT NOT NULL,
  Price FLOAT,
  Price_With_Discount FLOAT NOT NULL,
  Passenger_Type ENUM ('Guest','Normal','Frequent','Gold'),
  PRIMARY KEY (Booking_ID),
  FOREIGN KEY (Reserve_ID) REFERENCES Reserve(Reserve_ID) ON DELETE CASCADE ON UPDATE CASCADE
);




-- 		**************************************************************************************************
-- 		****************************************** Indexing **********************************************
-- 		**************************************************************************************************

CREATE INDEX mem_status ON Registered_User(Membership_Status);
CREATE INDEX reserve ON Reserve(Flight_ID);



-- 		**************************************************************************************************
-- 		****************************************** Procedures ********************************************
-- 		**************************************************************************************************

----------------------------------------------------------------------
-------------------------- CHECK USER LOGIN --------------------------
----------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE Login(
	IN I_UserName VARCHAR(25),
    IN I_Passcode VARCHAR(25))
BEGIN
	DECLARE the_passcode VARCHAR(25);
    SET the_passcode = NULL;
	SELECT Passcode INTO the_passcode
	FROM Registered_User r
	WHERE r.UserName = I_UserName;
    
    IF (the_passcode IS NULL) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NO USER BY THIS NAME';
	ELSEIF (BINARY I_Passcode = the_passcode) THEN
		SELECT Passport_ID, First_Name, Last_Name, Membership_Status
        FROM Registered_User r
        Where r.UserName = I_UserName;
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'INCORRECT PASSWORD';
	END IF;
END;
$$
DELIMITER ;
		
		

----------------------------------------------------------------------
-------------------------- GET AVAILABLE FLIGHTS ---------------------
----------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE get_flights(
    IN i_Departure_Date DATE,
    IN i_origin VARCHAR(3),
    IN i_destination VARCHAR(3))
BEGIN
	CALL Flight_Update();
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_flights (
        Flight_ID INT,
        Flight_Name VARCHAR(6),
        Departure_Date_Time DATETIME,
        Model VARCHAR(255)
    );
    INSERT INTO temp_flights (Flight_ID, Flight_Name, Departure_Date_Time, Model)
    SELECT Flight.Flight_ID, Flight_Name, Flight.Departure_Date_Time, Airplane.Model
    FROM Flight
    INNER JOIN Airplane ON Flight.Plane_ID = Airplane.Plane_ID
    WHERE DATE(Flight.Departure_Date_Time) = i_Departure_Date
    AND Flight.origin = i_origin
    AND Flight.destination = i_destination
    AND (Flight.flight_state = 'Scheduled' OR Flight.flight_state = 'Delayed')
    ORDER BY Flight.Departure_Date_Time ASC;
    
    SELECT * FROM temp_flights;
    DROP TEMPORARY TABLE IF EXISTS temp_flights;
END;
$$
DELIMITER ;


--------------------------------------------------------------------
----------------------- GET AVAILABLE SEATS ------------------------
--------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE get_flight_seats(
    IN i_Flight_ID INT,
    IN i_Class ENUM('Economy', 'Business', 'Platinum'))
BEGIN
	DECLARE cur_seat INT DEFAULT 1;
    DECLARE min_capacity INT;
    DECLARE max_capacity INT;
    CALL Flight_Update();
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_seats (
        Seat_No INT,
        Availability INT
    );
    -- Get the maximum capacity for the selected class
    IF (i_Class = 'Platinum') THEN
		SET min_capacity = 1;
        SET max_capacity = get_class_capacity(i_Flight_ID, i_Class);
	ELSEIF (i_Class = 'Business') THEN
		SET min_capacity = get_class_capacity(i_Flight_ID, 'Platinum')+1;
        SET max_capacity = get_class_capacity(i_Flight_ID, 'Platinum')+get_class_capacity(i_Flight_ID, i_Class);
	ELSE
		SET min_capacity = get_class_capacity(i_Flight_ID, 'Business')+1;
        SET max_capacity = get_class_capacity(i_Flight_ID, 'Business')+get_class_capacity(i_Flight_ID, i_Class);
    END IF;
    -- Insert seat availability information
    SET cur_seat = min_capacity;
    WHILE cur_seat <= max_capacity DO
        INSERT INTO temp_seats (Seat_No, Availability)
        SELECT cur_seat,
               CASE
                   WHEN cur_seat IN (SELECT Seat_No FROM Reserve WHERE Flight_ID = i_Flight_ID) THEN 0
                   ELSE 1
               END;
        SET cur_seat = cur_seat + 1;
    END WHILE;
    SELECT * FROM temp_seats;
    DROP TEMPORARY TABLE IF EXISTS temp_seats;
END;
$$
DELIMITER ;


------------------------------------------------------------------
----------------------- INSERT A FLIGHT --------------------------
------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE InsertFlight(
    IN PlaneID VARCHAR(8),
    IN Flight_Name VARCHAR(6),
    IN DepartureDateTime DATETIME,
    IN ArrivalDateTime DATETIME,
    IN Origin VARCHAR(3),
    IN Destination VARCHAR(3),
    IN BasePrice FLOAT
)
BEGIN
    DECLARE EconomyCapacity INT;
    DECLARE BusinessCapacity INT;
    DECLARE PlatinumCapacity INT;

    -- Get the airplane model associated with the PlaneID
    SET @Model = (SELECT Model FROM Airplane WHERE Plane_ID = PlaneID);

    -- Get the capacities from the Airplane_Model table for the associated model
    SELECT Economy_Capacity, Business_Capacity, Platinum_Capacity
    INTO EconomyCapacity, BusinessCapacity, PlatinumCapacity
    FROM Airplane_Model
    WHERE Model = @Model;

    -- Insert the flight with calculated capacities
    INSERT INTO Flight (Flight_Name, Plane_ID, Departure_Date_Time, Arrival_Date_Time, origin, destination, Base_Price, available_economy, available_business, available_platinum, flight_state)
    VALUES (Flight_Name, PlaneID, DepartureDateTime, ArrivalDateTime, Origin, Destination, BasePrice, EconomyCapacity, BusinessCapacity, PlatinumCapacity, 'Scheduled');
    
    CALL Flight_Update();
    
END $$
DELIMITER ;



---------------------------------------------------------------------
-------------------- ADD DELAY TO A FLIGHT --------------------------
---------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE Flight_DELAY(
    IN I_Flight_ID INT,
    IN I_Delay_Time TIME
)
BEGIN
    DECLARE C_Departure_Date_Time DATETIME;
    DECLARE Now DATETIME;

    SELECT Departure_Date_Time INTO C_Departure_Date_Time
    FROM Flight
    WHERE Flight_ID = I_Flight_ID;

    SET Now = NOW();

    IF Now <= C_Departure_Date_Time THEN
        UPDATE Flight
        SET flight_state = 'Delayed',
            Departure_Date_Time = DATE_ADD(Departure_Date_Time, INTERVAL I_Delay_Time SECOND),
            Arrival_Date_Time = DATE_ADD(Arrival_Date_Time, INTERVAL I_Delay_Time SECOND)
        WHERE Flight_ID = I_Flight_ID;
    ELSE
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'ALREADY DEPARTURED';
    END IF;
END;
$$
DELIMITER;


----------------------------------------------------------------
----------------------- CANCEL A FLIGHT ------------------------
----------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE Flight_Cancel(
	IN Flight_ID INT
)
BEGIN
	IF (NOW() <= (SELECT Departure_Date_TIME
				  FROM Flight
                  WHERE Flight.Flight_ID = Flight_ID)) THEN
		UPDATE Flight
        SET flight_state = 'Canceled';
	ELSE
		SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = 'ALREADY DEPARTURED';
	END IF;
END $$
DELIMITER;



--------------------------------------------------------------------
----------------------- UPDATE FLIGHT TABLE ------------------------
--------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE Flight_Update()
BEGIN
    UPDATE Flight
    SET flight_state =
        CASE
            WHEN NOW() > Departure_Date_Time AND flight_state = 'Scheduled' THEN 'Departed-On-Time'
            WHEN NOW() > Departure_Date_Time AND flight_state = 'Delayed' THEN 'Departed-Delayed'
            WHEN NOW() > Arrival_Date_Time THEN 'Landed'
            ELSE flight_state
        END;
END;
$$
DELIMITER;


-------------------------------------------------------------
-------------------- REGISTER A NEW USER --------------------
-------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE User_Register(
    IN Passport_ID VARCHAR(15),
    IN UserName VARCHAR(25),
    IN Passcode VARCHAR(25),
    IN First_Name VARCHAR(30),
    IN Last_Name VARCHAR(50),
    IN Phone_No VARCHAR(15),
    IN gender ENUM('Male', 'Female', 'Other'),
    IN email VARCHAR(50),
    IN Date_of_Birth DATE,
    IN Address_Line_01 VARCHAR(50),
    IN Address_Line_02 VARCHAR(50),
    IN City VARCHAR(50),
    IN Country VARCHAR(50)
)
BEGIN
    DECLARE user_exists INT;
    
    SELECT 1 INTO user_exists FROM Registered_User WHERE Registered_User.Passport_ID = Passport_ID;
    
    IF user_exists IS NOT NULL THEN
        SIGNAL SQLSTATE '45003' SET MESSAGE_TEXT = 'User Already Exists With This Passport_ID';
    ELSE
        INSERT INTO USER (Passport_ID, User_Type) VALUES (Passport_ID, 'Registered');
        INSERT INTO Registered_User (Passport_ID, UserName, Passcode, First_Name, Last_Name, Phone_No, gender, email, Date_of_Birth, Address_Line_01, Address_Line_02, City, Country)
        VALUES (Passport_ID, UserName, Passcode, First_Name, Last_Name, Phone_No, gender, email, Date_of_Birth, Address_Line_01, Address_Line_02, City, Country);
    END IF;
END $$
DELIMITER ;


-------------------------------------------------------------
-------------------- ADD A VISITING USER --------------------
-------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE Add_Visiting_User (
	IN Passport_ID VARCHAR(15),
	IN First_Name VARCHAR(30),
	IN Last_Name VARCHAR(30),
	IN Phone_No VARCHAR(15),
	IN Date_of_Birth date,
	IN Address VARCHAR(100),
    IN Country VARCHAR(50),
	IN email VARCHAR(50),
	IN gender ENUM('Male', 'Female', 'Other')
)
BEGIN
    DECLARE user_exists INT;    
    SELECT 1 INTO user_exists FROM User WHERE User.Passport_ID = Passport_ID;
    
    IF user_exists IS NULL THEN
        INSERT INTO USER(Passport_ID,User_Type)
		VALUES (Passport_ID,'Guest');
    END IF;
    INSERT INTO Visiting_User(Passport_ID,
							First_Name,
                            Last_Name,
                            Phone_No,
							Date_of_Birth,
                            Address,
                            Country,
                            email,
                            gender
)
	VALUES
    (Passport_ID,First_Name,Last_Name,Phone_No,Date_of_Birth,Address,Country,email,gender);
END $$
DELIMITER;


--------------------------------------------------
----------------- RESERVE TEMPORARLY -------------
--------------------------------------------------
-- BEFORE PAYMENT --
DELIMITER $$
CREATE PROCEDURE Reserve(
    IN Passport_ID VARCHAR(15),
    IN Flight_ID INT,
    IN Seat_No INT,
    IN User_Type ENUM('Registered','Guest'),
    OUT O_price FLOAT,
    OUT O_price_w_d FLOAT,
    OUT Reserve_ID INT,
    OUT O_Passenger_Type ENUM('Guest','Normal','Frequent','Gold')
)
BEGIN
	DECLARE class ENUM('Platinum','Business','Economy');
    DECLARE basic_price FLOAT;
    DECLARE class_factor FLOAT;
    DECLARE price FLOAT;
    DECLARE discount_1 FLOAT;
    DECLARE final_price FLOAT;
    DECLARE Correct_Seat BOOL;
    DECLARE Platinum INT;
    DECLARE Business INT;
    DECLARE Economy INT;
    DECLARE Passenger_Type ENUM('Guest','Normal','Frequent','Gold');
    
    SET Correct_Seat = 1;
    
    -- Check if a reservation for the given Seat_No and Flight_ID already exists
    CALL Flight_Update();
    IF EXISTS (SELECT 1 FROM Reserve WHERE Reserve.Flight_ID = Flight_ID AND Reserve.Seat_No = Seat_No) THEN
        SET Correct_Seat = 0;
        SIGNAL SQLSTATE '45004' SET MESSAGE_TEXT = 'This Seat Reserved';
    ELSEIF ((SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Departed-On-Time' OR
            (SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Departed-Delayed' OR
            (SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Landed' OR
            (SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Cancelled') THEN
        SET Correct_Seat = 0;
        SIGNAL SQLSTATE '45005' SET MESSAGE_TEXT = 'Flight Not Available';
    ELSE
		SET Platinum = get_class_capacity(Flight_ID, 'Platinum');
        SET Business = get_class_capacity(Flight_ID, 'Business');
        SET Economy = get_class_capacity(Flight_ID, 'Economy');
        
        IF (0 < Seat_No AND Seat_No <= Platinum) THEN
			SET class = 'Platinum';
        ELSEIF (Platinum < Seat_No AND Seat_No <= (Platinum+Business)) THEN
			SET class = 'Business';
        ELSEIF ((Platinum+Business) < Seat_No AND Seat_No <= (Platinum+Business+Economy)) THEN
			SET class = 'Economy';
		ELSE
			SIGNAL SQLSTATE '45006' SET MESSAGE_TEXT = 'WRONG Seat_No';
        END IF;
    END IF;

    IF (Correct_Seat = 1) THEN
        SELECT Base_Price INTO basic_price FROM Flight WHERE Flight.Flight_ID = Flight_ID LIMIT 1;
        SELECT differ_factor INTO class_factor FROM Class_Price WHERE Class_Price.Class = class LIMIT 1;

        SET price = basic_price * class_factor;
        IF (User_Type = 'Registered') THEN
        
            SELECT Membership_status INTO Passenger_Type
            FROM Registered_User
            WHERE Registered_User.Passport_ID = Passport_ID;
            
            SELECT Discount
            INTO discount_1
            FROM Discount
            WHERE Membership = Passenger_Type;
            
            SET final_price = price - price * discount_1 / 100;
        ELSE
            SET final_price = price;
            SET Passenger_Type = 'Guest';
        END IF;
		INSERT INTO Reserve (Passport_ID, Flight_ID, Seat_No, Class, Passenger_Type)
        VALUES (Passport_ID, Flight_ID, Seat_No, class, Passenger_Type);
        -- Get the Reserve_ID for the newly inserted reservation
        SET Reserve_ID = LAST_INSERT_ID();
        SET O_price = price;
        SET O_price_w_d = final_price;
        SET O_Passenger_Type = Passenger_Type;
    END IF;
END;
$$

DELIMITER ;



--------------------------------------------------
----------------- RESERVE ------------------------
--------------------------------------------------
-- AFTER PAYMENT --
DELIMITER $$
CREATE PROCEDURE Book(
	IN Reserve_ID INT,
    IN Price FLOAT,
    IN Price_W_D FLOAT,
    IN PAID BOOL
)
BEGIN    
    IF (PAID = 1) THEN
		SELECT Flight_ID, Passport_ID, Class, Passenger_Type INTO @flight_id, @passport, @class, @passengertype
        FROM Reserve r
        WHERE r.Reserve_ID = Reserve_ID;
        
        -- Update No of Bookings
        IF (@passengertype='Normal' OR @passengertype='Frequent' OR @passengertype='Gold') THEN
			UPDATE Registered_USER
			SET No_of_bookings = No_of_bookings + 1
			WHERE Registered_USER.Passport_ID = @passport;
        END IF;
        -- Update Revenue
        UPDATE Airplane_Model am
        SET Revenue = Revenue + Price_W_D
        WHERE am.model IN (SELECT model
						   FROM Airplane a
                           INNER JOIN Flight f
                           USING (Plane_ID)
                           WHERE f.Flight_ID = @flight_id);
        
        -- Update Flight Seat Availability
        IF (@class='Platinum') THEN
			UPDATE Flight f
			SET f.available_platinum = f.available_platinum - 1
            WHERE f.Flight_ID = @flight_id;
		ELSEIF (@class='Business') THEN
			UPDATE Flight f
			SET f.available_business = f.available_Business - 1
            WHERE f.Flight_ID = @flight_id;
		ELSE
			UPDATE Flight f
			SET f.available_economy = f.available_economy - 1
            WHERE f.Flight_ID = @flight_id;
		END IF;
        
        INSERT INTO Booking (Reserve_ID, Price, Price_With_Discount, Passenger_Type)
        VALUES (Reserve_ID, Price, Price_W_D, @passengertype);
	ELSE
		DELETE FROM Reserve
        WHERE Reserve.Reserve_ID = Reserve_ID;
	END IF;
END;
$$
DELIMITER ;




-- 		*********************************************************************************************
-- 		**************************************** VIEWS **********************************************
-- 		*********************************************************************************************


CREATE VIEW Passenger AS
	SELECT r.Passport_ID, ru.First_Name, ru.Last_Name, get_age(ru.Date_of_birth) AS Age, r.Flight_ID
	FROM Reserve r
	INNER JOIN User u ON r.Passport_ID = u.Passport_ID
	INNER JOIN Registered_User ru ON u.Passport_ID = ru.Passport_ID
	WHERE u.User_Type = 'Registered'
	GROUP BY r.Passport_ID, ru.First_Name, ru.Last_Name, r.Flight_ID

	UNION

	SELECT r.Passport_ID, vu.First_Name, vu.Last_Name, get_age(vu.Date_of_Birth) AS Age, r.Flight_ID
	FROM Reserve r
	INNER JOIN User u ON r.Passport_ID = u.Passport_ID
	INNER JOIN Visiting_User vu ON u.Passport_ID = vu.Passport_ID
	WHERE u.User_Type = 'Guest'
	GROUP BY r.Passport_ID, vu.First_Name, vu.Last_Name, vu.Date_of_Birth, r.Flight_ID;




CREATE VIEW Passengers_With_Destination AS
	SELECT r.Passport_ID, f.Departure_Date_Time, f.destination
    FROM Reserve r
    INNER JOIN Flight f
    ON r.Flight_ID = f.Flight_ID
    ORDER BY Departure_Date_Time;





-- 		*********************************************************************************************
-- 		**************************************** Triggers *******************************************
-- 		*********************************************************************************************

-------------------------------------------------------------
----- SCHEDULES WITH SAME PLANE CAN NOT BE OVERLAPPED.-------
----- CAN NOT ADD NON-EXISTING PLANES TO SCHEDULES. ---------
-------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER FLIGHT_CHECK_BEFORE_INSERT
BEFORE INSERT ON FLIGHT
FOR EACH ROW
BEGIN
    DECLARE plane_count INT;

    -- Check if the Plane_ID exists in the Airplane table
    SELECT COUNT(*) INTO plane_count
    FROM Airplane
    WHERE Plane_ID = NEW.Plane_ID;

    IF plane_count = 0 THEN
        SIGNAL SQLSTATE '45009'
        SET MESSAGE_TEXT = 'Flight insertion not allowed due to error in Plane_ID';
    ELSE
        -- Check for overlapping times with existing flights
        IF EXISTS (
            SELECT 1
            FROM Flight
            WHERE NEW.Plane_ID = Plane_ID
			AND (
				(NEW.Departure_Date_Time BETWEEN Departure_Date_Time AND DATE_ADD(Arrival_Date_Time, INTERVAL 1 HOUR))
				OR
				(NEW.Arrival_Date_Time BETWEEN DATE_SUB(Departure_Date_Time, INTERVAL 1 HOUR) AND Arrival_Date_Time)
				OR
				(NEW.Departure_Date_Time <= Departure_Date_Time AND NEW.Arrival_Date_Time >= Arrival_Date_Time)
                )
        ) THEN
            SIGNAL SQLSTATE '45010'
            SET MESSAGE_TEXT = 'Flight insertion not allowed due to overlapping times';
        END IF;
    END IF;
END;
$$
DELIMITER ;





--------------------------------------------------------------------
----- UPDATE MEMBERSHIP STATES WHEN No_of_booking HAS CHANNGED.-----
--------------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER Update_Membership_Status
BEFORE UPDATE ON Registered_User
FOR EACH ROW
BEGIN
    IF NEW.No_of_bookings >= 15 THEN
        SET NEW.Membership_status = 'Gold';
    ELSEIF NEW.No_of_bookings >= 5 THEN
        SET NEW.Membership_status = 'Frequent';
    ELSE
        SET NEW.Membership_status = 'Normal';
    END IF;
END;
$$
DELIMITER ;










-- 		*********************************************************************************************
-- 		******************************* REQUIRED FUNCTION SET ***************************************
-- 		*********************************************************************************************


-- Given a flight no, all passengers travelling in it (next immediate flight) below age 18, above age 18
DELIMITER $$
CREATE PROCEDURE FUNCTION_1(
	IN Flight_ID  INT,
    IN Below_18 BOOL)
BEGIN
    IF (Below_18 = 1) THEN
        SELECT Passport_ID,First_Name,Last_Name,Age
        FROM Passenger
        WHERE Passenger.Flight_ID = Flight_ID
        AND Passenger.Age < 18
        ORDER BY Age ASC;
	ELSE
        SELECT Passport_ID,First_Name,Last_Name,Age
        FROM Passenger
        WHERE Passenger.Flight_ID = Flight_ID
        AND Passenger.Age >= 18
        ORDER BY Age ASC;
	END IF;
END;
$$
DELIMITER ;


-- Given a date range, number of passengers travelling to a given destination
DELIMITER $$
CREATE PROCEDURE FUNCTION_2(
	IN Start_Date  DATE,
    IN End_Date DATE,
    IN Destination VARCHAR(3) )
BEGIN
    SELECT COUNT(Passport_ID) AS Count
    FROM Passengers_With_Destination p
    WHERE (p.Departure_Date_Time BETWEEN Start_Date AND End_Date)
    AND p.destination = Destination;
END;
$$
DELIMITER ;


-- Given a date range, number of bookings by each passenger type
DELIMITER $$
CREATE PROCEDURE FUNCTION_3(
	IN Start_Date DATE,
	IN End_Date DATE )
BEGIN
	SELECT
		SUM(CASE WHEN b.Passenger_Type = 'Guest' THEN 1 ELSE 0 END) AS sum_Guest,
		SUM(CASE WHEN b.Passenger_Type = 'Normal' THEN 1 ELSE 0 END) AS sum_Normal,
		SUM(CASE WHEN b.Passenger_Type = 'Frequent' THEN 1 ELSE 0 END) AS sum_Frequent,
		SUM(CASE WHEN b.Passenger_Type = 'Gold' THEN 1 ELSE 0 END) AS sum_Gold
	FROM Booking b
	INNER JOIN Reserve USING(Reserve_ID)
	INNER JOIN Flight f USING(Flight_ID)
	WHERE (f.Departure_Date_Time BETWEEN Start_Date AND End_Date);
END;
$$
DELIMITER ;



-- Given origin and destination, all past flights, states, passenger counts data
DELIMITER $$
CREATE PROCEDURE FUNCTION_4(
	IN I_Origin VARCHAR(3),
    IN I_Destination VARCHAR(3))
BEGIN
	SELECT 
        Flight_ID, 
        flight_state,
        (get_class_capacity(Flight_ID,'Platinum')-f.available_platinum) AS Platinum_Count,
        (get_class_capacity(Flight_ID,'Business')-f.available_business) AS Business_Count,
        (get_class_capacity(Flight_ID,'Economy')-f.available_economy) AS Economy_Count
    FROM Flight f
    WHERE f.origin = I_Origin AND f.destination = I_Destination;
END
$$
DELIMITER ;



-- Total revenue generated by each Aircraft type
DELIMITER $$
CREATE PROCEDURE FUNCTION_5()
BEGIN
	SELECT model, Revenue
    FROM Airplane_Model;
END;
$$
DELIMITER ;