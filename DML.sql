USE librarysystem;

INSERT INTO librarysystem.Authors (ol_author_key,author_name,biography,author_image_url,created_at) VALUES
	 ('OL2689878A','Marco Polo','Venetian explorer and merchant noted for travel to central and eastern Asia','OL2689878A.jpg','2025-05-22 14:42:18');

INSERT INTO librarysystem.Users (full_name,email,password_hash,date_of_birth,phone_number,`role`,is_active,created_at,updated_at) VALUES
	 ('user','user@a.com','$2b$10$6Htj22rqbNkfH3LLcHXNN.R6OludnIPW8C.iEGwoEpLNiynXU.BGW','1995-05-15','0987654321','user',1,'2025-05-22 12:39:18','2025-05-22 12:39:18'),
	 ('admin','admin@a.com','$2b$10$UhmqOLROBZm.RFgdXEl7iOGcCFOsug5PaXpDDUkycQpXMxQgJjwr.','1995-05-15','0987654321','admin',1,'2025-05-22 12:39:37','2025-05-22 12:39:37');


