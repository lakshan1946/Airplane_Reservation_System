DROP SCHEMA IF EXISTS ARS;
CREATE SCHEMA ARS;

USE ARS;

DROP TABLE IF EXISTS Airplane_Model;
DROP TABLE IF EXISTS Airplane;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Airport;
DROP TABLE IF EXISTS Discount;
DROP TABLE IF EXISTS Class_Price;
DROP TABLE IF EXISTS Registered_User;
DROP TABLE IF EXISTS VisitingUser;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Flight;
DROP TABLE IF EXISTS Reserve;
DROP TABLE IF EXISTS Booking;


DROP FUNCTION IF EXISTS get_age;
DROP FUNCTION IF EXISTS get_class_capacity;


-- DROP PROCEDURE STATEMENTS --

DROP PROCEDURE IF EXISTS get_flights;
DROP PROCEDURE IF EXISTS get_flight_seats;
DROP PROCEDURE IF EXISTS InsertFlight;
DROP PROCEDURE IF EXISTS Flight_DELAY;
DROP PROCEDURE IF EXISTS Flight_Cancel;
DROP PROCEDURE IF EXISTS Flight_Update;
DROP PROCEDURE IF EXISTS User_Register;
DROP PROCEDURE IF EXISTS Add_Visiting_User;
DROP PROCEDURE IF EXISTS Create_Booking;


DROP TRIGGER IF EXISTS FLIGHT_CHECK_BEFORE_INSERT;
DROP TRIGGER IF EXISTS FLIGHT_UPDATE_AFTER_INSERT;
DROP TRIGGER IF EXISTS Update_Membership_Status;




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
  model VARCHAR(25) NOT NULL,
  Platinum_capacity INT ,
  Business_capacity INT ,
  Economy_Capacity INT NOT NULL,
  PRIMARY KEY (model)
);

CREATE TABLE Airplane (
  Plane_ID INT AUTO_INCREMENT,
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
	UserName VARCHAR(25) NOT NULL UNIQUE,
	Passcode VARCHAR(25) NOT NULL,
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
	Last_Name VARCHAR(30),
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
  Plane_ID INT NOT NULL,
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
  PRIMARY KEY (Booking_ID),
  FOREIGN KEY (Reserve_ID) REFERENCES Reserve(Reserve_ID) ON DELETE CASCADE ON UPDATE CASCADE
);




-- 		**************************************************************************************************
-- 		****************************************** Procedures ********************************************
-- 		**************************************************************************************************


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
        Departure_Date_Time DATETIME,
        Model VARCHAR(255)
    );
    INSERT INTO temp_flights (Flight_ID, Departure_Date_Time, Model)
    SELECT Flight.Flight_ID, Flight.Departure_Date_Time, Airplane.Model
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
    IN PlaneID INT,
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
    INSERT INTO Flight (Plane_ID, Departure_Date_Time, Arrival_Date_Time, origin, destination, Base_Price, available_economy, available_business, available_platinum, flight_state)
    VALUES (PlaneID, DepartureDateTime, ArrivalDateTime, Origin, Destination, BasePrice, EconomyCapacity, BusinessCapacity, PlatinumCapacity, 'Scheduled');
    
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
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ALREADY DEPARTURED';
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
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ALREADY DEPARTURED';
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
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User Already Exists With This Passport_ID';
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
----------------- CREATE A BOOKING ---------------
--------------------------------------------------
-- BEFORE PAYMENT --
DELIMITER $$
CREATE PROCEDURE Create_Booking(
    IN Passport_ID VARCHAR(15),
    IN Flight_ID INT,
    IN Seat_No INT,
    IN Class ENUM('Economy', 'Business', 'Platinum'),
    OUT O_price FLOAT,
    OUT O_price_w_d FLOAT,
    OUT Reserve_ID INT
)
BEGIN
    DECLARE basic_price FLOAT;
    DECLARE class_factor FLOAT;
    DECLARE price FLOAT;
    DECLARE discount_1 FLOAT;
    DECLARE final_price FLOAT;
    DECLARE Correct_Seat BOOL;
    DECLARE Platinum INT;
    DECLARE Business INT;
    DECLARE Economy INT;
    
    SET Correct_Seat = 1;
    
    -- Check if a reservation for the given Seat_No and Flight_ID already exists
    CALL Flight_Update();
    IF EXISTS (SELECT 1 FROM Reserve WHERE Reserve.Flight_ID = Flight_ID AND Reserve.Seat_No = Seat_No) THEN
        SET Correct_Seat = 0;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Seat Reserved';
    ELSEIF ((SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Departed-On-Time' OR
            (SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Departed-Delayed' OR
            (SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Landed' OR
            (SELECT flight_state FROM Flight WHERE Flight.Flight_ID = Flight_ID)='Cancelled') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Flight Not Available';
        SET Correct_Seat = 0;
    ELSE
		SET Platinum = get_class_capacity(Flight_ID, 'Platinum');
        SET Business = get_class_capacity(Flight_ID, 'Business');
        SET Economy = get_class_capacity(Flight_ID, 'Economy');
        
        IF (Class = 'Platinum') THEN
            IF ((Seat_No > Platinum) OR (Seat_No <= 0)) THEN
                SET Correct_Seat = 0;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WRONG Seat_No';
            END IF;
        ELSEIF (Class = 'Business') THEN
            IF ((Seat_No <= Platinum) OR (Seat_No > (Platinum+Business))) THEN
                SET Correct_Seat = 0;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WRONG Seat_No';
            END IF;
        ELSEIF (Class = 'Economy') THEN
            IF ((Seat_No <= (Platinum+Business)) OR (Seat_No > (Platinum+Business+Economy))) THEN
                SET Correct_Seat = 0;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'WRONG Seat_No';
            END IF;
        END IF;
    END IF;

    IF (Correct_Seat = 1) THEN
        SELECT Base_Price INTO basic_price FROM Flight WHERE Flight.Flight_ID = Flight_ID LIMIT 1;
        SELECT differ_factor INTO class_factor FROM Class_Price WHERE Class_Price.Class = Class LIMIT 1;

        SET price = basic_price * class_factor;
        IF (SELECT User_Type FROM User WHERE User.Passport_ID = Passport_ID LIMIT 1) = 'Registered' THEN
            UPDATE Registered_USER
            SET No_of_bookings = No_of_bookings + 1
            WHERE Registered_USER.Passport_ID = Passport_ID LIMIT 1;
            
            SELECT Discount
            INTO discount_1
            FROM Discount
            WHERE Membership = (SELECT Membership_status FROM Registered_User WHERE Registered_User.Passport_ID = Passport_ID) LIMIT 1;
            
            SET final_price = price - price * discount_1 / 100;
        ELSE
            SET final_price = price;
        END IF;
		INSERT INTO Reserve (Passport_ID, Flight_ID, Seat_No, Class)
        VALUES (Passport_ID, Flight_ID, Seat_No, Class);
        -- Get the Reserve_ID for the newly inserted reservation
        SET Reserve_ID = LAST_INSERT_ID();
        SET O_price = price;
        SET O_price_w_d = final_price;
    END IF;
END;
$$

DELIMITER ;



--------------------------------------------------
----------------- RESERVE ------------------------
--------------------------------------------------
-- AFTER PAYMENT --
DELIMITER $$
CREATE PROCEDURE Reserve(
    IN Passport_ID VARCHAR(15),
    IN Flight_ID INT,
    IN Seat_No INT,
    IN Class ENUM('Economy', 'Business', 'Platinum'),
    IN Price FLOAT,
    IN Price_W_D FLOAT,
    IN Reserve_ID INT,
    IN PAID BOOL
)
BEGIN
    IF (PAID = 1) THEN
        INSERT INTO Booking (Reserve_ID, Price, Price_With_Discount)
        VALUES (Reserve_ID, Price, Price_W_D);
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
	SELECT r.Passport_ID, ru.First_Name, get_age(ru.Date_of_birth) AS Age, r.Flight_ID
	FROM Reserve r
	INNER JOIN User u ON r.Passport_ID = u.Passport_ID
	INNER JOIN Registered_User ru ON u.Passport_ID = ru.Passport_ID
	WHERE u.User_Type = 'Registered'
	GROUP BY r.Passport_ID, ru.First_Name, r.Flight_ID

	UNION

	SELECT r.Passport_ID, vu.First_Name, get_age(vu.Date_of_Birth) AS Age, r.Flight_ID
	FROM Reserve r
	INNER JOIN User u ON r.Passport_ID = u.Passport_ID
	INNER JOIN Visiting_User vu ON u.Passport_ID = vu.Passport_ID
	WHERE u.User_Type = 'Guest'
	GROUP BY r.Passport_ID, vu.First_Name, vu.Date_of_Birth, r.Flight_ID;





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
        SIGNAL SQLSTATE '45000'
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
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Flight insertion not allowed due to overlapping times';
        END IF;
    END IF;
END;
$$
DELIMITER ;





----------------------------------------------------------------
----- UPDATE MEMBERSHIP STATES WHEN No_of_booking CHANGING.-----
----------------------------------------------------------------
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