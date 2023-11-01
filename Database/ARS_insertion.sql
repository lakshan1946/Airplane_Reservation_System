use ars;
SET SQL_SAFE_UPDATES = 0;

DELETE FROM Airplane_Model;
DELETE FROM Airplane;
DELETE FROM Discount;
DELETE FROM Class_Price;
DELETE FROM Location;
DELETE FROM Airport;
DELETE FROM Flight;
DELETE FROM Registered_User;
DELETE FROM Visiting_User;
DELETE FROM Reserve;
DELETE FROM Booking;


-- **********************************************************************************************
-- ******************************** INITIAL INSERTIONS ****************************************** 
-- **********************************************************************************************


-- Inserting data into the Airplane_Model table
INSERT INTO Airplane_Model (model, Platinum_capacity, Business_capacity, Economy_Capacity)
VALUES
  ('Airbus A380', 12, 88, 420),
  ('Boeing 737', 8, 28, 90),
  ('Boeing 757', 10, 40, 150);


-- Inserting data into the Airplane table
INSERT INTO Airplane (Plane_ID, model)
VALUES
  ('Plane1','Boeing 737'),
  ('Plane2','Boeing 737'),
  ('Plane3','Boeing 737'),
  ('Plane4','Boeing 757'),
  ('Plane5','Boeing 757'),
  ('Plane6','Boeing 757'),
  ('Plane7','Boeing 757'),
  ('Plane8','Airbus A380');


-- Inserting data into the Discount table
INSERT INTO Discount (Membership, Discount)
VALUES
  ('Normal', 0.00),
  ('Frequent', 5.00),
  ('Gold', 9.00);


-- Inserting data into the Class_Price table
INSERT INTO Class_Price (Class, differ_factor)
VALUES
  ('Economy', 1.0),
  ('Business', 2.0),
  ('Platinum', 3.5);


-- Inserting data into the Location table
INSERT INTO Location (Location_ID, location_Name, Parent_ID)
VALUES
  (1, 'Indonesia', NULL),
  (2, 'Sri Lanka', NULL),
  (3, 'India', NULL),
  (4, 'Thailand', NULL),
  (5, 'Singapore', NULL),
  (11, 'Banten', 1),
  (111, 'Tangerang City', 11),
  (12, 'Bali', 1),
  (21, 'Colombo', 2),
  (22, 'Hambantota', 2),
  (31, 'Delhi', 3),
  (311, 'New Delhi', 31),
  (32, 'Maharashtra', 3),
  (321, 'Mumbai', 32),
  (33, 'Tamil Nadu', 3),
  (331, 'Chennai', 33),
  (41, 'Samut Prakan', 4),
  (411, 'Bang Phli District', 41),
  (42, 'Bangkok', 4),
  (51, 'Changi', 5);


-- Inserting airports into the Airport table
INSERT INTO Airport (Airport_code, Airport_name, Location_ID)
VALUES
  ('CGK', 'Soekarno-Hatta International Airport', 111), -- Jakarta, Indonesia
  ('DPS', 'Ngurah Rai International Airport', 12),   -- Bali, Indonesia
  ('BIA', 'Bandaranaike International Airport', 21),  -- Colombo, Sri Lanka
  ('HRI', 'Mattala Rajapaksa International Airport', 22),  -- Hambantota, Sri Lanka
  ('DEL', 'Indira Gandhi International Airport', 311),  -- Delhi, India
  ('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 321),  -- Mumbai, India
  ('MAA', 'Chennai International Airport', 331),  -- Chennai, India
  ('BKK', 'Suvarnabhumi Airport', 411),  -- Bangkok, Thailand
  ('DMK', 'Don Mueang International Airport', 42),  -- Bangkok, Thailand
  ('SIN', 'Changi Airport', 51);  -- Singapore


-- Inserting data into the Flight table
-- Flights between Indonesian Airports
CALL InsertFlight('Plane1', 'VB111', '2023-11-02 08:00:00', '2023-11-02 09:00:00', 'CGK', 'DPS', 50.00);
CALL InsertFlight('Plane2', 'VB112', '2023-11-02 14:00:00', '2023-11-02 15:00:00', 'DPS', 'CGK', 50.00);
CALL InsertFlight('Plane1', 'VB111', '2023-11-03 08:00:00', '2023-11-03 10:00:00', 'CGK', 'DPS', 50.00);
CALL InsertFlight('Plane1', 'VB113', '2023-11-03 18:00:00', '2023-11-03 19:00:00', 'CGK', 'DPS', 50.00);
CALL InsertFlight('Plane2', 'VB121', '2023-11-05 08:00:00', '2023-11-05 10:00:00', 'CGK', 'DPS', 50.00);
CALL InsertFlight('Plane1', 'VB114', '2023-11-05 09:00:00', '2023-11-05 10:00:00', 'DPS', 'CGK', 50.00);
CALL InsertFlight('Plane1', 'VB111', '2023-11-07 08:00:00', '2023-11-07 10:00:00', 'CGK', 'DPS', 50.00);
CALL InsertFlight('Plane1', 'VB112', '2023-11-08 14:00:00', '2023-11-08 15:00:00', 'DPS', 'CGK', 50.00);
CALL InsertFlight('Plane2', 'VB115', '2023-11-08 18:00:00', '2023-11-08 19:00:00', 'DPS', 'CGK', 50.00);
CALL InsertFlight('Plane1', 'VB111', '2023-11-09 08:00:00', '2023-11-09 10:00:00', 'CGK', 'DPS', 50.00);

-- Flights between Indonesian and Sri Lankan airports
CALL InsertFlight('Plane3', 'VB121', '2023-11-02 08:00:00', '2023-11-02 10:00:00', 'CGK', 'BIA', 300.00);
CALL InsertFlight('Plane3', 'VB212', '2023-11-03 09:00:00', '2023-11-03 11:00:00', 'BIA', 'CGK', 300.00);
CALL InsertFlight('Plane5', 'VB121', '2023-11-05 08:00:00', '2023-11-05 10:00:00', 'CGK', 'BIA', 300.00);
CALL InsertFlight('Plane5', 'VB212', '2023-11-07 09:00:00', '2023-11-07 11:00:00', 'BIA', 'CGK', 300.00);
CALL InsertFlight('Plane7', 'VB123', '2023-11-09 15:00:00', '2023-11-09 17:15:00', 'DPS', 'HRI', 250.00);

-- Flights between Indonesian and Indian airports
CALL InsertFlight('Plane5', 'VB131', '2023-11-03 10:00:00', '2023-11-03 12:00:00', 'CGK', 'DEL', 350.00);
CALL InsertFlight('Plane5', 'VB311', '2023-11-04 11:00:00', '2023-11-04 13:00:00', 'DEL', 'CGK', 350.00);
CALL InsertFlight('Plane7', 'VB314', '2023-11-05 06:00:00', '2023-11-05 07:45:00', 'MAA', 'DPS', 420.00);
CALL InsertFlight('Plane8', 'VB132', '2023-11-07 12:00:00', '2023-11-07 14:00:00', 'DPS', 'BOM', 370.00);
CALL InsertFlight('Plane8', 'VB312', '2023-11-08 13:00:00', '2023-11-08 15:00:00', 'BOM', 'CGK', 370.00);
CALL InsertFlight('Plane1', 'VB133', '2023-11-08 19:00:00', '2023-11-08 21:30:00', 'CGK', 'MAA', 410.00);
CALL InsertFlight('Plane1', 'VB313', '2023-11-09 18:00:00', '2023-11-09 20:30:00', 'MAA', 'CGK', 410.00);
CALL InsertFlight('Plane5', 'VB131', '2023-11-09 10:00:00', '2023-11-09 12:00:00', 'CGK', 'DEL', 350.00);

-- Flights between Indonesian and Thai airports
CALL InsertFlight('Plane3', 'VB141', '2023-11-04 08:00:00', '2023-11-04 10:00:00', 'CGK', 'BKK', 320.00);
CALL InsertFlight('Plane3', 'VB411', '2023-11-06 09:00:00', '2023-11-06 11:00:00', 'BKK', 'CGK', 320.00);
CALL InsertFlight('Plane4', 'VB142', '2023-11-05 14:00:00', '2023-11-05 16:00:00', 'DPS', 'DMK', 340.00);
CALL InsertFlight('Plane4', 'VB412', '2023-11-06 12:00:00', '2023-11-06 14:00:00', 'DMK', 'DPS', 340.00);

-- Flights between Indonesian and Singaporean airports
CALL InsertFlight('Plane2', 'VB151', '2023-11-04 10:00:00', '2023-11-04 12:00:00', 'CGK', 'SIN', 180.00);
CALL InsertFlight('Plane2', 'VB511', '2023-11-04 15:00:00', '2023-11-04 17:00:00', 'SIN', 'CGK', 180.00);
CALL InsertFlight('Plane8', 'VB152', '2023-11-08 20:00:00', '2023-11-08 22:00:00', 'CGK', 'SIN', 180.00);
CALL InsertFlight('Plane8', 'VB512', '2023-11-09 11:00:00', '2023-11-09 13:00:00', 'SIN', 'CGK', 180.00);
CALL InsertFlight('Plane4', 'VB153', '2023-11-05 09:00:00', '2023-11-05 11:00:00', 'SIN', 'DPS', 190.00);
CALL InsertFlight('Plane4', 'VB513', '2023-11-06 08:00:00', '2023-11-06 10:00:00', 'DPS', 'SIN', 190.00);






-- Overlapping
-- CALL InsertFlight(4, '2023-10-07 09:00:00', '2023-10-07 12:00:00', 'SIN', 'CGK', 180.00);

CALL Flight_DELAY(5,'00:00:30');



CALL User_Register('AB123456', 'JohnDoe', 'securepass1', 'John', 'Doe', '123-456-7890', 'Male', 'john.doe@example.com', '1990-01-15', '123 Main St', 'Apt 4B', 'New York', 'USA');
CALL User_Register('CD789012', 'JaneSmith', 'mypassword2', 'Jane', 'Smith', '987-654-3210', 'Female', 'jane.smith@example.com', '1985-03-20', '456 Elm St', NULL, 'Los Angeles', 'USA');
CALL User_Register('EF345678', 'RobJohnson', 'password123', 'Robert', 'Johnson', '555-123-4567', 'Male', 'robert.j@example.com', '2008-08-10', '789 Oak St', 'Apt 2C', 'Chicago', 'USA');
CALL User_Register('GH901234', 'MariaGarcia', 'mypass456', 'Maria', 'Garcia', '555-987-6543', 'Female', 'maria.garcia@example.com', '2006-05-25', '567 Pine St', NULL, 'Houston', 'USA');
CALL User_Register('IJ567890', 'MikeBrown', 'secretpass5', 'Michael', 'Brown', '555-888-2222', 'Male', 'michael.b@example.com', '1988-11-30', '456 Birch St', 'Apt 3D', 'Miami', 'USA');
CALL User_Register('KL234563', 'EmilyWilson', 'pass4emily', 'Emily', 'Wilson', '555-777-1111', 'Female', 'emily.w@example.com', '2007-02-12', '789 Cedar St', NULL, 'San Francisco', 'USA');
CALL User_Register('MN890123', 'DaveLee', 'davedavedave', 'David', 'Lee', '555-222-3333', 'Male', 'david.lee@example.com', '1975-04-18', '890 Maple St', 'Apt 1A', 'Seattle', 'USA');
CALL User_Register('OP123456', 'SophiaHarris', 'pass4soph', 'Sophia', 'Harris', '555-333-4444', 'Female', 'sophia.h@example.com', '1995-12-05', '654 Redwood St', NULL, 'Dallas', 'USA');
CALL User_Register('QR234567', 'WillJones', 'willy123', 'William', 'Jones', '555-444-5555', 'Male', 'william.j@example.com', '1976-09-22', '432 Spruce St', 'Apt 2B', 'Boston', 'USA');
CALL User_Register('ST345678', 'OliviaA', 'oliviapass', 'Olivia', 'Anderson', '555-555-6666', 'Female', 'olivia.a@example.com', '1986-07-07', '765 Walnut St', NULL, 'Philadelphia', 'USA');
CALL User_Register('UV456789', 'JamesW', 'jamespass123', 'James', 'Wilson', '555-666-7777', 'Male', 'james.w@example.com', '1991-03-28', '543 Pine St', 'Apt 3D', 'Phoenix', 'USA');
CALL User_Register('WX567890', 'IsabellaM', 'isabellapw', 'Isabella', 'Martinez', '555-777-8888', 'Female', 'isabella.m@example.com', '1989-10-15', '876 Elm St', NULL, 'Denver', 'USA');
CALL User_Register('YZ678901', 'DanielW', 'danieldpass', 'Daniel', 'White', '555-888-9999', 'Male', 'daniel.w@example.com', '1983-01-09', '765 Oak St', 'Apt 4C', 'San Diego', 'USA');
CALL User_Register('AB789012', 'AvaLopez', 'avapassword', 'Ava', 'Lopez', '555-999-0000', 'Female', 'ava.l@example.com', '2007-06-12', '654 Cedar St', NULL, 'Portland', 'USA');



CALL Add_Visiting_User('VP20001', 'William', 'Thompson', '555-123-4567', '1980-08-25', '789 Park Ave, New York', 'USA', 'william.thompson@example.com', 'Male');
CALL Add_Visiting_User('VP20002', 'Sophia', 'Brown', '555-987-6543', '1995-04-10', '456 Beach Blvd, Los Angeles', 'USA', 'sophia.brown@example.com', 'Female');
CALL Add_Visiting_User('VP20003', 'Ethan', 'Wilson', '555-555-5555', '2013-12-15', '123 Ocean Dr, Miami', 'USA', 'ethan.wilson@example.com', 'Male');
CALL Add_Visiting_User('VP20004', 'Olivia', 'Smith', '555-777-7777', '1985-03-20', '456 Riverside Ave, Chicago', 'USA', 'olivia.smith@example.com', 'Female');
CALL Add_Visiting_User('VP20005', 'Aiden', 'Johnson', '555-222-3333', '1983-01-05', '987 Forest St, Seattle', 'USA', 'aiden.johnson@example.com', 'Male');
CALL Add_Visiting_User('VP20006', 'Amelia', 'Harris', '555-444-4444', '2008-07-07', '432 Mountain Rd, Denver', 'USA', 'amelia.harris@example.com', 'Female');
CALL Add_Visiting_User('VP20007', 'Lucas', 'Davis', '555-333-2222', '1995-10-10', '654 Valley St, Boston', 'USA', 'lucas.davis@example.com', 'Male');
CALL Add_Visiting_User('VP20008', 'Olivia', 'Martin', '555-666-1111', '1976-09-22', '765 Lake Rd, San Francisco', 'USA', 'olivia.martin@example.com', 'Female');
CALL Add_Visiting_User('VP20009', 'Liam', 'Clark', '555-888-7777', '1992-11-11', '876 Hillside Dr, Atlanta', 'USA', 'liam.clark@example.com', 'Male');
CALL Add_Visiting_User('VP20010', 'Emma', 'Miller', '555-555-4444', '2010-04-14', '543 Ridge Rd, Las Vegas', 'USA', 'emma.miller@example.com', 'Female');
CALL Add_Visiting_User('VP20011', 'Logan', 'Adams', '555-999-9999', '1980-02-19', '876 Oceanview Rd, Dallas', 'USA', 'logan.adams@example.com', 'Male');




-- Calls for GUEST
CALL Reserve('AB123456', 1, 1, 'Platinum', 'Guest');
CALL Book(1, 1);
CALL Reserve('AB789012', 2, 2, 'Business', 'Guest');
CALL Book(2, 1);
CALL Reserve('CD789012', 3, 3, 'Economy', 'Guest');
CALL Book(3, 1);
CALL Reserve('EF345678', 4, 4, 'Platinum', 'Guest');
CALL Book(4, 1);
CALL Reserve('GH901234', 5, 5, 'Business', 'Guest');
CALL Book(5, 1);
CALL Reserve('IJ567890', 6, 6, 'Economy', 'Guest');
CALL Book(6, 1);
CALL Reserve('KL234563', 7, 7, 'Platinum', 'Guest');
CALL Book(7, 1);
CALL Reserve('MN890123', 8, 8, 'Business', 'Guest');
CALL Book(8, 1);
CALL Reserve('OP123456', 9, 9, 'Economy', 'Guest');
CALL Book(9, 1);
CALL Reserve('QR234567', 10, 8, 'Platinum', 'Guest');
CALL Book(10, 1);
CALL Reserve('ST345678', 11, 11, 'Business', 'Guest');
CALL Book(11, 1);
CALL Reserve('UV456789', 12, 12, 'Economy', 'Guest');
CALL Book(12, 1);
CALL Reserve('VP20001', 13, 7, 'Platinum', 'Guest');
CALL Book(13, 1);
CALL Reserve('VP20002', 14, 14, 'Business', 'Guest');
CALL Book(14, 1);
CALL Reserve('VP20003', 15, 15, 'Economy', 'Guest');
CALL Book(15, 1);
CALL Reserve('VP20004', 16, 2, 'Platinum', 'Guest');
CALL Book(16, 1);
CALL Reserve('VP20005', 17, 17, 'Business', 'Guest');
CALL Book(17, 1);
CALL Reserve('VP20006', 18, 18, 'Economy', 'Guest');
CALL Book(18, 1);
CALL Reserve('VP20007', 19, 9, 'Platinum', 'Guest');
CALL Book(19, 1);
CALL Reserve('VP20008', 20, 20, 'Business', 'Guest');
CALL Book(20, 1);
CALL Reserve('VP20009', 21, 21, 'Economy', 'Guest');
CALL Book(21, 1);
CALL Reserve('VP20010', 22, 4, 'Platinum', 'Guest');
CALL Book(22, 1);
CALL Reserve('VP20011', 23, 23, 'Business', 'Guest');
CALL Book(23, 1);
CALL Reserve('WX567890', 24, 24, 'Economy', 'Guest');
CALL Book(24, 1);
CALL Reserve('YZ678901', 25, 8, 'Platinum', 'Guest');
CALL Book(25, 1);

-- Calls for REGISTERED
CALL Reserve('AB123456', 26, 26, 'Business', 'Registered');
CALL Book(26, 1);
CALL Reserve('AB789012', 27, 27, 'Economy', 'Registered');
CALL Book(27, 1);
CALL Reserve('CD789012', 28, 8, 'Platinum', 'Registered');
CALL Book(28, 1);
CALL Reserve('EF345678', 29, 27, 'Business', 'Registered');
CALL Book(29, 1);
CALL Reserve('GH901234', 30, 30, 'Economy', 'Registered');
CALL Book(30, 1);
CALL Reserve('IJ567890', 31, 1, 'Platinum', 'Registered');
CALL Book(31, 1);
CALL Reserve('KL234563', 32, 32, 'Business', 'Registered');
CALL Book(32, 1);
CALL Reserve('MN890123', 33, 33, 'Economy', 'Registered');
CALL Book(33, 1);
CALL Reserve('AB123456', 26, 7, 'Platinum', 'Registered');
CALL Book(34, 1);
CALL Reserve('AB789012', 27, 27, 'Business', 'Registered');
CALL Book(35, 1);
CALL Reserve('CD789012', 28, 28, 'Economy', 'Registered');
CALL Book(36, 1);
CALL Reserve('EF345678', 29, 6, 'Platinum', 'Registered');
CALL Book(37, 1);
CALL Reserve('GH901234', 30, 30, 'Business', 'Registered');
CALL Book(38, 1);
CALL Reserve('IJ567890', 31, 31, 'Economy', 'Registered');
CALL Book(39, 1);
CALL Reserve('KL234563', 32, 2, 'Platinum', 'Registered');
CALL Book(40, 1);
CALL Reserve('MN890123', 33, 1, 'Business', 'Registered');
CALL Book(41, 1);
CALL Reserve('AB123456', 30, 2, 'Economy', 'Registered');
CALL Book(42, 1);
CALL Reserve('AB789012', 21, 3, 'Platinum', 'Registered');
CALL Book(43, 1);
CALL Reserve('CD789012', 14, 4, 'Business', 'Registered');
CALL Book(44, 1);
CALL Reserve('EF345678', 15, 5, 'Economy', 'Registered');
CALL Book(45, 1);
CALL Reserve('GH901234', 33, 6, 'Platinum', 'Registered');
CALL Book(46, 1);
CALL Reserve('IJ567890', 31, 7, 'Business', 'Registered');
CALL Book(47, 1);
CALL Reserve('KL234563', 16, 8, 'Economy', 'Registered');
CALL Book(48, 1);
CALL Reserve('MN890123', 18, 9, 'Platinum', 'Registered');
CALL Book(49, 1);
CALL Reserve('OP123456', 25, 10, 'Business', 'Registered');
CALL Book(50, 1);
CALL Reserve('QR234567', 12, 11, 'Economy', 'Registered');
CALL Book(51, 1);
CALL Reserve('ST345678', 4, 1, 'Platinum', 'Registered');
CALL Book(52, 1);
CALL Reserve('UV456789', 5, 13, 'Business', 'Registered');
CALL Book(53, 1);
CALL Reserve('WX567890', 28, 14, 'Economy', 'Registered');
CALL Book(54, 1);
CALL Reserve('YZ678901', 10, 5, 'Platinum', 'Registered');
CALL Book(55, 1);
CALL Reserve('AB123456', 5, 16, 'Business', 'Registered');
CALL Book(56, 1);
CALL Reserve('AB789012', 9, 17, 'Economy', 'Registered');
CALL Book(57, 1);
CALL Reserve('CD789012', 5, 8, 'Platinum', 'Registered');
CALL Book(58, 1);
CALL Reserve('EF345678', 1, 19, 'Business', 'Registered');
CALL Book(59, 1);
CALL Reserve('GH901234', 2, 20, 'Economy', 'Registered');
CALL Book(60, 1);
CALL Reserve('IJ567890', 23, 3, 'Platinum', 'Registered');
CALL Book(61, 1);
CALL Reserve('KL234563', 14, 22, 'Business', 'Registered');
CALL Book(62, 1);
CALL Reserve('MN890123', 15, 23, 'Economy', 'Registered');
CALL Book(63, 1);
CALL Reserve('OP123456', 12, 4, 'Platinum', 'Registered');
CALL Book(64, 1);
CALL Reserve('QR234567', 17, 25, 'Business', 'Registered');
CALL Book(65, 1);
CALL Reserve('ST345678', 8, 26, 'Economy', 'Registered');
CALL Book(66, 1);
CALL Reserve('UV456789', 9, 7, 'Platinum', 'Registered');
CALL Book(67, 1);
CALL Reserve('AB123456', 6, 28, 'Business', 'Registered');
CALL Book(68, 1);
CALL Reserve('AB789012', 13, 29, 'Economy', 'Registered');
CALL Book(69, 1);
CALL Reserve('CD789012', 22, 3, 'Platinum', 'Registered');
CALL Book(70, 1);
CALL Reserve('EF345678', 30, 31, 'Business', 'Registered');
CALL Book(71, 1);
CALL Reserve('GH901234', 13, 32, 'Economy', 'Registered');
CALL Book(72, 1);
CALL Reserve('IJ567890', 5, 3, 'Platinum', 'Registered');
CALL Book(73, 1);
CALL Reserve('AB123456', 6, 23, 'Business', 'Registered');
CALL Book(74, 1);
CALL Reserve('AB789012', 7, 35, 'Economy', 'Registered');
CALL Book(75, 1);
CALL Reserve('CD789012', 8, 6, 'Platinum', 'Registered');
CALL Book(76, 1);
CALL Reserve('EF345678', 19, 37, 'Business', 'Registered');
CALL Book(77, 1);
CALL Reserve('GH901234', 10, 38, 'Economy', 'Registered');
CALL Book(78, 1);
CALL Reserve('IJ567890', 11, 1, 'Platinum', 'Registered');
CALL Book(79, 1);
CALL Reserve('KL234563', 22, 10, 'Business', 'Registered');
CALL Book(80, 1);
CALL Reserve('MN890123', 13, 41, 'Economy', 'Registered');
CALL Book(81, 1);
CALL Reserve('OP123456', 14, 2, 'Platinum', 'Registered');
CALL Book(82, 1);
CALL Reserve('QR234567', 15, 23, 'Business', 'Registered');
CALL Book(83, 1);
CALL Reserve('ST345678', 16, 44, 'Economy', 'Registered');
CALL Book(84, 1);
CALL Reserve('UV456789', 17, 5, 'Platinum', 'Registered');
CALL Book(85, 1);
CALL Reserve('WX567890', 18, 16, 'Business', 'Registered');
CALL Book(86, 1);
CALL Reserve('YZ678901', 19, 47, 'Economy', 'Registered');
CALL Book(87, 1);
CALL Reserve('AB123456', 20, 8, 'Platinum', 'Registered');
CALL Book(88, 1);
CALL Reserve('AB789012', 31, 49, 'Business', 'Registered');
CALL Book(89, 1);
CALL Reserve('CD789012', 22, 50, 'Economy', 'Registered');
CALL Book(90, 1);
CALL Reserve('EF345678', 13, 5, 'Platinum', 'Registered');
CALL Book(91, 1);
CALL Reserve('GH901234', 24, 12, 'Business', 'Registered');
CALL Book(92, 1);
CALL Reserve('IJ567890', 15, 53, 'Economy', 'Registered');
CALL Book(93, 1);
CALL Reserve('KL234563', 26, 4, 'Platinum', 'Registered');
CALL Book(94, 1);
CALL Reserve('MN890123', 27, 25, 'Business', 'Registered');
CALL Book(95, 1);
CALL Reserve('OP123456', 28, 56, 'Economy', 'Registered');
CALL Book(96, 1);
CALL Reserve('QR234567', 29, 7, 'Platinum', 'Registered');
CALL Book(97, 1);
CALL Reserve('ST345678', 10, 8, 'Business', 'Registered');
CALL Book(98, 1);
CALL Reserve('UV456789', 31, 59, 'Economy', 'Registered');
CALL Book(99, 1);
CALL Reserve('WX567890', 22, 6, 'Platinum', 'Registered');
CALL Book(100, 1);
CALL Reserve('YZ678901', 13, 1, 'Business', 'Registered');
CALL Book(101, 1);
CALL Reserve('AB123456', 24, 62, 'Economy', 'Registered');
CALL Book(102, 1);
CALL Reserve('AB789012', 15, 3, 'Platinum', 'Registered');
CALL Book(103, 1);
CALL Reserve('CD789012', 16, 40, 'Business', 'Registered');
CALL Book(104, 1);
CALL Reserve('EF345678', 17, 65, 'Economy', 'Registered');
CALL Book(105, 1);
CALL Reserve('GH901234', 28, 6, 'Platinum', 'Registered');
CALL Book(106, 1);
CALL Reserve('IJ567890', 29, 27, 'Economy', 'Registered');
CALL Book(107, 1);
CALL Reserve('KL234563', 30, 68, 'Economy', 'Registered');
CALL Book(108, 1);
CALL Reserve('AB123456', 27, 62, 'Economy', 'Registered');
CALL Book(109, 1);


CALL Login('JohnDoe','securepass1');

SELECT * FROM Airplane_Model;
SELECT * FROM User;
SELECT * FROM Registered_User;
SELECT * FROM LOCATION;
SELECT * FROM AIRPORT;
CALL Flight_Update();
SELECT * FROM Reserve;
SELECT * FROM Booking;
select * from airplane_model;
select * from Airplane;
SELECT * FROM FLIGHT;
select * from passenger;
SELECT * FROM Passengers_With_Destination;
CALL FUNCTION_1(10,'Above');
CALL FUNCTION_2('2023-11-01','2023-11-10','BIA');
CALL FUNCTION_3('2023-11-01','2023-11-10');
CALL FUNCTION_4('CGK','SIN');
CALL FUNCTION_5();
