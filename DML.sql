USE librarysystem;

INSERT INTO librarysystem.Authors (ol_author_key,author_name,biography,author_image_url,created_at) VALUES
	 ('OL2689878A','Marco Polo','Venetian explorer and merchant noted for travel to central and eastern Asia','OL2689878A.jpg','2025-05-22 14:42:18');

INSERT INTO librarysystem.Users (full_name,email,password_hash,date_of_birth,phone_number,`role`,is_active,created_at,updated_at) VALUES
	 ('user','user@a.com','$2b$10$6Htj22rqbNkfH3LLcHXNN.R6OludnIPW8C.iEGwoEpLNiynXU.BGW','1995-05-15','0987654321','user',1,'2025-05-22 12:39:18','2025-05-22 12:39:18'),
	 ('admin','admin@a.com','$2b$10$UhmqOLROBZm.RFgdXEl7iOGcCFOsug5PaXpDDUkycQpXMxQgJjwr.','1995-05-15','0987654321','admin',1,'2025-05-22 12:39:37','2025-05-22 12:39:37');

INSERT INTO librarysystem.Books (author_id,genre_id,title,description,publication_year,`language`,cover_image_url,target_stock_count,created_at,updated_at) VALUES
	 (1,8,'The Travels of Marco Polo','Join the 13th century merchants Marco, Niccolo and Maffeo Polo as they journey from their native city of Venice to the faraway land of Cathay, or China. There, young Marco will meet Kublai Khan, the ruler of the vast Mongolian empire. Read about his many adventures serving the Khan in the lands East of Europe, and his adventures coming back home to Venice. This medieval book, dictated by Marco while imprisoned in Genoa, was one of the inspirations of the Age of Exploration during the Renaissance, and it still intrigues readers today to learn of the Polo''s adventures in the far East.',1818,'eng','8237917.jpg',5,'2025-05-22 15:27:25','2025-05-22 15:29:05');

