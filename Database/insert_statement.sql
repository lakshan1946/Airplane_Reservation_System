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
DELETE FROM Book;

SET SQL_SAFE_UPDATES = 1;

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

