USE librarysystem;

INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Robert Louis Stevenson')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('supernatural')) LIMIT 1),
    'The Strange Case of Dr. Jekyll and Mr. Hyde', 'Stevenson’s famous gothic novella, first published in 1886, and filmed countless times is better known simply as Jekyll and Hyde. The first novel to toy with the idea of a split personality, it features the respectable Dr. Jekyll transforming himself into the evil Mr Hyde in a failed attempt to learn more about the duality of man.', 1875, 'jpn', 'book_data/covers/295773.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('J. K. Rowling')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('supernatural')) LIMIT 1),
    'Harry Potter and the Philosopher''s Stone', 'Harry Potter #1

When mysterious letters start arriving on his doorstep, Harry Potter has never heard of Hogwarts School of Witchcraft and Wizardry.

They are swiftly confiscated by his aunt and uncle.

Then, on Harry’s eleventh birthday, a strange man bursts in with some important news: Harry Potter is a wizard and has been awarded a place to study at Hogwarts.

And so the first of the Harry Potter adventures is set to begin.
([source][1])


  [1]: https://www.jkrowling.com/book/harry-potter-philosophers-stone/', 1997, 'jpn', 'book_data/covers/10521270.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('J.R.R. Tolkien')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'The Hobbit', 'The Hobbit is a tale of high adventure, undertaken by a company of dwarves in search of dragon-guarded gold. A reluctant partner in this perilous quest is Bilbo Baggins, a comfort-loving unambitious hobbit, who surprises even himself by his resourcefulness and skill as a burglar.

Encounters with trolls, goblins, dwarves, elves, and giant spiders, conversations with the dragon, Smaug, and a rather unwilling presence at the Battle of Five Armies are just some of the adventures that befall Bilbo.

Bilbo Baggins has taken his place among the ranks of the immortals of children’s fiction. Written by Professor Tolkien for his children, The Hobbit met with instant critical acclaim when published.', 1937, 'rus', 'book_data/covers/14627509.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephenie Meyer')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'Twilight', 'Bella Swan and Edward Cullen, a pair of star-crossed lovers whose forbidden relationship ripens against the backdrop of small-town suspicion and a mysterious coven of vampires.', 2005, 'rus', 'book_data/covers/12641977.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Marguerite Yourcenar')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('historical fiction')) LIMIT 1),
    'Mémoires d''Hadrien', '*Mémoires d''Hadrien* est un roman historique de l''écrivaine française Marguerite Yourcenar, publié en 1951. Ces pseudo-mémoires de l''empereur romain Hadrien ont immédiatement rencontré un extraordinaire succès international et assuré à son auteur une grande célébrité. Il s’agit d’une œuvre dont le projet remonte à l’adolescence de l’autrice. Yourcenar considérant le projet comme trop ambitieux pour être une œuvre de jeunesse, le décrivait de la trempe de ceux « qu’on ne doit pas oser avant d’avoir dépassé quarante ans ».

Le livre est présenté comme une longue lettre d’un vieil empereur adressée à son petit-fils adoptif et éventuel successeur âgé de 17 ans, Marc Aurèle. L’empereur Hadrien médite et se remémore ses triomphes militaires, son amour de la poésie et de la musique, sa philosophie ainsi que sa passion pour son jeune amant bithynien, Antinoüs. 

-------------

*Memoirs of Hadrian* (French: Mémoires d''Hadrien) is a novel by the Belgian-born French writer Marguerite Yourcenar about the life and death of Roman Emperor Hadrian. First published in France in French in 1951 as Mémoires d''Hadrien, the book was an immediate success, meeting with enormous critical acclaim. Although the historical Hadrian wrote an autobiography, it has been lost.

The book takes the form of a letter to Hadrian''s adoptive grandson and eventual successor "Mark" (Marcus Aurelius). The emperor meditates on military triumphs, love of poetry and music, philosophy, and his passion for his lover Antinous, all in a manner similar to Gustave Flaubert''s "melancholy of the antique world."

Yourcenar noted in her postscript *Carnet de note* to the original edition, quoting Flaubert, that she had chosen Hadrian as the subject of the novel in part because he had lived at a time when the Roman gods were no longer believed in, but Christianity was not yet established. This intrigued her for what she saw as parallels to her own post-war European world.', 1951, 'jpn', 'book_data/covers/1003164.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Patrick Süskind')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('historical fiction')) LIMIT 1),
    'Perfume', 'INTERNATIONAL BESTSELLER • Set in eighteenth-century France, the classic novel that provokes a terrifying examination of what happens when one man’s indulgence in his greatest passion—his sense of smell—leads to murder.

In the slums of eighteenth-century France, the infant Jean-Baptiste Grenouille is born with one sublime gift—an absolute sense of smell. As a boy, he lives to decipher the odors of Paris, and apprentices himself to a prominent perfumer who teaches him the ancient art of mixing precious oils and herbs. But Grenouille’s genius is such that he is not satisfied to stop there, and he becomes obsessed with capturing the smells of objects such as brass doorknobs and fresh-cut wood. Then one day he catches a hint of a scent that will drive him on an ever-more-terrifying quest to create the “ultimate perfume”—the scent of a beautiful young virgin. Told with dazzling narrative brilliance, Perfume is a hauntingly powerful tale of murder and sensual depravity.', 1985, 'jpn', 'book_data/covers/10910286.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Philip Pullman')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'Northern Lights', 'In a landmark epic of fantasy and storytelling, Philip Pullman invites readers into a world as convincing and thoroughly realized as Narnia, Earthsea, or Redwall. Here lives an orphaned ward named Lyra Belacqua, whose carefree life among the scholars at Oxford''s Jordan College is shattered by the arrival of two powerful visitors. First, her fearsome uncle, Lord Asriel, appears with evidence of mystery and danger in the far North, including photographs of a mysterious celestial phenomenon called Dust and the dim outline of a city suspended in the Aurora Borealis that he suspects is part of an alternate universe. He leaves Lyra in the care of Mrs. Coulter, an enigmatic scholar and explorer who offers to give Lyra the attention her uncle has long refused her. In this multilayered narrative, however, nothing is as it seems. Lyra sets out for the top of the world in search of her kidnapped playmate, Roger, bearing a rare truth-telling instrument, the compass of the title. All around her children are disappearing—victims of so-called "Gobblers"—and being used as subjects in terrible experiments that separate humans from their daemons, creatures that reflect each person''s inner being. And somehow, both Lord Asriel and Mrs. Coulter are involved.', 1995, 'eng', 'book_data/covers/8747028.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Lois Lowry')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'The Giver', 'At the age of twelve, Jonas, a young boy from a seemingly utopian, futuristic world, is singled out to receive special training from The Giver, who alone holds the memories of the true joys and pain of life.', 1993, 'eng', 'book_data/covers/8352502.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('George S. Clason')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('business')) LIMIT 1),
    'The Richest Man in Babylon', 'To bring your dreams and desires to fulfillment, you must be successful with money. This book shows you how to amass personal wealth by sharing the secrets of the ancient Babylonians, who were the first to discover the universal laws of prosperity.

Hailed as the greatest of all inspirational works on the subject of thrift, financial planning, and personal wealth, The Richest Man in Babylon is a timeless classic that holds the key to all you desire and everything you wish to accomplish. Through entertaining stories about the herdsmen, merchants, and tradesmen of ancient Babylon, George S. Clason provides concrete advice for creating, growing, and preserving wealth. Beloved by millions, this celebrated bestseller offers an understanding of, and a solution to, your personal financial problems. This is the book that holds the secrets to keeping your money and making more.

Financial principles covered in this book include:
Pay yourself first.
Don''t trust a bricklayer to buy jewels. (Don''t get caught up in other people''s excitement. Go seek the experts instead.)
Don''t put all your eggs in a single basket. (Diversify your portfolio.)
Control thy expenses. (Even the richest man has a time constraint on his life. Do what you enjoy, but don''t overdo it.)
Increase your ability to earn.

Keeping these core principles in mind will help you through economic hard times and put you on the road to riches.', 1926, 'fre', 'book_data/covers/10491331.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Napoleon Hill')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('business')) LIMIT 1),
    'Think and Grow Rich', 'Napoleon Hill''s quintessential volume Think and grow rich, the all-time bestseller in the field of professional success, outlines the laws of success and sets the standard of today''s motivational thinking.', 1937, 'fre', 'book_data/covers/14542536.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Nevil Shute')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    'On The Beach', 'A novel about the survivors of an atomic war, who face an inevitable end as radiation poisoning moves toward Australia from the North.', 1957, 'ger', 'book_data/covers/997896.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur C. Clarke')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    '2001', 'A novel that proposes an idea about how the human race might have begun and where it might be headed...given a little help from out there. A colaboration of ideas with director Stanley Kubrick in the late 1960''s it begins at "the dawn of man" and then leaps to the year 2001 where a mission to Saturn (Jupiter in the film) is mounted to try and answer questions raised by the discovery of an ancient artifact dug up on the moon. Though not particularly fast paced, the science is good, and there are a few hair raising events. There are also interesting speculations about the future, such as the space shuttle, and a device eerily similar to an iPad. Leaving plenty of room for contemplation and the appreciation for the inevitable trials of space travel, this is one of the truly landmark pieces of hard science fiction.', 1968, 'ger', 'book_data/covers/11344400.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Edward Gibbon')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('history')) LIMIT 1),
    'History of the Decline and Fall of the Roman Empire Complete and Unabridged', 'Gibbon''s masterpiece, which narrates the history of the Roman Empire from the second century a.d. to its collapse in the west in the fifth century and in the east in the fifteenth century, is widely considered the greatest work of history ever written. This abridgment retains the full scope of the original, but in a compass equivalent to a long novel. Casual readers now have access to the full sweep of Gibbon''s narrative, while instructors and students have a volume that can be read in a single term. This unique edition emphasizes elements ignored in all other abridgments--in particular the role of religion in the empire and the rise of Islam.From the Trade Paperback edition.', 1776, 'spa', 'book_data/covers/5978577.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Erskine Childers')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('history')) LIMIT 1),
    'The Riddle of the Sands', 'Childers''s lone masterpiece, THE RIDDLE OF THE SANDS, considered the first modern spy thriller, is recognisable as the brilliant forerunner of the realism of Graham Greene and John le Carre. Its unique flavour comes from its fine characterization,richly authentic background of inshore sailing and vivid evocation of the late 1890s - an atmosphere of mutual suspicion and intrigue that was soon to lead to war.', 1903, 'spa', 'book_data/covers/2293974.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('suspense')) LIMIT 1),
    'The Da Vinci Code', 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown''s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.


----------
See also:
[The Da Vinci Code [1/2]](https://openlibrary.org/works/OL24164822W)
[The Da Vinci Code [2/2]](https://openlibrary.org/works/OL24210437W)

		
Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2003, 'jpn', 'book_data/covers/9255229.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('suspense')) LIMIT 1),
    'Angels & Demons', 'Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Brown''s subsequent novels. Angels & Demons shares many stylistic literary elements with its sequels, such as conspiracies of secret societies, a single-day time frame, and the Catholic Church. Ancient history, architecture, and symbology are also heavily referenced throughout the book.


----------
Contains:
[Angels & Demons [1/2]](https://openlibrary.org/works/OL34545389W)
[Angels & Demons [1/2]](https://openlibrary.org/works/OL36748095W)
[Angels & Demons [1/3]](https://openlibrary.org/works/OL17742693W)

Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2000, 'jpn', 'book_data/covers/11408459.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'The Da Vinci Code', 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown''s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.


----------
See also:
[The Da Vinci Code [1/2]](https://openlibrary.org/works/OL24164822W)
[The Da Vinci Code [2/2]](https://openlibrary.org/works/OL24210437W)

		
Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2003, 'ara', 'book_data/covers/9255229.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Wilkie Collins')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'The Woman in White', 'The Woman in White famously opens with Walter Hartright''s eerie encounter on a moonlit London road. Engaged as a drawing master to the beautiful Laura Fairlie, Walter is drawn into the sinister intrigues of Sir Percival Glyde and his ''charming'' friend Count Fosco, who has a taste for white mice, vanilla bonbons and poison. Pursuing questions of identity and insanity along the paths and corridors of English country houses and the madhouse, The Woman in White is the first and most influential of the Victorian genre that combined Gothic horror with psychological realism.', 1860, 'ara', 'book_data/covers/4684227.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Marcus Aurelius')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Meditations', 'Nearly two thousand years after it was written, Meditations remains profoundly relevant for anyone seeking to lead a meaningful life.

Few ancient works have been as influential as the Meditations of Marcus Aurelius, philosopher and emperor of Rome (A.D. 161–180). A series of spiritual exercises filled with wisdom, practical guidance, and profound understanding of human behavior, it remains one of the greatest works of spiritual and ethical reflection ever written. Marcus’s insights and advice—on everything from living in the world to coping with adversity and interacting with others—have made the Meditations required reading for statesmen and philosophers alike, while generations of ordinary readers have responded to the straightforward intimacy of his style. For anyone who struggles to reconcile the demands of leadership with a concern for personal integrity and spiritual well-being, the Meditations remains as relevant now as it was two thousand years ago.

In Gregory Hays’s new translation—the first in thirty-five years—Marcus’s thoughts speak with a new immediacy. In fresh and unencumbered English, Hays vividly conveys the spareness and compression of the original Greek text. Never before have Marcus’s insights been so directly and powerfully presented.

With an Introduction that outlines Marcus’s life and career, the essentials of Stoic doctrine, the style and construction of the Meditations, and the work’s ongoing influence, this edition makes it possible to fully rediscover the thoughts of one of the most enlightened and intelligent leaders of any era.', 1626, 'spa', 'book_data/covers/211529.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('E. L. James')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Fifty Shades of Grey', 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.
 
Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.

Erotic, amusing, and deeply moving, the Fifty Shades Trilogy is a tale that will obsess you, possess you, and stay with you forever.

This book is intended for mature audiences.', 2000, 'spa', 'book_data/covers/12648183.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sophocles')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('drama')) LIMIT 1),
    'Οἰδίπους Τύραννος (Oidípous Týrannos)', 'Oedipus Rex chronicles the story of Oedipus, a man that becomes the king of Thebes and was always destined from birth to murder his father Laius and marry his mother Jocasta. The play is an example of a classic tragedy, noticeably containing an emphasis on how Oedipus''s own faults contribute to the tragic hero''s downfall, as opposed to having fate be the sole cause. Over the centuries, Oedipus Rex has come to be regarded by many as the Greek tragedy par excellence.', 1715, 'jpn', 'book_data/covers/764695.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Shakespeare')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('drama')) LIMIT 1),
    'Tempest', 'The Tempest is a play by William Shakespeare, believed to have been written in 1610–11, and thought by many critics to be the last play that Shakespeare wrote alone. It is set on a remote island, where Prospero, the rightful Duke of Milan, plots to restore his daughter Miranda to her rightful place using illusion and skilful manipulation. He conjures up a storm, the eponymous tempest, to lure his usurping brother Antonio and the complicit King Alonso of Naples to the island. There, his machinations bring about the revelation of Antonio''s lowly nature, the redemption of the King, and the marriage of Miranda to Alonso''s son, Ferdinand.', 1611, 'jpn', 'book_data/covers/8155661.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('James Allen')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('psychology')) LIMIT 1),
    'As a man thinketh', 'On new thought.', 1902, 'ita', 'book_data/covers/6268048.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Virginia Woolf')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('psychology')) LIMIT 1),
    'The Waves', 'Tracing the lives of a group of friends, this novel follows their development from childhood to middle age. Social events, individual achievements and disappointments form the outer structure of the book, but the focus is the inner life of the characters which is conveyed in rich poetic language.', 1931, 'ita', 'book_data/covers/119517.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Clifford Whittingham Beers')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('health')) LIMIT 1),
    'A Mind That Found Itself', 'This book tells the story of a young man who is gradually enveloped by a psychosis. His well-meaning family commits him to a series of mental hospitals, but he is brutalized by the treatment, and his moments of fleeting sanity become fewer and fewer. His ultimate recovery is a triumph on the human spirit.', 1908, 'eng', 'book_data/covers/10857476.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sylvia Plath')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('health')) LIMIT 1),
    'The Bell Jar', 'The Bell Jar is the only novel written by American poet Sylvia Plath. It is an intensely realistic and emotional record of a successful and talented young woman''s descent into madness.', 1963, 'eng', 'book_data/covers/8477115.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Marcus Aurelius')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Meditations', 'Nearly two thousand years after it was written, Meditations remains profoundly relevant for anyone seeking to lead a meaningful life.

Few ancient works have been as influential as the Meditations of Marcus Aurelius, philosopher and emperor of Rome (A.D. 161–180). A series of spiritual exercises filled with wisdom, practical guidance, and profound understanding of human behavior, it remains one of the greatest works of spiritual and ethical reflection ever written. Marcus’s insights and advice—on everything from living in the world to coping with adversity and interacting with others—have made the Meditations required reading for statesmen and philosophers alike, while generations of ordinary readers have responded to the straightforward intimacy of his style. For anyone who struggles to reconcile the demands of leadership with a concern for personal integrity and spiritual well-being, the Meditations remains as relevant now as it was two thousand years ago.

In Gregory Hays’s new translation—the first in thirty-five years—Marcus’s thoughts speak with a new immediacy. In fresh and unencumbered English, Hays vividly conveys the spareness and compression of the original Greek text. Never before have Marcus’s insights been so directly and powerfully presented.

With an Introduction that outlines Marcus’s life and career, the essentials of Stoic doctrine, the style and construction of the Meditations, and the work’s ongoing influence, this edition makes it possible to fully rediscover the thoughts of one of the most enlightened and intelligent leaders of any era.', 1626, 'ger', 'book_data/covers/211529.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('E. L. James')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Fifty Shades of Grey', 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.
 
Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.

Erotic, amusing, and deeply moving, the Fifty Shades Trilogy is a tale that will obsess you, possess you, and stay with you forever.

This book is intended for mature audiences.', 2000, 'ger', 'book_data/covers/12648183.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('J. K. Rowling')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('sports')) LIMIT 1),
    'Harry Potter and the Goblet of Fire', 'The fourth book in the Harry Potter franchise sees Harry returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron and Hermione . There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry''s name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.


----------
Contains:

 - [Harry Potter and the Goblet of Fire. 2/4](https://openlibrary.org/works/OL17910198W/Harry_Potter_and_the_Goblet_of_Fire._2_4)', 1993, 'jpn', 'book_data/covers/12059372.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Mark Twain')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('sports')) LIMIT 1),
    'Adventures of Huckleberry Finn', 'Adventures of Huckleberry Finn or as it is known in more recent editions, The Adventures of Huckleberry Finn, is a novel by American author Mark Twain, which was first published in the United Kingdom in December 1884 and in the United States in February 1885.

Commonly named among the Great American Novels, the work is among the first in major American literature to be written throughout in vernacular English, characterized by local color regionalism. It is told in the first person by Huckleberry "Huck" Finn, the narrator of two other Twain novels (Tom Sawyer Abroad and Tom Sawyer, Detective) and a friend of Tom Sawyer. It is a direct sequel to The Adventures of Tom Sawyer.', 1876, 'jpn', 'book_data/covers/8157718.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas More')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Utopia', 'First published in 1516, Thomas More''s Utopia is one of the most important works of European humanism. Through the voice of the mysterious traveler Raphael Hythloday, More describes a pagan, communist city-state governed by reason. Addressing such issues as religious pluralism, women''s rights, state-sponsored education, colonialism, and justified warfare, Utopia seems remarkably contemporary nearly five centuries after it was written, and it remains a foundational text in philosophy and political theory.', 1518, 'ara', 'book_data/covers/7222976.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Όμηρος')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Ὀδύσσεια', 'The Odyssey (/ˈɒdəsi/; Greek: Ὀδύσσεια, Odýsseia) is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work ascribed to Homer. The poem is fundamental to the modern Western canon, and is the second oldest extant work of Western literature, the Iliad being the oldest. Scholars believe it was composed near the end of the 8th century BC, somewhere in Ionia, the Greek coastal region of Anatolia. - [Wikipedia][1]

  [1]: https://en.wikipedia.org/wiki/Odyssey', 1488, 'ara', 'book_data/covers/9045853.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Hans Christian Andersen')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('children')) LIMIT 1),
    'The Ugly Duckling', 'An ugly and unloved duckling turns out to be a beautiful swan.', 1851, 'jpn', 'book_data/covers/446546.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Roald Dahl')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('children')) LIMIT 1),
    'Fantastic Mr Fox', 'The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.

Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer''s houses.

Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.', 1970, 'jpn', 'book_data/covers/6498519.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Carrie', 'The story of misfit high-school girl, Carrie White, who gradually discovers that she has telekinetic powers. Repressed by a domineering, ultra-religious mother and tormented by her peers at school, her efforts to fit in lead to a dramatic confrontation during the senior prom. 
([source][1])


----------
Also contained in:

 - [The Shining / ''Salem''s Lot / Night Shift / Carrie][2]


----------
See also:

 - [Selected from Carrie][3]


  [1]: https://stephenking.com/library/novel/carrie.html
  [2]: https://openlibrary.org/works/OL19558521W
  [3]: https://openlibrary.org/works/OL11018609W/Selected_from_Carrie', 1974, 'ger', 'book_data/covers/9256043.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Misery', 'Novelist Paul Sheldon has plans to make the difficult transition from writing historical romances featuring heroine Misery Chastain to publishing literary fiction. Annie Wilkes, Sheldon''s number one fan, rescues the author from the scene of a car accident. The former nurse takes care of him in her remote house, but becomes irate when she discovers that the author has killed Misery off in his latest book. Annie keeps Sheldon prisoner while forcing him to write a book that brings Misery back to life.

[Source][1]


  [1]: https://stephenking.com/library/novel/misery.html', 1978, 'ger', 'book_data/covers/8259296.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Marco Polo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'The Travels of Marco Polo', 'Join the 13th century merchants Marco, Niccolo and Maffeo Polo as they journey from their native city of Venice to the faraway land of Cathay, or China. There, young Marco will meet Kublai Khan, the ruler of the vast Mongolian empire. Read about his many adventures serving the Khan in the lands East of Europe, and his adventures coming back home to Venice. This medieval book, dictated by Marco while imprisoned in Genoa, was one of the inspirations of the Age of Exploration during the Renaissance, and it still intrigues readers today to learn of the Polo''s adventures in the far East.', 1818, 'eng', 'book_data/covers/8237917.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Samuel Johnson')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'A dictionary of the English language', 'A dictionary with more than 40,000 entries which was a primary reference source for scholars and writers of the 18th and 19th century.', 1747, 'eng', 'book_data/covers/5952171.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Carrie', 'The story of misfit high-school girl, Carrie White, who gradually discovers that she has telekinetic powers. Repressed by a domineering, ultra-religious mother and tormented by her peers at school, her efforts to fit in lead to a dramatic confrontation during the senior prom. 
([source][1])


----------
Also contained in:

 - [The Shining / ''Salem''s Lot / Night Shift / Carrie][2]


----------
See also:

 - [Selected from Carrie][3]


  [1]: https://stephenking.com/library/novel/carrie.html
  [2]: https://openlibrary.org/works/OL19558521W
  [3]: https://openlibrary.org/works/OL11018609W/Selected_from_Carrie', 1974, 'rus', 'book_data/covers/9256043.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Misery', 'Novelist Paul Sheldon has plans to make the difficult transition from writing historical romances featuring heroine Misery Chastain to publishing literary fiction. Annie Wilkes, Sheldon''s number one fan, rescues the author from the scene of a car accident. The former nurse takes care of him in her remote house, but becomes irate when she discovers that the author has killed Misery off in his latest book. Annie keeps Sheldon prisoner while forcing him to write a book that brings Misery back to life.

[Source][1]


  [1]: https://stephenking.com/library/novel/misery.html', 1978, 'rus', 'book_data/covers/8259296.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Vālmīki')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Ramayana, a Holy Bible of India', 'राहुल मौर्य " पब्लिकेशन अथॉरिटी भारतीय प्रोड्यूसर द्वारा संचालित
भारत ,सरकार यूपी"', 1823, 'jpn', 'book_data/covers/8238736.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Franz Kafka')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Das Schloß', 'The Castle (original title: "Das Schloß") is the story of K., the unwanted Land Surveyor who is never to be admitted to the Castle nor accepted in the village, and yet cannot go home. As he encounters dualities of certainty and doubt, hope and fear, and reason and nonsense, K.''s struggles in the absurd, labyrinthine world where he finds himself seem to reveal an inexplicable truth about the nature of existence. Kafka began The Castle in 1922 and it was never finished, yet this, the last of his three great novels, draws fascinating conclusions that make it feel strangely complete.', 1926, 'jpn', 'book_data/covers/12605605.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Solomon Northup')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('memoir')) LIMIT 1),
    'Twelve years a slave', 'Twelve Years a Slave is a harrowing memoir about one of the darkest periods in American history. It recounts how Solomon Northup, born a free man in New York, was lured to Washington, D.C., in 1841 with the promise of fast money, then drugged and beaten and sold into slavery. He spent the next twelve years of his life in captivity on a Louisiana cotton plantation.', 1853, 'fre', 'book_data/covers/14856045.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Giacomo Casanova')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('memoir')) LIMIT 1),
    'Mémoires', '', 1830, 'fre', 'book_data/covers/9556873.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('孙武')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('technology')) LIMIT 1),
    'The Art of War', 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu', 1900, 'jpn', 'book_data/covers/4849549.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Anne Frank')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('technology')) LIMIT 1),
    'Het Achterhuis', 'Het Achterhuis is de titel van het dagboek van Anne Frank (1929-1945) voor het eerst uitgegeven op 25 juni 1947. Het is genoemd naar het onderduikpand Het Achterhuis op de Prinsengracht en is het verhaal van een ondergedoken jong Joods meisje ten tijde van de Tweede Wereldoorlog. Het is wereldwijd een van de meest gelezen boeken. Sinds 2009 staat Annes dagboek op de Werelderfgoedlijst voor documenten van UNESCO.


----------
Also contained in:
[Works of Anne Frank](https://openlibrary.org/works/OL2931445W)', 1944, 'jpn', 'book_data/covers/8584021.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('J. K. Rowling')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('sports')) LIMIT 1),
    'Harry Potter and the Goblet of Fire', 'The fourth book in the Harry Potter franchise sees Harry returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron and Hermione . There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry''s name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.


----------
Contains:

 - [Harry Potter and the Goblet of Fire. 2/4](https://openlibrary.org/works/OL17910198W/Harry_Potter_and_the_Goblet_of_Fire._2_4)', 1993, 'fre', 'book_data/covers/12059372.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Mark Twain')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('sports')) LIMIT 1),
    'Adventures of Huckleberry Finn', 'Adventures of Huckleberry Finn or as it is known in more recent editions, The Adventures of Huckleberry Finn, is a novel by American author Mark Twain, which was first published in the United Kingdom in December 1884 and in the United States in February 1885.

Commonly named among the Great American Novels, the work is among the first in major American literature to be written throughout in vernacular English, characterized by local color regionalism. It is told in the first person by Huckleberry "Huck" Finn, the narrator of two other Twain novels (Tom Sawyer Abroad and Tom Sawyer, Detective) and a friend of Tom Sawyer. It is a direct sequel to The Adventures of Tom Sawyer.', 1876, 'fre', 'book_data/covers/8157718.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('L. Frank Baum')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('fantasy')) LIMIT 1),
    'The Marvelous Land of Oz', 'Tip and his creation, Jack Pumpkin, run away to Oz, where they save the city after it is captured by girls.', 1904, 'ara', 'book_data/covers/12648656.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Michael Ende')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('fantasy')) LIMIT 1),
    'Momo oder Die seltsame Geschichte von den Zeit-Dieben und von dem Kind, das den Menschen die gestohlene Zeit zurückbrachte', '*The Neverending Story* is Michael Ende''s best-known book, but *Momo,* published six years earlier, is the all-ages fantasy novel that first won him wide acclaim. After the sweet-talking gray men come to town, life becomes terminally efficient. Can Momo, a young orphan girl blessed with the gift of listening, vanquish the ashen-faced time thieves before joy vanishes forever?', 1973, 'ara', 'book_data/covers/8574580.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas Bulfinch')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'Age of fable', 'Drawing on the works of Homer, Ovid, Virgil, and other classical authors, as well as an immense trove of stories about the Norse gods and heroes, The Age of Fable offers lively retellings of the myths of the Greek and Roman gods: Venus and Adonis, Jupiter and Juno, Daphne and Apollo, and many others. [Source][1].


  [1]: http://www.amazon.com/gp/product/0486411079/ref=pd_lpo_sbs_dp_ss_2?pf_rd_p=1944687582&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=0452011523&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0HP4FXC8G5H55E0BK1WV', 1800, 'jpn', 'book_data/covers/419378.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Max Ernst')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'Max Ernst', '"Max Ernst: Life and Work draws on an unprecedented collection of source material, much of it published here for the first time, to present a compelling portrait of the artist''s life and an intellectual portrait of an entire period. These letters and notes by friends and contemporaries provide insight into the reception of his oeuvre, illustrate Ernst''s own texts and shed light on his biography."--BOOK JACKET', 1956, 'jpn', 'book_data/covers/7879121.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur Machen')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'The Great God Pan', 'Arthur Machen''s first book, THE GREAT GOD PAN, published in 1894, is still one of the greatest works of weird horror and decadence ever produced. Arthur Machen with his taste for the bizarre and macabre, unfurls the tale of a young girl cursed by her unnatural parentage to become a creature of shape-shifting, poly-sexual, demi-human evil.', 1894, 'eng', 'book_data/covers/921610.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Edith Nesbit')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'The Power of Darkness', 'The book "Power of Darkness" is an edition of twenty dark, mysterious stories. Each has its significance, perhaps in love, often in human terror and solitary endurance. From the love a man bears his dead wife and the misunderstanding that hinders his sight, to the strange country superstition that comes true, the writer displays the strange imagination that comes to deep human minds', 2006, 'eng', 'book_data/covers/882715.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Shakespeare')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('comedy')) LIMIT 1),
    'As You Like It', 'This play has two principal settings: the court that Frederick has usurped from his brother, the rightful Duke, and the Forest of Arden, where the Duke and his followers (including the disgruntled Lord Jaques and the jester Touchstone) are living.', 1734, 'jpn', 'book_data/covers/7338874.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Shakespeare')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('comedy')) LIMIT 1),
    'Much Ado About Nothing', 'Shakespeare''s comedy play Much Ado About Nothing pivots around the impediments to love for young betrothed Hero and Claudio when Hero is falsely accused of infidelity and the "lover''s trap" set for the arrogant and assured Benedick who has sworn of marriage and his gentle adversary Beatrice. The merry war between Benedick and Beatrice with the promptings of their friends soon dissolves into farcical love, while Hero''s supposed infidelity is shown to be little more than "much ado about nothing".', 1600, 'jpn', 'book_data/covers/8290853.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Edith Nesbit')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('children')) LIMIT 1),
    'The Book of Dragons', 'Eight madcap tales of unpredictable dragons — including one made of ice, another that takes refuge in the General Post Office, and a fire-breathing monster that flies out of an enchanted book and eats an entire soccer team! Marvelous adventure and excitement for make-believers of all ages.', 1973, 'fre', 'book_data/covers/4342323.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Roald Dahl')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('children')) LIMIT 1),
    'Fantastic Mr Fox', 'The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.

Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer''s houses.

Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.', 1970, 'fre', 'book_data/covers/6498519.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Gaston Leroux')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('music')) LIMIT 1),
    'Le fantôme de l''opéra', 'Christine is brought up by her itinerant musician father, whose death she mourns endlessly. She achieves a singing position in the Paris Opera line, where a mysterious voice teaches her to unleash her musical potential. The voice belongs to Erik, a deformed musical genius who lives in the opera house. As Christine''s singing career takes off, her childhood friend Raoul begins to court her, and he and Erik fight jealously for Christine''s hand.


  [1]: http://litl', 1911, 'jpn', 'book_data/covers/8245407.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Hans Christian Andersen')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('music')) LIMIT 1),
    'Fairy Tales and Stories', 'Many of these stories for children are famous the world over. ''The Emperor''s New Clothes'', ''The Little Mermaid'', ''The Ice Maiden'', ''The Red Shoes'', ''The Snow Queen'', ''Thumbelina'', ''The Steadfast Tin Soldier'' and ''The Ugly Duckling'' are as popular now as they ever were.', 1850, 'jpn', 'book_data/covers/8235356.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dave Eggers')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('cooking')) LIMIT 1),
    'A heartbreaking work of staggering genius', 'From Wikipedia: A Heartbreaking Work of Staggering Genius (ISBN 0-330-48455-9) is a memoir by Dave Eggers released in 2000. It chronicles his stewardship of younger brother Christopher "Toph" Eggers following the cancer-related deaths of his parents.

The book was an enormous commercial and critical success, reaching number one on The New York Times bestseller list and being nominated as a finalist for the Pulitzer Prize for General Non-Fiction. Time magazine and several newspapers dubbed it "The Best Book of the Year". Critics praised the book for its wild, vibrant prose, and it was described as "big, daring [and] manic-depressive" by The New York Times. The book was chosen as the 12th best book of the decade by The Times', 2000, 'rus', 'book_data/covers/8300013.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Faulkner')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('cooking')) LIMIT 1),
    'The Sound and the Fury', 'In many ways this was an experimental novel, using several differing narrative styles. Divided into four parts, the author relates the same episodes from four different viewpoints, using a different style for each. The story concerns various members of a Southern family, once wealthy landowners but now struggling to maintain their reputation.', 1929, 'rus', 'book_data/covers/8292212.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Kahlil Gibran')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'The Prophet', 'Reflections by the Lebanese-American poet, mystic, and painter on such subjects as love, marriage, joy and sorrow, crime and punishment, pain, and self-knowlege.', 1900, 'ara', 'book_data/covers/418324.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Augustine of Hippo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'Confessions', 'Garry Wills’s complete translation of Saint Augustine’s spiritual masterpiece—available now for the first time Garry Wills is an exceptionally gifted translator and one of our best writers on religion today. His bestselling translations of individual chapters of Saint Augustine’s Confessions have received widespread and glowing reviews. Now for the first time, Wills’s translation of the entire work is being published as a Penguin Classics Deluxe Edition. Removed by time and place but not by spiritual relevance, Augustine’s Confessions continues to influence contemporary religion, language, and thought. Reading with fresh, keen eyes, Wills brings his superb gifts of analysis and insight to this ambitious translation of the entire book. “[Wills] renders Augustine’s famous and influential text in direct language with all the spirited wordplay and poetic strength intact.”—Los Angeles Times“[Wills’s] translations . . . are meant to bring Augustine straight into our own minds; and they succeed. Well-known passages, over which my eyes have often gazed, spring to life again from Wills’s pages.”—Peter Brown, The New York Review of Books“Augustine flourishes in Wills’s hand.”—James Wood“A masterful synthesis of classical philosophy and scriptural erudition.”—Chicago Tribune', 1482, 'ara', 'book_data/covers/9022521.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Aristotle')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('politics')) LIMIT 1),
    'Πολιτικά (Politiká)', '"This new translation of one of the fundamental texts of Western political thought combines strict fidelity to Aristotle''s Greek with a contemporary English prose style. Lord''s intention throughout is to retain Aristotle''s distinctive style. The accompanying notes provide literary and historical references, call attention to textual problems, and supply other essential information and interpretation. A glossary supplies working definitions of key terms in Aristotle''s philosophical-political vocabulary as well as a guide to linguistic relationships that are not always reflected in equivalent English terms. Lord''s extensive introduction presents a detailed account of Aristotle''s life in relation to the political situation and events of his time and then discusses the problematic character and history of Aristotle''s writings in general and of the Politics in particular. Lord also outlines Aristotle''s conception of political science, tracing its relation to theoretical science on the one hand and to ethics on the other. In conclusion, he briefly traces the subsequent history and influence of the Politics up to modern times."--Publisher''s description.', 1492, 'fre', 'book_data/covers/1277085.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Adolf Hitler')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('politics')) LIMIT 1),
    'Mein Kampf', '1925 autobiographical book "My Struggle" (USA: "My Battle") by Nazi Party leader Adolf Hitler

On April 1, 1924, because of the sentence handed down by the People''s Court of Munich, I had to begin that day, serving my term in the fortress at Landsberg on the Lech. Thus, after years of uninterrupted work, I was afforded for the first time an opportunity to embark on a task insisted upon by many and felt to be serviceable to the movement by myself. Therefore, I resolved not only to set forth, in two volumes, the object of our movement, but also to draw a picture of its development. From this more can be learned than from any purely doctrinary treatise. That also gave me the opportunity to describe my own development, as far as this is necessary for the understanding of the first as well as the second volume, and which may serve to destroy the evil legends created about my person by the Jewish press. - Preface.', 1922, 'fre', 'book_data/covers/12724015.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Πλάτων')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('education')) LIMIT 1),
    'πολιτεία', 'The Republic is Plato''s most famous work and one of the seminal texts of Western philosophy and politics. The characters in this Socratic dialogue - including Socrates himself - discuss whether the just or unjust man is happier. They are the philosopher-kings of imagined cities and they also discuss the nature of philosophy and the soul among other things.', 1554, 'ara', 'book_data/covers/14418448.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Charles Dickens')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('education')) LIMIT 1),
    'Hard Times', 'Dickens scathing portrait of Victorian industrial society and its misapplied utilitarian philosophy, Hard Times features schoolmaster Thomas Gradgrind, one of his most richly dimensional, memorable characters. Filled with the details and wonders of small-town life, it is also a daring novel of ideas and ultimately, a celebration of love, hope, and limitless possibilities of the imagination.', 1854, 'ara', 'book_data/covers/8236916.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Richard Connell')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('sports')) LIMIT 1),
    'The most dangerous game', 'The Most Dangerous Game is the popular short story originally published in 1924 which was written by Richard Connell. This is the story of a big game hunter who is trapped on an island with a fellow hunter, who is uninterested in hunting stereotypical prey, and instead decides that the only prey worthy of his skills is other humans. This title is often required reading in middle schools, and has been since adapted into movies and extended versions. This title is the original version by the author, and is considered one of the greatest short stories ever written.', 1990, 'eng', 'book_data/covers/8561531.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('J. K. Rowling')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('sports')) LIMIT 1),
    'Harry Potter and the Goblet of Fire', 'The fourth book in the Harry Potter franchise sees Harry returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron and Hermione . There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry''s name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.


----------
Contains:

 - [Harry Potter and the Goblet of Fire. 2/4](https://openlibrary.org/works/OL17910198W/Harry_Potter_and_the_Goblet_of_Fire._2_4)', 1993, 'eng', 'book_data/covers/12059372.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('thriller')) LIMIT 1),
    'The Da Vinci Code', 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown''s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.


----------
See also:
[The Da Vinci Code [1/2]](https://openlibrary.org/works/OL24164822W)
[The Da Vinci Code [2/2]](https://openlibrary.org/works/OL24210437W)

		
Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2003, 'jpn', 'book_data/covers/9255229.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('thriller')) LIMIT 1),
    'Angels & Demons', 'Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Brown''s subsequent novels. Angels & Demons shares many stylistic literary elements with its sequels, such as conspiracies of secret societies, a single-day time frame, and the Catholic Church. Ancient history, architecture, and symbology are also heavily referenced throughout the book.


----------
Contains:
[Angels & Demons [1/2]](https://openlibrary.org/works/OL34545389W)
[Angels & Demons [1/2]](https://openlibrary.org/works/OL36748095W)
[Angels & Demons [1/3]](https://openlibrary.org/works/OL17742693W)

Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2000, 'jpn', 'book_data/covers/11408459.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Ben Jonson')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('drama')) LIMIT 1),
    'The Alchemist, 1612', 'Samuel Taylor Coleridge said of Ben Jonson''s The Alchemist that it had one out of the three most perfect plots in literature. This play, with its sharp portrayal of human folly, is considered by many to be Jonson''s best comedy. First performed 1610, its popularity has endured to this day.', 1612, 'eng', 'book_data/covers/7463992.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('George Bernard Shaw')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('drama')) LIMIT 1),
    'Pygmalion', 'Pygmalion is a play by George Bernard Shaw, named after a Greek mythological figure. It was first presented on stage to the public in 1913.

----------		
Also contained in:		
		

 - [Collected Plays with their Prefaces: Volume IV](https://openlibrary.org/works/OL24714049W)
 - [Complete Plays with Prefaces: Volume I](https://openlibrary.org/works/OL15835450W)		
 - [Four Plays by Bernard Shaw][1]		
 - [Plays](https://openlibrary.org/works/OL15241070W/The_Complete_Plays_of_Bernard_Shaw)		
 - [Portable Bernard Shaw](https://openlibrary.org/works/OL1066402W/The_Portable_Bernard_Shaw)		
 - [Pygmalion and Major Barbara][2]		
 - [Pygmalion and My Fair Lady][3]		
 - [Pygmalion and Related Readings][4]
 - [Pygmalion and Three Other Plays](https://openlibrary.org/works/OL15013904W)
 - [Pygmalion with Connections](https://openlibrary.org/works/OL1066164W/Pygmalion_with_Connections)		
 - [Selected Plays](https://openlibrary.org/works/OL15241059W)		
 - [Selected Plays with Prefaces](https://openlibrary.org/works/OL20644026W)		
 - [Six Plays](https://openlibrary.org/works/OL17986328W)		
			
[1]: https://openlibrary.org/works/OL1066032W/Four_Plays_by_Bernard_Shaw		
[2]: https://openlibrary.org/works/OL1066354W/Pygmalion_Major_Barbara		
[3]: https://openlibrary.org/works/OL15013928W/Pygmalion_My_Fair_Lady		
[4]: https://openlibrary.org/works/OL8049503W/Pygmalion_and_Related_Readings', 1912, 'eng', 'book_data/covers/9267223.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('George S. Clason')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('business')) LIMIT 1),
    'The Richest Man in Babylon', 'To bring your dreams and desires to fulfillment, you must be successful with money. This book shows you how to amass personal wealth by sharing the secrets of the ancient Babylonians, who were the first to discover the universal laws of prosperity.

Hailed as the greatest of all inspirational works on the subject of thrift, financial planning, and personal wealth, The Richest Man in Babylon is a timeless classic that holds the key to all you desire and everything you wish to accomplish. Through entertaining stories about the herdsmen, merchants, and tradesmen of ancient Babylon, George S. Clason provides concrete advice for creating, growing, and preserving wealth. Beloved by millions, this celebrated bestseller offers an understanding of, and a solution to, your personal financial problems. This is the book that holds the secrets to keeping your money and making more.

Financial principles covered in this book include:
Pay yourself first.
Don''t trust a bricklayer to buy jewels. (Don''t get caught up in other people''s excitement. Go seek the experts instead.)
Don''t put all your eggs in a single basket. (Diversify your portfolio.)
Control thy expenses. (Even the richest man has a time constraint on his life. Do what you enjoy, but don''t overdo it.)
Increase your ability to earn.

Keeping these core principles in mind will help you through economic hard times and put you on the road to riches.', 1926, 'spa', 'book_data/covers/10491331.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Napoleon Hill')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('business')) LIMIT 1),
    'Think and Grow Rich', 'Napoleon Hill''s quintessential volume Think and grow rich, the all-time bestseller in the field of professional success, outlines the laws of success and sets the standard of today''s motivational thinking.', 1937, 'spa', 'book_data/covers/14542536.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Kahlil Gibran')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'The Prophet', 'Reflections by the Lebanese-American poet, mystic, and painter on such subjects as love, marriage, joy and sorrow, crime and punishment, pain, and self-knowlege.', 1900, 'ara', 'book_data/covers/418324.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Augustine of Hippo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'Confessions', 'Garry Wills’s complete translation of Saint Augustine’s spiritual masterpiece—available now for the first time Garry Wills is an exceptionally gifted translator and one of our best writers on religion today. His bestselling translations of individual chapters of Saint Augustine’s Confessions have received widespread and glowing reviews. Now for the first time, Wills’s translation of the entire work is being published as a Penguin Classics Deluxe Edition. Removed by time and place but not by spiritual relevance, Augustine’s Confessions continues to influence contemporary religion, language, and thought. Reading with fresh, keen eyes, Wills brings his superb gifts of analysis and insight to this ambitious translation of the entire book. “[Wills] renders Augustine’s famous and influential text in direct language with all the spirited wordplay and poetic strength intact.”—Los Angeles Times“[Wills’s] translations . . . are meant to bring Augustine straight into our own minds; and they succeed. Well-known passages, over which my eyes have often gazed, spring to life again from Wills’s pages.”—Peter Brown, The New York Review of Books“Augustine flourishes in Wills’s hand.”—James Wood“A masterful synthesis of classical philosophy and scriptural erudition.”—Chicago Tribune', 1482, 'ara', 'book_data/covers/9022521.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Pliny the Elder')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'Naturalis historia', '', 1469, 'spa', 'book_data/covers/6543272.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Paul Klee')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'Paul Klee', 'An emblematic figure of the early 20th century, Paul Klee participated in the expansive Avant-Garde movements in Germany and Switzerland. From the vibrant Blaue Reiter movement to Surrealism at the end of the 1930s and throughout his teaching years at the Bauhaus, he attempted to capture the organic and harmonic nature of painting by alluding to other artistic mediums such as poetry, literature, and, above all, music. While he collaborated with artists like August Macke and Alexej von Jawlensky, his most famous partnership was with the abstract expressionist, Wassily Kandinsky.', 1930, 'spa', 'book_data/covers/13174486.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Eric Carle')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('children')) LIMIT 1),
    'The Very Hungry Caterpillar', 'One sunny day, a caterpillar pops out of an egg. He is very hungry and begins searching for food.  He eats his way through ten very sweet pages and gets a tummy ache before finally finding a good, healthy leaf, which makes him sleepy. Then something really amazing happens. But you will have to read it your self to find out what!', 1969, 'ara', 'book_data/covers/7835968.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Michael Ende')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('children')) LIMIT 1),
    'Momo oder Die seltsame Geschichte von den Zeit-Dieben und von dem Kind, das den Menschen die gestohlene Zeit zurückbrachte', '*The Neverending Story* is Michael Ende''s best-known book, but *Momo,* published six years earlier, is the all-ages fantasy novel that first won him wide acclaim. After the sweet-talking gray men come to town, life becomes terminally efficient. Can Momo, a young orphan girl blessed with the gift of listening, vanquish the ashen-faced time thieves before joy vanishes forever?', 1973, 'ara', 'book_data/covers/8574580.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Yogananda Paramahansa')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'Autobiography of a Yogi', 'The autobiography of Paramahansa Yogananda (1893 - 1952) details his search for a guru, during which he encountered many spiritual leaders and world-renowned scientists. When it was published in 1946 it was the first introduction of many westerners to yoga and meditation.The famous opera singer Amelita Galli-Curci said about the book:"Amazing, true stories of saints and masters of India, blended with priceless superphysical information-much needed to balance the Western material efficiency with Eastern spiritual efficiency-come from the vigorous pen of Paramhansa Yogananda, whose teachings my husband and myself have had the pleasure of studying for twenty years."', 1946, 'ger', 'book_data/covers/805448.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas à Kempis')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'Imitation of Christ', 'Classic Christian devotional', 1568, 'ger', 'book_data/covers/5954136.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Church of England')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('music')) LIMIT 1),
    'Book of common prayer', 'Book of rites and prayers for use during worship. Includes Holy Communion and Evening Prayer, weddings (Holy Matrimony), Holy Baptism, funerals, ordinations of deacons, priests and bishops, dedications for churches, prayers for special occasions, and the book of Psalms. Meant for use by the priests with the congregation. The Catechism may also be included.', 1537, 'ara', 'book_data/covers/5720552.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Aristotle')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('music')) LIMIT 1),
    'Poetics', 'One of the first books written on what is now called aesthetics. Although parts are lost (e.g., comedy), it has been very influential in western thought, such as the part on tragedy.', 1536, 'ara', 'book_data/covers/6528920.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur Machen')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'The Great God Pan', 'Arthur Machen''s first book, THE GREAT GOD PAN, published in 1894, is still one of the greatest works of weird horror and decadence ever produced. Arthur Machen with his taste for the bizarre and macabre, unfurls the tale of a young girl cursed by her unnatural parentage to become a creature of shape-shifting, poly-sexual, demi-human evil.', 1894, 'fre', 'book_data/covers/921610.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Misery', 'Novelist Paul Sheldon has plans to make the difficult transition from writing historical romances featuring heroine Misery Chastain to publishing literary fiction. Annie Wilkes, Sheldon''s number one fan, rescues the author from the scene of a car accident. The former nurse takes care of him in her remote house, but becomes irate when she discovers that the author has killed Misery off in his latest book. Annie keeps Sheldon prisoner while forcing him to write a book that brings Misery back to life.

[Source][1]


  [1]: https://stephenking.com/library/novel/misery.html', 1978, 'fre', 'book_data/covers/8259296.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('suspense')) LIMIT 1),
    'Angels & Demons', 'Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Brown''s subsequent novels. Angels & Demons shares many stylistic literary elements with its sequels, such as conspiracies of secret societies, a single-day time frame, and the Catholic Church. Ancient history, architecture, and symbology are also heavily referenced throughout the book.


----------
Contains:
[Angels & Demons [1/2]](https://openlibrary.org/works/OL34545389W)
[Angels & Demons [1/2]](https://openlibrary.org/works/OL36748095W)
[Angels & Demons [1/3]](https://openlibrary.org/works/OL17742693W)

Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2000, 'ger', 'book_data/covers/11408459.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('suspense')) LIMIT 1),
    'The Da Vinci Code', 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown''s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.


----------
See also:
[The Da Vinci Code [1/2]](https://openlibrary.org/works/OL24164822W)
[The Da Vinci Code [2/2]](https://openlibrary.org/works/OL24210437W)

		
Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2003, 'ger', 'book_data/covers/9255229.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Ray Bradbury')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science')) LIMIT 1),
    'The Martian Chronicles', 'This is a collection of science fiction short stories, cleverly cobbled together to form a coherent and very readable novel about a future colonization of Mars. As the stories progress chronologically the author tells how the first humans colonized Mars, initially sharing the planet with a handful of Martians. When Earth is devastated by nuclear war the colony is left to fend for itself and the colonists determine to build a new Earth on Mars.', 1950, 'fre', 'book_data/covers/9346537.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur C. Clarke')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science')) LIMIT 1),
    '2001', 'A novel that proposes an idea about how the human race might have begun and where it might be headed...given a little help from out there. A colaboration of ideas with director Stanley Kubrick in the late 1960''s it begins at "the dawn of man" and then leaps to the year 2001 where a mission to Saturn (Jupiter in the film) is mounted to try and answer questions raised by the discovery of an ancient artifact dug up on the moon. Though not particularly fast paced, the science is good, and there are a few hair raising events. There are also interesting speculations about the future, such as the space shuttle, and a device eerily similar to an iPad. Leaving plenty of room for contemplation and the appreciation for the inevitable trials of space travel, this is one of the truly landmark pieces of hard science fiction.', 1968, 'fre', 'book_data/covers/11344400.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sophocles')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('drama')) LIMIT 1),
    'Οἰδίπους Τύραννος (Oidípous Týrannos)', 'Oedipus Rex chronicles the story of Oedipus, a man that becomes the king of Thebes and was always destined from birth to murder his father Laius and marry his mother Jocasta. The play is an example of a classic tragedy, noticeably containing an emphasis on how Oedipus''s own faults contribute to the tragic hero''s downfall, as opposed to having fate be the sole cause. Over the centuries, Oedipus Rex has come to be regarded by many as the Greek tragedy par excellence.', 1715, 'jpn', 'book_data/covers/764695.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Shakespeare')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('drama')) LIMIT 1),
    'Tempest', 'The Tempest is a play by William Shakespeare, believed to have been written in 1610–11, and thought by many critics to be the last play that Shakespeare wrote alone. It is set on a remote island, where Prospero, the rightful Duke of Milan, plots to restore his daughter Miranda to her rightful place using illusion and skilful manipulation. He conjures up a storm, the eponymous tempest, to lure his usurping brother Antonio and the complicit King Alonso of Naples to the island. There, his machinations bring about the revelation of Antonio''s lowly nature, the redemption of the King, and the marriage of Miranda to Alonso''s son, Ferdinand.', 1611, 'jpn', 'book_data/covers/8155661.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('mystery')) LIMIT 1),
    '4:50 from Paddington', 'Agatha Christie’s audacious mystery thriller, reissued with a striking new cover designed to appeal to the latest generation of Agatha Christie fans and book lovers.

For an instant the two trains ran together, side by side. In that frozen moment, Elspeth witnessed a murder. Helplessly, she stared out of her carriage window as a man remorselessly tightened his grip around a woman’s throat. The body crumpled. Then the other train drew away.

But who, apart from Miss Marple, would take her story seriously? After all, there were no suspects, no other witnesses… and no corpse.', 1957, 'rus', 'book_data/covers/13151352.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('mystery')) LIMIT 1),
    'The Mirror Crack''d from Side to Side', 'E-book exclusive extras:1) Christie biographer Charles Osborne''s essay on The Mirror Crack''d from Side to Side;2) "The Marples": the complete guide to all the cases of crime literature''s foremost female detective.The quaint village of St Mary Mead has been glamourized by the presence of screen queen Marina Gregg, who has taken up residence in preparation for her comeback. But when a local fan is poisoned, Marina finds herself starring in a real-life mystery—supported with scene-stealing aplomb by Jane Marple, who suspects that the lethal cocktail was intended for someone else. But who? If it was meant for Marina, then why? And before the final fade-out, who else from St Mary Mead’s cast of seemingly innocent characters is going to be eliminated?', 1960, 'rus', 'book_data/covers/10561150.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Marcus Aurelius')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Meditations', 'Nearly two thousand years after it was written, Meditations remains profoundly relevant for anyone seeking to lead a meaningful life.

Few ancient works have been as influential as the Meditations of Marcus Aurelius, philosopher and emperor of Rome (A.D. 161–180). A series of spiritual exercises filled with wisdom, practical guidance, and profound understanding of human behavior, it remains one of the greatest works of spiritual and ethical reflection ever written. Marcus’s insights and advice—on everything from living in the world to coping with adversity and interacting with others—have made the Meditations required reading for statesmen and philosophers alike, while generations of ordinary readers have responded to the straightforward intimacy of his style. For anyone who struggles to reconcile the demands of leadership with a concern for personal integrity and spiritual well-being, the Meditations remains as relevant now as it was two thousand years ago.

In Gregory Hays’s new translation—the first in thirty-five years—Marcus’s thoughts speak with a new immediacy. In fresh and unencumbered English, Hays vividly conveys the spareness and compression of the original Greek text. Never before have Marcus’s insights been so directly and powerfully presented.

With an Introduction that outlines Marcus’s life and career, the essentials of Stoic doctrine, the style and construction of the Meditations, and the work’s ongoing influence, this edition makes it possible to fully rediscover the thoughts of one of the most enlightened and intelligent leaders of any era.', 1626, 'spa', 'book_data/covers/211529.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('E. L. James')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Fifty Shades of Grey', 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.
 
Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.

Erotic, amusing, and deeply moving, the Fifty Shades Trilogy is a tale that will obsess you, possess you, and stay with you forever.

This book is intended for mature audiences.', 2000, 'spa', 'book_data/covers/12648183.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('孙武')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('history')) LIMIT 1),
    'The Art of War', 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu', 1900, 'jpn', 'book_data/covers/4849549.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Virginia Woolf')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('history')) LIMIT 1),
    'A Room of One''s Own', 'A Room of One''s Own is an extended essay by Virginia Woolf. First published on 24 October 1929, the essay was based on a series of lectures she delivered at Newnham College and Girton College, two women''s colleges at Cambridge University in October 1928. While this extended essay in fact employs a fictional narrator and narrative to explore women both as writers of and characters in fiction, the manuscript for the delivery of the series of lectures, titled "Women and Fiction", and hence the essay, are considered non-fiction. The essay is generally seen as a feminist text, and is noted in its argument for both a literal and figural space for women writers within a literary tradition dominated by patriarchy.', 1929, 'jpn', 'book_data/covers/6559057.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Gabriel Garcia Marquez')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('romance')) LIMIT 1),
    'El amor en los tiempos del cólera', 'De jóvenes, Florentino Ariza y Fermina Daza se enamoran apasionadamente, pero Fermina eventualmente decide casarse con un médico rico y de muy buena familia. Florentino está anonadado, pero es un romántico. Su carrera en los negocios florece, y aunque sostiene 622 pequeños romances, su corazón todavía pertenece a Fermina. Cuando al fin el esposo de ella muere, Florentino acude al funeral con toda intención. A los cincuenta años, nueve meses y cuatro días de haberle profesado amor a Fermina, lo hará una vez más.
Con sagacidad humorística y depurado estilo, García Márquez traza la historia excepcional de un amor que no ha sido correspondido por medio siglo. Aunque nunca parece estar propiamente contenido, el amor fluye a través de la novela de mil maneras –alegre, melancólico, enriquecedor, siempre sorprendente-.', 1985, 'ita', 'book_data/covers/10096404.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('George MacDonald')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('romance')) LIMIT 1),
    'Lilith', 'Lilith, written by the father of fantasy literature, George MacDonald, was first published in 1895. Its importance was recognized in its later revival in paperback by Ballantine Books as the fifth volume of the celebrated Ballantine Adult Fantasy series in September, 1969. Lilith is considered among the darkest of MacDonald''s works, and among the most profound. It is a story concerning the nature of life, death and salvation. Many believe MacDonald is arguing for Christian universalism, or the idea that all will eventually be saved.', 1895, 'ita', 'book_data/covers/14364546.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas E. Pinelli')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('technology')) LIMIT 1),
    'NASA/DoD aerospace knowledge diffusion research project', '', 1990, 'eng', 'book_data/covers/8936636.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('H. G. Wells')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('technology')) LIMIT 1),
    'When the Sleeper Awakes', 'A troubled insomniac in 1890s England falls suddenly into a sleep-like trance, from which he does not awake for over two hundred years. During his centuries of slumber, however, investments are made that make him the richest and most powerful man on Earth. But when he comes out of his trance he is horrified to discover that the money accumulated in his name is being used to maintain a hierarchal society in which most are poor, and more than a third of all people are enslaved. Oppressed and uneducated, the masses cling desperately to one dream – that the sleeper will awake, and lead them all to freedom.', 1899, 'eng', 'book_data/covers/574886.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arnold J. Toynbee')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('philosophy')) LIMIT 1),
    'A Study of History', 'A masterful attempt to describe a universal history. Staggering depth of scholarship and breath of thought.', 1900, 'rus', 'book_data/covers/121255.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Laozi')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('philosophy')) LIMIT 1),
    'The Sayings of Lao Tzü', 'The essential, classic text of Taoism.  These 81 poems comprise an Eastern classic, the mystical and moral teachings of which have profoundly influenced the sacred scriptures of many religions.', 1875, 'rus', 'book_data/covers/10857861.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Philip Pullman')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'Northern Lights', 'In a landmark epic of fantasy and storytelling, Philip Pullman invites readers into a world as convincing and thoroughly realized as Narnia, Earthsea, or Redwall. Here lives an orphaned ward named Lyra Belacqua, whose carefree life among the scholars at Oxford''s Jordan College is shattered by the arrival of two powerful visitors. First, her fearsome uncle, Lord Asriel, appears with evidence of mystery and danger in the far North, including photographs of a mysterious celestial phenomenon called Dust and the dim outline of a city suspended in the Aurora Borealis that he suspects is part of an alternate universe. He leaves Lyra in the care of Mrs. Coulter, an enigmatic scholar and explorer who offers to give Lyra the attention her uncle has long refused her. In this multilayered narrative, however, nothing is as it seems. Lyra sets out for the top of the world in search of her kidnapped playmate, Roger, bearing a rare truth-telling instrument, the compass of the title. All around her children are disappearing—victims of so-called "Gobblers"—and being used as subjects in terrible experiments that separate humans from their daemons, creatures that reflect each person''s inner being. And somehow, both Lord Asriel and Mrs. Coulter are involved.', 1995, 'fre', 'book_data/covers/8747028.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Lois Lowry')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'The Giver', 'At the age of twelve, Jonas, a young boy from a seemingly utopian, futuristic world, is singled out to receive special training from The Giver, who alone holds the memories of the true joys and pain of life.', 1993, 'fre', 'book_data/covers/8352502.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'The Mystery of the Blue Train', 'Bound for the Riviera, detective Hercule Poirot has boarded Le Train Bleu, an elegant, leisurely means of travel, free of intrigue. Then he meets Ruth Kettering. The American heiress bailing out of a doomed marriage is en route to reconcile with her former lover. But by morning, her private affairs are made public when she is found murdered in her luxury compartment. The rumour of a strange man loitering in the victim''s shadow is all Poirot has to go on. Until Mrs. Kettering''s secret life begins to unfold...', 1928, 'rus', 'book_data/covers/14575533.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('H. G. Wells')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'The Time Machine', 'The Time Traveller, a dreamer obsessed with traveling through time, builds himself a time machine and, much to his surprise, travels over 800,000 years into the future. He lands in the year 802701: the world has been transformed by a society living in apparent harmony and bliss, but as the Traveler stays in the future he discovers a hidden barbaric and depraved subterranean class. Wells''s transparent commentary on the capitalist society was an instant bestseller and launched the time-travel genre.', 1895, 'rus', 'book_data/covers/9009316.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Whitney Stewart')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('health')) LIMIT 1),
    'Mindful Tots', '', 2019, 'ara', 'book_data/covers/14766362.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Tony Ross')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('health')) LIMIT 1),
    'I Don''t Want to Go to Hospital', 'The Little Princess refuses to go to the hospital for some needed care.', 2000, 'ara', 'book_data/covers/10932356.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Ray Bradbury')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    'The Martian Chronicles', 'This is a collection of science fiction short stories, cleverly cobbled together to form a coherent and very readable novel about a future colonization of Mars. As the stories progress chronologically the author tells how the first humans colonized Mars, initially sharing the planet with a handful of Martians. When Earth is devastated by nuclear war the colony is left to fend for itself and the colonists determine to build a new Earth on Mars.', 1950, 'spa', 'book_data/covers/9346537.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur C. Clarke')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    '2001', 'A novel that proposes an idea about how the human race might have begun and where it might be headed...given a little help from out there. A colaboration of ideas with director Stanley Kubrick in the late 1960''s it begins at "the dawn of man" and then leaps to the year 2001 where a mission to Saturn (Jupiter in the film) is mounted to try and answer questions raised by the discovery of an ancient artifact dug up on the moon. Though not particularly fast paced, the science is good, and there are a few hair raising events. There are also interesting speculations about the future, such as the space shuttle, and a device eerily similar to an iPad. Leaving plenty of room for contemplation and the appreciation for the inevitable trials of space travel, this is one of the truly landmark pieces of hard science fiction.', 1968, 'spa', 'book_data/covers/11344400.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sheryl Sandberg')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('memoir')) LIMIT 1),
    'Lean In', 'Thirty years after women became 50 percent of the college graduates in the United States, men still hold the vast majority of leadership positions in government and industry. This means that women''s voices are still not heard equally in the decisions that most affect our lives. In Lean In, Sheryl Sandberg examines why women''s progress in achieving leadership roles has stalled, explains the root causes, and offers compelling, commonsense solutions that can empower women to achieve their full potential. Sandberg is the chief operating officer of Facebook and is ranked on Fortune''s list of the 50 Most Powerful Women in Business and as one of Time''s 100 Most Influential People in the World. In 2010, she gave an electrifying TEDTalk in which she described how women unintentionally hold themselves back in their careers. Her talk, which became a phenomenon and has been viewed more than two million times, encouraged women to "sit at the table," seek challenges, take risks, and pursue their goals with gusto. In Lean In, Sandberg digs deeper into these issues, combining personal anecdotes, hard data, and compelling research to cut through the layers of ambiguity and bias surrounding the lives and choices of working women. She recounts her own decisions, mistakes, and daily struggles to make the right choices for herself, her career, and her family. She provides practical advice on negotiation techniques, mentorship, and building a satisfying career, urging women to set boundaries and to abandon the myth of "having it all."  She describes specific steps women can take to combine professional achievement with personal fulfillment and demonstrates how men can benefit by supporting women in the workplace and at home. Written with both humor and wisdom, Sandberg''s book is an inspiring call to action and a blueprint for individual growth. Lean In is destined to change the conversation from what women can''t do to what they can. - Publisher.', 1799, 'jpn', 'book_data/covers/7254305.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Benjamin Franklin')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('memoir')) LIMIT 1),
    'Autobiography', 'Few men could compare to Benjamin Franklin. Virtually self-taught, he excelled as an athlete, a man of letters, a printer, a scientist, a wit, an inventor, an editor, and a writer, and he was probably the most successful diplomat in American history. David Hume hailed him as the first great philosopher and great man of letters in the New World.

Written initially to guide his son, Franklin''s autobiography is a lively, spellbinding account of his unique and eventful life. Stylistically his best work, it has become a classic in world literature, one to inspire and delight readers everywhere.', 1791, 'jpn', 'book_data/covers/5647361.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephenie Meyer')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('supernatural')) LIMIT 1),
    'Twilight', 'Bella Swan and Edward Cullen, a pair of star-crossed lovers whose forbidden relationship ripens against the backdrop of small-town suspicion and a mysterious coven of vampires.', 2005, 'ara', 'book_data/covers/12641977.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('J. K. Rowling')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('supernatural')) LIMIT 1),
    'Harry Potter and the Philosopher''s Stone', 'Harry Potter #1

When mysterious letters start arriving on his doorstep, Harry Potter has never heard of Hogwarts School of Witchcraft and Wizardry.

They are swiftly confiscated by his aunt and uncle.

Then, on Harry’s eleventh birthday, a strange man bursts in with some important news: Harry Potter is a wizard and has been awarded a place to study at Hogwarts.

And so the first of the Harry Potter adventures is set to begin.
([source][1])


  [1]: https://www.jkrowling.com/book/harry-potter-philosophers-stone/', 1997, 'ara', 'book_data/covers/10521270.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Oscar Wilde')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('comedy')) LIMIT 1),
    'The Importance of Being Earnest', 'Set in England during the late Victorian era, the play''s humour derives in part from characters maintaining fictitious identities to escape unwelcome social obligations. It is replete with witty dialogue and satirises some of the foibles and hypocrisy of late Victorian society. It has proved Wilde''s most enduringly popular play. - [*Wikipedia*][1]


  [1]: http://en.wikipedia.org/wiki/The_Importance_of_Being_Earnest', 1893, 'eng', 'book_data/covers/1260453.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Ben Jonson')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('comedy')) LIMIT 1),
    'The Alchemist, 1612', 'Samuel Taylor Coleridge said of Ben Jonson''s The Alchemist that it had one out of the three most perfect plots in literature. This play, with its sharp portrayal of human folly, is considered by many to be Jonson''s best comedy. First performed 1610, its popularity has endured to this day.', 1612, 'eng', 'book_data/covers/7463992.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Franz Kafka')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Das Schloß', 'The Castle (original title: "Das Schloß") is the story of K., the unwanted Land Surveyor who is never to be admitted to the Castle nor accepted in the village, and yet cannot go home. As he encounters dualities of certainty and doubt, hope and fear, and reason and nonsense, K.''s struggles in the absurd, labyrinthine world where he finds himself seem to reveal an inexplicable truth about the nature of existence. Kafka began The Castle in 1922 and it was never finished, yet this, the last of his three great novels, draws fascinating conclusions that make it feel strangely complete.', 1926, 'ger', 'book_data/covers/12605605.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Joaquim Maria Machado de Assis')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Memórias póstumas de Brás Cubas', '**Memórias póstumas de Brás Cubas** é um romance escrito por Machado de Assis, desenvolvido em princípio como folhetim, de março a dezembro de 1880, na Revista Brasileira, para, no ano seguinte, ser publicado como livro, pela então Tipografia Nacional como Memorias Posthumas de Braz Cubas.

O livro tem como marcas um tom cáustico e novo estilo na obra de Machado de Assis, bem como audácia e inovação temática no cenário literário nacional, que o fez receber, à época, resenhas estranhadas. Confessando adotar a "forma livre" de Laurence Sterne em seu Tristram Shandy (1759–67), ou de Xavier de Maistre, em Memórias Póstumas rompe com a narração linear e objetivista de autores proeminentes da época, como Flaubert e Zola, para retratar o Rio de Janeiro e sua época em geral com pessimismo, ironia e indiferença — um dos fatores que fizeram com que fosse amplamente considerada a obra que iniciou o Realismo no Brasil, ainda que com elementos livres e próprios a Machado de Assis.

— [Wikipedia](https://pt.wikipedia.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas) (CC BY-SA 4.0)', 1881, 'ger', 'book_data/covers/123152.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Napoleon Hill')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('self-help')) LIMIT 1),
    'Think and Grow Rich', 'Napoleon Hill''s quintessential volume Think and grow rich, the all-time bestseller in the field of professional success, outlines the laws of success and sets the standard of today''s motivational thinking.', 1937, 'fre', 'book_data/covers/14542536.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dale Carnegie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('self-help')) LIMIT 1),
    'How to Win Friends and Influence People', 'Available for the first time ever in trade paperback, Dale Carnegie''s enduring classic, the inspirational personal development guide that shows how to achieve lifelong success. One of the top-selling books of all time, "How to Win Friends & Influence People" has sold more than 15 million copies in all its editions.', 1913, 'fre', 'book_data/covers/14548406.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Carrie', 'The story of misfit high-school girl, Carrie White, who gradually discovers that she has telekinetic powers. Repressed by a domineering, ultra-religious mother and tormented by her peers at school, her efforts to fit in lead to a dramatic confrontation during the senior prom. 
([source][1])


----------
Also contained in:

 - [The Shining / ''Salem''s Lot / Night Shift / Carrie][2]


----------
See also:

 - [Selected from Carrie][3]


  [1]: https://stephenking.com/library/novel/carrie.html
  [2]: https://openlibrary.org/works/OL19558521W
  [3]: https://openlibrary.org/works/OL11018609W/Selected_from_Carrie', 1974, 'ita', 'book_data/covers/9256043.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('horror')) LIMIT 1),
    'Misery', 'Novelist Paul Sheldon has plans to make the difficult transition from writing historical romances featuring heroine Misery Chastain to publishing literary fiction. Annie Wilkes, Sheldon''s number one fan, rescues the author from the scene of a car accident. The former nurse takes care of him in her remote house, but becomes irate when she discovers that the author has killed Misery off in his latest book. Annie keeps Sheldon prisoner while forcing him to write a book that brings Misery back to life.

[Source][1]


  [1]: https://stephenking.com/library/novel/misery.html', 1978, 'ita', 'book_data/covers/8259296.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Mario Puzo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Godfather', 'The Godfather is a crime novel by American author Mario Puzo. Originally published in 1969 by G. P. Putnam''s Sons, the novel details the story of a fictional Mafia family in New York City (and Long Beach, New York), headed by Vito Corleone. Puzo''s dedication for The Godfather is "For Anthony Cleri". The novel''s epigraph is by the French author Honoré de Balzac: "Behind every great fortune there is a crime." The novel covers the years 1945 to 1955 and includes the back story of Vito Corleone from early childhood to adulthood.


----------
Also contained in:

 - [The Godfather / The Fortunate Pilgrim](https://openlibrary.org/works/OL7920005W)
 - [The Godfather / The Last Don](https://openlibrary.org/works/OL1673242W)', 1969, 'eng', 'book_data/covers/6507069.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Mystery of the Blue Train', 'Bound for the Riviera, detective Hercule Poirot has boarded Le Train Bleu, an elegant, leisurely means of travel, free of intrigue. Then he meets Ruth Kettering. The American heiress bailing out of a doomed marriage is en route to reconcile with her former lover. But by morning, her private affairs are made public when she is found murdered in her luxury compartment. The rumour of a strange man loitering in the victim''s shadow is all Poirot has to go on. Until Mrs. Kettering''s secret life begins to unfold...', 1928, 'eng', 'book_data/covers/14575533.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Euclid')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('western')) LIMIT 1),
    'Elements', 'The classic Heath translation, in a completely new layout with plenty of space and generous margins. An affordable but sturdy student and teacher sewn softcover edition in one volume, with minimal notes and a new index/glossar', 1482, 'ara', 'book_data/covers/1736063.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Πλάτων')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('western')) LIMIT 1),
    'Συμπόσιον', 'One of the most famous works of literature in the Western world, Plato''s Symposium is also one of the most entertaining. The scene is a dinner party in Athens in 416 B.C. at which the guests - including the comic poet Aristophanes and Plato''s mentor, Socrates - playfully discuss the nature of eros, or love. By turns earthly and sublime, the dialogue culminates with Socrates''s famous account of the "ladder of love," an extended analysis of the many forms of eros.

The evening ends with a speech by the drunken Alcibiades, the most popular and powerful Athenian of the day, who insists on praising Socrates rather than love, offering up a brilliant character sketch of the enigmatic philosopher.

This Modern Library edition is the authoritative translation by Benjamin Jowett, substantially revised by Dr. Hayden Pelliccia, associate professor of classics at Cornell University. This revised translation takes into account advances in scholarship since Jowett''s day and modernizes the Victorian English where it is coy or archaic. The result is a translation neither too colloquial nor too literal, one that is faithful to both Jowett''s superb prose and Plato''s matchless original.', 1559, 'ara', 'book_data/covers/14398918.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Wallace D. Wattles')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('self-help')) LIMIT 1),
    'The science of getting rich, or, financial success through creative thought', 'As featured in the bestselling book The Secret, here is the landmark guide to wealth creation republished with the classic essay How to Get What You Want.Wallace D. Wattles spent a lifetime considering the laws of success as he found them in the work of the worlds great philosophers. He then turned his life effort into this simple, slender book  a volume that he vowed could replace libraries of philosophy, spirituality, and self-help for the purpose of attaining one definite goal: a life of prosperity.Wattles describes a definite science of wealth attraction, built on the foundation of one commanding idea: There is a thinking stuff from which all things are madeA thought, in this substance, produces the thing that is imaged by the thought.In his seventeen short, straight-to-the-point chapters, Wattles shows how to use this idea, how to overcome barriers to its application, and how work with very direct methods that awaken it in your life. He further explains how creation and not competition is the hidden key to wealth attraction, and how your power to get rich uplifts everyone around you.The Science of Getting Rich concludes with Wattles rare essay How to Get Want You Want  a brilliant refresher of his laws of wealth creation.', 1910, 'spa', 'book_data/covers/854989.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Joseph Murphy')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('self-help')) LIMIT 1),
    'The Power of Your Subconscious Mind', 'Examines the connection between the mental dynamics of thinking in relation to one''s quality of life while offering simple techniques designed to create new, more innovative thought processes and stimulate creativity, in a revised and expanded edition of the best-selling work.', 1963, 'spa', 'book_data/covers/6553019.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Mystery of the Blue Train', 'Bound for the Riviera, detective Hercule Poirot has boarded Le Train Bleu, an elegant, leisurely means of travel, free of intrigue. Then he meets Ruth Kettering. The American heiress bailing out of a doomed marriage is en route to reconcile with her former lover. But by morning, her private affairs are made public when she is found murdered in her luxury compartment. The rumour of a strange man loitering in the victim''s shadow is all Poirot has to go on. Until Mrs. Kettering''s secret life begins to unfold...', 1928, 'ita', 'book_data/covers/14575533.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Mario Puzo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Godfather', 'The Godfather is a crime novel by American author Mario Puzo. Originally published in 1969 by G. P. Putnam''s Sons, the novel details the story of a fictional Mafia family in New York City (and Long Beach, New York), headed by Vito Corleone. Puzo''s dedication for The Godfather is "For Anthony Cleri". The novel''s epigraph is by the French author Honoré de Balzac: "Behind every great fortune there is a crime." The novel covers the years 1945 to 1955 and includes the back story of Vito Corleone from early childhood to adulthood.


----------
Also contained in:

 - [The Godfather / The Fortunate Pilgrim](https://openlibrary.org/works/OL7920005W)
 - [The Godfather / The Last Don](https://openlibrary.org/works/OL1673242W)', 1969, 'ita', 'book_data/covers/6507069.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Yogananda Paramahansa')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'Autobiography of a Yogi', 'The autobiography of Paramahansa Yogananda (1893 - 1952) details his search for a guru, during which he encountered many spiritual leaders and world-renowned scientists. When it was published in 1946 it was the first introduction of many westerners to yoga and meditation.The famous opera singer Amelita Galli-Curci said about the book:"Amazing, true stories of saints and masters of India, blended with priceless superphysical information-much needed to balance the Western material efficiency with Eastern spiritual efficiency-come from the vigorous pen of Paramhansa Yogananda, whose teachings my husband and myself have had the pleasure of studying for twenty years."', 1946, 'fre', 'book_data/covers/805448.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas à Kempis')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('spirituality')) LIMIT 1),
    'Imitation of Christ', 'Classic Christian devotional', 1568, 'fre', 'book_data/covers/5954136.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur C. Clarke')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    '2001', 'A novel that proposes an idea about how the human race might have begun and where it might be headed...given a little help from out there. A colaboration of ideas with director Stanley Kubrick in the late 1960''s it begins at "the dawn of man" and then leaps to the year 2001 where a mission to Saturn (Jupiter in the film) is mounted to try and answer questions raised by the discovery of an ancient artifact dug up on the moon. Though not particularly fast paced, the science is good, and there are a few hair raising events. There are also interesting speculations about the future, such as the space shuttle, and a device eerily similar to an iPad. Leaving plenty of room for contemplation and the appreciation for the inevitable trials of space travel, this is one of the truly landmark pieces of hard science fiction.', 1968, 'spa', 'book_data/covers/11344400.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Ray Bradbury')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    'The Martian Chronicles', 'This is a collection of science fiction short stories, cleverly cobbled together to form a coherent and very readable novel about a future colonization of Mars. As the stories progress chronologically the author tells how the first humans colonized Mars, initially sharing the planet with a handful of Martians. When Earth is devastated by nuclear war the colony is left to fend for itself and the colonists determine to build a new Earth on Mars.', 1950, 'spa', 'book_data/covers/9346537.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Lois Lowry')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'The Giver', 'At the age of twelve, Jonas, a young boy from a seemingly utopian, futuristic world, is singled out to receive special training from The Giver, who alone holds the memories of the true joys and pain of life.', 1993, 'ger', 'book_data/covers/8352502.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Philip Pullman')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('young adult')) LIMIT 1),
    'Northern Lights', 'In a landmark epic of fantasy and storytelling, Philip Pullman invites readers into a world as convincing and thoroughly realized as Narnia, Earthsea, or Redwall. Here lives an orphaned ward named Lyra Belacqua, whose carefree life among the scholars at Oxford''s Jordan College is shattered by the arrival of two powerful visitors. First, her fearsome uncle, Lord Asriel, appears with evidence of mystery and danger in the far North, including photographs of a mysterious celestial phenomenon called Dust and the dim outline of a city suspended in the Aurora Borealis that he suspects is part of an alternate universe. He leaves Lyra in the care of Mrs. Coulter, an enigmatic scholar and explorer who offers to give Lyra the attention her uncle has long refused her. In this multilayered narrative, however, nothing is as it seems. Lyra sets out for the top of the world in search of her kidnapped playmate, Roger, bearing a rare truth-telling instrument, the compass of the title. All around her children are disappearing—victims of so-called "Gobblers"—and being used as subjects in terrible experiments that separate humans from their daemons, creatures that reflect each person''s inner being. And somehow, both Lord Asriel and Mrs. Coulter are involved.', 1995, 'ger', 'book_data/covers/8747028.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Mario Puzo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Godfather', 'The Godfather is a crime novel by American author Mario Puzo. Originally published in 1969 by G. P. Putnam''s Sons, the novel details the story of a fictional Mafia family in New York City (and Long Beach, New York), headed by Vito Corleone. Puzo''s dedication for The Godfather is "For Anthony Cleri". The novel''s epigraph is by the French author Honoré de Balzac: "Behind every great fortune there is a crime." The novel covers the years 1945 to 1955 and includes the back story of Vito Corleone from early childhood to adulthood.


----------
Also contained in:

 - [The Godfather / The Fortunate Pilgrim](https://openlibrary.org/works/OL7920005W)
 - [The Godfather / The Last Don](https://openlibrary.org/works/OL1673242W)', 1969, 'spa', 'book_data/covers/6507069.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Mystery of the Blue Train', 'Bound for the Riviera, detective Hercule Poirot has boarded Le Train Bleu, an elegant, leisurely means of travel, free of intrigue. Then he meets Ruth Kettering. The American heiress bailing out of a doomed marriage is en route to reconcile with her former lover. But by morning, her private affairs are made public when she is found murdered in her luxury compartment. The rumour of a strange man loitering in the victim''s shadow is all Poirot has to go on. Until Mrs. Kettering''s secret life begins to unfold...', 1928, 'spa', 'book_data/covers/14575533.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Harper Lee')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'To Kill a Mockingbird', 'One of the best-loved stories of all time, To Kill a Mockingbird has been translated into more than 40 languages, sold more than 30 million copies worldwide, served as the basis for an enormously popular motion picture, and voted one of the best novels of the 20th century by librarians across the United States. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father -- a crusading local lawyer -- risks everything to defend a black man unjustly accused of a terrible crime.

Lawyer Atticus Finch defends Tom Robinson -- a black man charged with the rape of a white girl. Writing through the young eyes of Finch''s children Scout and Jem, Harper Lee explores with rich humor and unswerving honesty the irrationality of adult attitudes toward race and class in small-town Alabama during the mid-1930s Depression years. The conscience of a town steeped in prejudice, violence, and hypocrisy is pricked by the stamina and quiet heroism of one man''s struggle for justice. But the weight of history will only tolerate so much.


----------
Also contained in:

 - [Best Sellers from Reader''s Digest Condensed Books](https://openlibrary.org/works/OL16035425W)', 1960, 'rus', 'book_data/covers/12606502.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('E. L. James')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('contemporary')) LIMIT 1),
    'Fifty Shades of Grey', 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.
 
Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.

Erotic, amusing, and deeply moving, the Fifty Shades Trilogy is a tale that will obsess you, possess you, and stay with you forever.

This book is intended for mature audiences.', 2000, 'rus', 'book_data/covers/12648183.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas Bulfinch')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('mythology')) LIMIT 1),
    'Age of fable', 'Drawing on the works of Homer, Ovid, Virgil, and other classical authors, as well as an immense trove of stories about the Norse gods and heroes, The Age of Fable offers lively retellings of the myths of the Greek and Roman gods: Venus and Adonis, Jupiter and Juno, Daphne and Apollo, and many others. [Source][1].


  [1]: http://www.amazon.com/gp/product/0486411079/ref=pd_lpo_sbs_dp_ss_2?pf_rd_p=1944687582&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=0452011523&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0HP4FXC8G5H55E0BK1WV', 1800, 'fre', 'book_data/covers/419378.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sophocles')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('mythology')) LIMIT 1),
    'Οἰδίπους Τύραννος (Oidípous Týrannos)', 'Oedipus Rex chronicles the story of Oedipus, a man that becomes the king of Thebes and was always destined from birth to murder his father Laius and marry his mother Jocasta. The play is an example of a classic tragedy, noticeably containing an emphasis on how Oedipus''s own faults contribute to the tragic hero''s downfall, as opposed to having fate be the sole cause. Over the centuries, Oedipus Rex has come to be regarded by many as the Greek tragedy par excellence.', 1715, 'fre', 'book_data/covers/764695.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Hugh Lofting')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'The Story of Doctor Dolittle', 'There are some of us now reaching middle age who discover themselves to be lamenting the past in one respect if in none other, that there are no books written now for children comparable with those of thirty years ago.  I say written FOR children because the new psychological business of writing ABOUT them as though they were small pills or hatched in some especially scientific method is extremely popular today.', 1920, 'jpn', 'book_data/covers/5262289.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Jonathan Swift')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'Gulliver''s Travels', 'A parody of traveler’s tales and a satire of human nature, “Gulliver’s Travels” is Jonathan Swift’s most famous work which was first published in 1726. An immensely popular tale ever since its original publication, “Gulliver’s Travels” is the story of its titular character, Lemuel Gulliver, a man who loves to travel. A series of four journeys are detailed in which Gulliver finds himself in a number of amusing and precarious situations. In the first voyage, Gulliver is imprisoned by a race of tiny people, the Lilliputians, when following a shipwreck he is washed upon the shores of their island country. In his second voyage Gulliver finds himself abandoned in Brobdingnag, a land of giants, where he is exhibited for their amusement. In his third voyage, Gulliver once again finds himself marooned; fortunately he is rescued by the flying island of Laputa, a kingdom devoted to the arts of music and mathematics. He subsequently travels to the surrounding lands of Balnibarbi, Luggnagg, Glubbdubdrib, and Japan. Finally in his last voyage, when he is set adrift by a mutinous crew, he finds himself in the curious Country of the Houyhnhnms. Through the various experiences of Gulliver, Swift brilliantly satirizes the political and cultural environment of his time in addition to creating a lasting and enchanting tale of fantasy. This edition is illustrated by Milo Winter and includes an introduction by George R. Dennis.', 1726, 'jpn', 'book_data/covers/12717083.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Thomas Bulfinch')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('romance')) LIMIT 1),
    'Age of fable', 'Drawing on the works of Homer, Ovid, Virgil, and other classical authors, as well as an immense trove of stories about the Norse gods and heroes, The Age of Fable offers lively retellings of the myths of the Greek and Roman gods: Venus and Adonis, Jupiter and Juno, Daphne and Apollo, and many others. [Source][1].


  [1]: http://www.amazon.com/gp/product/0486411079/ref=pd_lpo_sbs_dp_ss_2?pf_rd_p=1944687582&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=0452011523&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0HP4FXC8G5H55E0BK1WV', 1800, 'fre', 'book_data/covers/419378.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Lucy Maud Montgomery')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('romance')) LIMIT 1),
    'The blue castle', 'Valancy Stirling is 29, unmarried, and has never been in love. Living with her overbearing mother and meddlesome aunt, she finds her only consolation in the "forbidden" books of John Foster and her daydreams of the Blue Castle--a place where all her dreams come true and she can be who she truly wants to be. After getting shocking news from the doctor, she rebels against her family and discovers a surprising new world, full of love and adventures far beyond her most secret dreams.', 1926, 'fre', 'book_data/covers/14640067.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Mario Puzo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Godfather', 'The Godfather is a crime novel by American author Mario Puzo. Originally published in 1969 by G. P. Putnam''s Sons, the novel details the story of a fictional Mafia family in New York City (and Long Beach, New York), headed by Vito Corleone. Puzo''s dedication for The Godfather is "For Anthony Cleri". The novel''s epigraph is by the French author Honoré de Balzac: "Behind every great fortune there is a crime." The novel covers the years 1945 to 1955 and includes the back story of Vito Corleone from early childhood to adulthood.


----------
Also contained in:

 - [The Godfather / The Fortunate Pilgrim](https://openlibrary.org/works/OL7920005W)
 - [The Godfather / The Last Don](https://openlibrary.org/works/OL1673242W)', 1969, 'ita', 'book_data/covers/6507069.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('crime')) LIMIT 1),
    'The Mystery of the Blue Train', 'Bound for the Riviera, detective Hercule Poirot has boarded Le Train Bleu, an elegant, leisurely means of travel, free of intrigue. Then he meets Ruth Kettering. The American heiress bailing out of a doomed marriage is en route to reconcile with her former lover. But by morning, her private affairs are made public when she is found murdered in her luxury compartment. The rumour of a strange man loitering in the victim''s shadow is all Poirot has to go on. Until Mrs. Kettering''s secret life begins to unfold...', 1928, 'ita', 'book_data/covers/14575533.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Pierre Choderlos de Laclos')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('relationships')) LIMIT 1),
    'Les Liaisons dangereuses', 'Cet ouvrage, ou plutot ce recueil, que le public trouvera peut-etre encore trop volumineux, ne contient pourtant que le plus petit nombre des lettres qui composaient la totalite de la correspondance dont il est extrait. Charge de la mettre en ordre par les personnes a qui elle etait parvenue, et que je savais dans l''intention de la publier, je n''ai demande, pour prix de mes soins, que la permission d''elaguer tout ce qui me paraitrait inutile; et j''ai tache de ne conserver en effet que les lettres qui m''ont paru necessaires, soit a l''intelligence des evenements, soit au developpement des caracteres.', 1782, 'fre', 'book_data/covers/5258265.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Isabel Allende')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('relationships')) LIMIT 1),
    'La casa de los espíritus', 'Primera novela de Isabel Allende. *La casa de los espíritus* narra la saga de una poderosa familia de terratenientes latinoamericanos. El despótico patriarca Esteban Trueba ha construido, con mano de hierro, un imperio privado que empieza a tambalearse a raíz del paso del tiempo y de un entorno social explosivo. Finalmente, la decadencia personal del patriarca arrastrará a los Trueba a una dolorosa desintegración. Atrapados en unas dramáticas relaciones familiares, los personajes de esta portentosa novela encarnan las tensiones sociales y espirituales de una época que abarca gran parte de este siglo.

*La casa de los espíritus* ha sido adaptada al cine en una película protagonizada, entre otros, por Jerermy Irons, Meryl Streep y Antonio Banderas.Con ternura e impecable factura literaria, Isabel Allende perfila el destino de sus personajes como parte indisoluble del destino colectivo de un continente, marcado por el mestizaje, las injusticias sociales y la búsqueda de la propia identidad. Este logrado universo narrativo es el resultado de una lúcida conciencia histórica y social, así como de una propuesta estética que constituye una singular expresión de realismo mágico.', 1982, 'fre', 'book_data/covers/3205226.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sam McBratney')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('parenting')) LIMIT 1),
    'Guess How Much I Love You', 'Welcome the family classic with an elegant, refreshed cover — the quintessential picture book, just waiting to be shared.

Sometimes, when you love someone very, very much, you want to find a way of describing how much you treasure them. But, as Little Nutbrown Hare and Big Nutbrown Hare discover, love is not an easy thing to measure! For two decades, Sam McBratney’s timelessly endearing story, beautifully rendered in Anita Jeram’s exquisite watercolors, has captured the deep and tender bond between parent and child. Guess How Much I Love You is one of the world’s best-loved picture books.', 1839, 'spa', 'book_data/covers/13282906.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Roald Dahl')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('parenting')) LIMIT 1),
    'Matilda', 'No podemos resistirnos a Matilda y recomendar a su autor a los niños que no lo conozcan. Matilda debe poner orden en una escuela poco acogedora porque sus profesores no están a la altura de su profesión. Pero el humor, la ironía y también la ternura harán que la escuela termine siendo un lugar amable donde ayuden a los niños a crecer y a leer. Roald Dahl decía que todos los niños tenían una brasa y que alguien debe encender el fuego y mantenerlo encendido. La escuela tiene este papel que cumplir porque de ello depende la luz del mundo.

Source: [1], back cover


  [1]: https://archive.org/details/matilda00roal', 1988, 'spa', 'book_data/covers/12889769.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Robert Louis Stevenson')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('supernatural')) LIMIT 1),
    'The Strange Case of Dr. Jekyll and Mr. Hyde', 'Stevenson’s famous gothic novella, first published in 1886, and filmed countless times is better known simply as Jekyll and Hyde. The first novel to toy with the idea of a split personality, it features the respectable Dr. Jekyll transforming himself into the evil Mr Hyde in a failed attempt to learn more about the duality of man.', 1875, 'ita', 'book_data/covers/295773.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Stephen King')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('supernatural')) LIMIT 1),
    'Carrie', 'The story of misfit high-school girl, Carrie White, who gradually discovers that she has telekinetic powers. Repressed by a domineering, ultra-religious mother and tormented by her peers at school, her efforts to fit in lead to a dramatic confrontation during the senior prom. 
([source][1])


----------
Also contained in:

 - [The Shining / ''Salem''s Lot / Night Shift / Carrie][2]


----------
See also:

 - [Selected from Carrie][3]


  [1]: https://stephenking.com/library/novel/carrie.html
  [2]: https://openlibrary.org/works/OL19558521W
  [3]: https://openlibrary.org/works/OL11018609W/Selected_from_Carrie', 1974, 'ita', 'book_data/covers/9256043.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Wilkie Collins')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'The Woman in White', 'The Woman in White famously opens with Walter Hartright''s eerie encounter on a moonlit London road. Engaged as a drawing master to the beautiful Laura Fairlie, Walter is drawn into the sinister intrigues of Sir Percival Glyde and his ''charming'' friend Count Fosco, who has a taste for white mice, vanilla bonbons and poison. Pursuing questions of identity and insanity along the paths and corridors of English country houses and the madhouse, The Woman in White is the first and most influential of the Victorian genre that combined Gothic horror with psychological realism.', 1860, 'ara', 'book_data/covers/4684227.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('art')) LIMIT 1),
    'The Da Vinci Code', 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown''s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.


----------
See also:
[The Da Vinci Code [1/2]](https://openlibrary.org/works/OL24164822W)
[The Da Vinci Code [2/2]](https://openlibrary.org/works/OL24210437W)

		
Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2003, 'ara', 'book_data/covers/9255229.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Will Durant')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('philosophy')) LIMIT 1),
    'The Story of Philosophy', 'It''s like having the "cliff notes" of all western philosophy.', 1926, 'eng', 'book_data/covers/5444146.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Friedrich Nietzsche')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('philosophy')) LIMIT 1),
    'Jenseits von Gut und Böse', 'V good', 1885, 'eng', 'book_data/covers/8245356.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Agatha Christie')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('thriller')) LIMIT 1),
    'The Secret of Chimneys', 'A bit of adventure and quick cash is all that good-natured drifter Anthony Cade is looking for when he accepts a messenger job from an old friend. It sounds so simple: deliver the provocative memoirs of a recently deceased European count to a London publisher. Little did Anthony suspect that a simple errand to deliver the manuscript on behalf of his friend would drop him right in the middle of an international conspiracy, and he begins to realize that it has placed him in serious danger. Why were Count Stylptich''s memoirs so important? And what was "King Victor" really after? The parcel holds ore than scandalous royal secrets - because it contains a stash of letters that suggest blackmail. Someone would stop at nothing to prevent the monarchy being restored in faraway Herzoslovakia.

Wherever ravishing Virginia Revel went, death seemed sure to follow. First her husband died. The next to perish was a foreign prince whose ruthless power was matched by his scandalous passions. Then a bungling blackmailer followed them into the grave. Murder, blackmail, stolen letters, and a fabulous missing jewel: all under the not always co-operative eyes of Scotland Yard and the Surete. All threads lead to Chimneys, one of England''s historic country house estates, where a master murderer mingled with the aristocratic guests. Virginia could turn to only one person to prove her innocence and end her nightmare, and she could only pray that she had not put her life into the hands of the man who was out to take it....

This novel was published in 1925 by Bodley Head in London, and by Dodd, Mead & Co. in New York. The Times Literary Supplement described it as "a thick fog of mystery, cross purposes, and romance, which leads up to a most unexpected and highly satisfactory ending".Chimneys was adapted by Christie as a stage play but was not performed until 2003, in Canada. It was filmed with the addition of Julia McKenzie as Miss Marple by ITV in 2009.', 1925, 'ita', 'book_data/covers/12996574.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('thriller')) LIMIT 1),
    'The Da Vinci Code', 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown''s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.


----------
See also:
[The Da Vinci Code [1/2]](https://openlibrary.org/works/OL24164822W)
[The Da Vinci Code [2/2]](https://openlibrary.org/works/OL24210437W)

		
Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2003, 'ita', 'book_data/covers/9255229.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Sam McBratney')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('parenting')) LIMIT 1),
    'Guess How Much I Love You', 'Welcome the family classic with an elegant, refreshed cover — the quintessential picture book, just waiting to be shared.

Sometimes, when you love someone very, very much, you want to find a way of describing how much you treasure them. But, as Little Nutbrown Hare and Big Nutbrown Hare discover, love is not an easy thing to measure! For two decades, Sam McBratney’s timelessly endearing story, beautifully rendered in Anita Jeram’s exquisite watercolors, has captured the deep and tender bond between parent and child. Guess How Much I Love You is one of the world’s best-loved picture books.', 1839, 'eng', 'book_data/covers/13282906.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Roald Dahl')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('parenting')) LIMIT 1),
    'Matilda', 'No podemos resistirnos a Matilda y recomendar a su autor a los niños que no lo conozcan. Matilda debe poner orden en una escuela poco acogedora porque sus profesores no están a la altura de su profesión. Pero el humor, la ironía y también la ternura harán que la escuela termine siendo un lugar amable donde ayuden a los niños a crecer y a leer. Roald Dahl decía que todos los niños tenían una brasa y que alguien debe encender el fuego y mantenerlo encendido. La escuela tiene este papel que cumplir porque de ello depende la luz del mundo.

Source: [1], back cover


  [1]: https://archive.org/details/matilda00roal', 1988, 'eng', 'book_data/covers/12889769.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Winston S. Churchill')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('war')) LIMIT 1),
    'The Second World War', 'Never before in history have there been combined in one man the character, the political leadership, the military perception and the eloquence which our generation has known in Winston Churchill. It is no wonder that when it was announced that he would write the history of the Second World War, there arose throughout the world an interest and excitement caused by no other publication of this century. The six volumes of The Second World War fulfilled the highest expectations with which they were awaited. But the great length of the work and its necessary cost has prevented many thousands from reading and owning this great history. Now the heart of the work appears in one volume. The abbreviation has been made with the utmost skill, resulting in a unified, dramatic story of the world''s greatest ordeal. Perhaps the glory of Sir Winston''s prose is even heigtened by the omission of details necessary for the record but of less interest to the general reader. Memoirs of the Second World War will be read and treasured by a vast number of people who do not yet know this drama written imperishably by one of its greatest actors. - Jacket flap.', 1948, 'rus', 'book_data/covers/7347623.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Joseph Heller')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('war')) LIMIT 1),
    'Catch-22', 'Catch-22 is like no other novel. It has its own rationale, its own extraordinary character. It moves back and forth from hilarity to horror. It is outrageously funny and strangely affecting. It is totally original. Set in the closing months of World War II in an American bomber squadron off Italy, Catch-22 is the story of a bombardier named Yossarian, who is frantic and furious because thousands of people he hasn''t even met keep trying to kill him. Catch-22 is a microcosm of the twentieth-century world as it might look to someone dangerously sane. It is a novel that lives and moves and grows with astonishing power and vitality -- a masterpiece of our time. - Back cover.', 1961, 'rus', 'book_data/covers/6468653.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Marco Polo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'The Travels of Marco Polo', 'Join the 13th century merchants Marco, Niccolo and Maffeo Polo as they journey from their native city of Venice to the faraway land of Cathay, or China. There, young Marco will meet Kublai Khan, the ruler of the vast Mongolian empire. Read about his many adventures serving the Khan in the lands East of Europe, and his adventures coming back home to Venice. This medieval book, dictated by Marco while imprisoned in Genoa, was one of the inspirations of the Age of Exploration during the Renaissance, and it still intrigues readers today to learn of the Polo''s adventures in the far East.', 1818, 'spa', 'book_data/covers/8237917.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Somerset Maugham')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('travel')) LIMIT 1),
    'The Razor''s Edge', 'This novel, supposedly based on the life of an acquaintance of Maugham, follows the fortunes of an American pilot who, traumatized by war, rejects his former conventional life to search for a more meaningful existence. After studying in Paris for two years he decides to travel, taking various menial jobs. Although being influenced by some of the people he meets it is not until he reaches India that he begins to find peace.', 1944, 'spa', 'book_data/covers/97505.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('H. G. Wells')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('dystopian')) LIMIT 1),
    'When the Sleeper Awakes', 'A troubled insomniac in 1890s England falls suddenly into a sleep-like trance, from which he does not awake for over two hundred years. During his centuries of slumber, however, investments are made that make him the richest and most powerful man on Earth. But when he comes out of his trance he is horrified to discover that the money accumulated in his name is being used to maintain a hierarchal society in which most are poor, and more than a third of all people are enslaved. Oppressed and uneducated, the masses cling desperately to one dream – that the sleeper will awake, and lead them all to freedom.', 1899, 'fre', 'book_data/covers/574886.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Margaret Atwood')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('dystopian')) LIMIT 1),
    'The Handmaid''s Tale', 'The Handmaid''s Tale is a dystopian novel by Canadian author Margaret Atwood, published in 1985. It is set in a near-future New England, in a strongly patriarchal, totalitarian theonomic state, known as the Republic of Gilead, which has overthrown the United States government. The central character and narrator is a woman named Offred, one of the group known as "handmaids", who are forcibly assigned to produce children for the "commanders" — the ruling class of men in Gilead.

The novel explores themes of subjugated women in a patriarchal society, loss of female agency and individuality, and the various means by which they resist and attempt to gain individuality and independence.

The Handmaid''s Tale won the 1985 Governor General''s Award and the first Arthur C. Clarke Award in 1987; it was also nominated for the 1986 Nebula Award, the 1986 Booker Prize, and the 1987 Prometheus Award.


----------
Also contained in:
[Novels](https://openlibrary.org/works/OL24301311W)', 1985, 'fre', 'book_data/covers/8231851.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Okakura Kakuzo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('cooking')) LIMIT 1),
    'The book of tea', 'Tea began as a medicine and grew into a beverage. In China, in the eighth century, it entered the realm of poetry as one of the polite amusements. The fifteenth century saw Japan ennoble it into a religion of aestheticism - Teaism. Teaism is a cult founded on the adoration of the beautiful among the sordid facts of everyday existence. It inculcates purity and harmony, the mystery of mutual charity, the romanticism of the social order.', 1900, 'ger', 'book_data/covers/8245415.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Laura Esquivel')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('cooking')) LIMIT 1),
    'Como agua para chocolate', 'Like Water for Chocolate (Spanish: Como agua para chocolate) is a novel by Mexican novelist and screenwriter Laura Esquivel.

The novel follows the story of a young girl named Tita, who longs for her lover, Pedro, but can never have him because of her mother''s upholding of the family tradition: the youngest daughter cannot marry, but instead must take care of her mother until she dies. Tita is only able to express herself when she cooks.

Esquivel employs magical realism to combine the supernatural with the ordinary throughout the novel.

The novel won the American Booksellers Book of the Year Award for Adult Trade in 1994.', 1989, 'ger', 'book_data/covers/8372632.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Titus Lucretius Carus')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('poetry')) LIMIT 1),
    'De rerum natura', 'This is regarded as a seminal text of Epicurean science and philosophy. Epicurians discarded both the idea of immortality and the superstitious worship of wilful gods for a life of serene contentment in the available pleasures of nature. Lucretius (c100-c55BC), in elucidating this belief, steers the reader through an extraordinary breadth of subject matter, ranging from the indestructibility of atoms and the discovery of fire to the folly of romantic love and the phenomena of clouds and rainstorms.', 1486, 'rus', 'book_data/covers/566208.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Emily Dickinson')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('poetry')) LIMIT 1),
    'The Poems of Emily Dickinson Volume II', 'Emily Dickinson lived as a recluse in Amherst, Massachusetts, dedicating herself to writing a "letter to the world" - the 1,775 poems left unpublished at her death in 1886. Today Dickinson stands in the front rank of American poets. This Modern Library edition presents the more than four hundred poems that were published between Dickinson''s death and 1900. They express her concepts of life and death, of love and nature, and of what Henry James called "the landscape of the soul.".

"No one can read these poems...without perceiving that he is not so much reading as being spoken to," observed Pulitzer Prize-winning poet Archibald MacLeish. "There is a curious energy in the words and a tone like no other most of us have ever heard....I know no poems in which the double structure of words as sounds and words as meanings - that curious relationship of the logically unrelated - will be found, on right reading, to be more comprehensive than it is in the poems of Emily Dickinson."', 1890, 'rus', 'book_data/covers/8236924.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Anne Frank')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('technology')) LIMIT 1),
    'Het Achterhuis', 'Het Achterhuis is de titel van het dagboek van Anne Frank (1929-1945) voor het eerst uitgegeven op 25 juni 1947. Het is genoemd naar het onderduikpand Het Achterhuis op de Prinsengracht en is het verhaal van een ondergedoken jong Joods meisje ten tijde van de Tweede Wereldoorlog. Het is wereldwijd een van de meest gelezen boeken. Sinds 2009 staat Annes dagboek op de Werelderfgoedlijst voor documenten van UNESCO.


----------
Also contained in:
[Works of Anne Frank](https://openlibrary.org/works/OL2931445W)', 1944, 'ita', 'book_data/covers/8584021.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('H. G. Wells')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('technology')) LIMIT 1),
    'When the Sleeper Awakes', 'A troubled insomniac in 1890s England falls suddenly into a sleep-like trance, from which he does not awake for over two hundred years. During his centuries of slumber, however, investments are made that make him the richest and most powerful man on Earth. But when he comes out of his trance he is horrified to discover that the money accumulated in his name is being used to maintain a hierarchal society in which most are poor, and more than a third of all people are enslaved. Oppressed and uneducated, the masses cling desperately to one dream – that the sleeper will awake, and lead them all to freedom.', 1899, 'ita', 'book_data/covers/574886.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Butler Yeats')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('poetry')) LIMIT 1),
    'Poems', 'A collection of the poetry of W. B. Yeats, famed Irish poet whose early poems are strongly influenced by the Pre-Raphaelites, and his later poems having more modernist leanings, although retaining the traditional forms rather than adopting free verse.', 1895, 'eng', 'book_data/covers/6968826.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Wordsworth')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('poetry')) LIMIT 1),
    'Poems', 'The aim of this edition is to present all textual evidence of Wordsworth''s work on the lyric and shorter narrative poems he composed between 1800 and 1807, the primary fruits of which appeared in 1807 under the title Poems in Two Volumes. - Preface.', 1807, 'eng', 'book_data/covers/102874.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur C. Clarke')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    '2001', 'A novel that proposes an idea about how the human race might have begun and where it might be headed...given a little help from out there. A colaboration of ideas with director Stanley Kubrick in the late 1960''s it begins at "the dawn of man" and then leaps to the year 2001 where a mission to Saturn (Jupiter in the film) is mounted to try and answer questions raised by the discovery of an ancient artifact dug up on the moon. Though not particularly fast paced, the science is good, and there are a few hair raising events. There are also interesting speculations about the future, such as the space shuttle, and a device eerily similar to an iPad. Leaving plenty of room for contemplation and the appreciation for the inevitable trials of space travel, this is one of the truly landmark pieces of hard science fiction.', 1968, 'fre', 'book_data/covers/11344400.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Ray Bradbury')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science fiction')) LIMIT 1),
    'The Martian Chronicles', 'This is a collection of science fiction short stories, cleverly cobbled together to form a coherent and very readable novel about a future colonization of Mars. As the stories progress chronologically the author tells how the first humans colonized Mars, initially sharing the planet with a handful of Martians. When Earth is devastated by nuclear war the colony is left to fend for itself and the colonists determine to build a new Earth on Mars.', 1950, 'fre', 'book_data/covers/9346537.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Great Britain.')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('economics')) LIMIT 1),
    'Laws, etc', '', 1691, 'jpn', 'book_data/covers/11505604.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('孙武')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('economics')) LIMIT 1),
    'The Art of War', 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu', 1900, 'jpn', 'book_data/covers/4849549.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Jack Kerouac')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'On The Road', 'Described as everything from a "last gasp" of romantic fiction to a founding text of the Beat Generation movement, this story amounts to a nonfiction novel (as critics were later to describe some works).  Unpublished writer buddies wander from coast to coast in search of whatever they find, eager for experience.  Kerouac''s spokesman is Sal Paradise (himself) and real-life friend Neal Casady appears as Dean Moriarty.', 1957, 'ita', 'book_data/covers/34655.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Vālmīki')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('classic')) LIMIT 1),
    'Ramayana, a Holy Bible of India', 'राहुल मौर्य " पब्लिकेशन अथॉरिटी भारतीय प्रोड्यूसर द्वारा संचालित
भारत ,सरकार यूपी"', 1823, 'ita', 'book_data/covers/8238736.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Albert Camus')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('psychology')) LIMIT 1),
    'La Peste', 'The Plague (French: La Peste) is a novel by Albert Camus, published in 1947, that tells the story of a plague sweeping the French Algerian city of Oran. It asks a number of questions relating to the nature of destiny and the human condition. The characters in the book, ranging from doctors to vacationers to fugitives, all help to show the effects the plague has on a populace.', 1942, 'fre', 'book_data/covers/13151272.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Virginia Woolf')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('psychology')) LIMIT 1),
    'The Waves', 'Tracing the lives of a group of friends, this novel follows their development from childhood to middle age. Social events, individual achievements and disappointments form the outer structure of the book, but the focus is the inner life of the characters which is conveyed in rich poetic language.', 1931, 'fre', 'book_data/covers/119517.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Oscar Wilde')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('comedy')) LIMIT 1),
    'The Importance of Being Earnest', 'Set in England during the late Victorian era, the play''s humour derives in part from characters maintaining fictitious identities to escape unwelcome social obligations. It is replete with witty dialogue and satirises some of the foibles and hypocrisy of late Victorian society. It has proved Wilde''s most enduringly popular play. - [*Wikipedia*][1]


  [1]: http://en.wikipedia.org/wiki/The_Importance_of_Being_Earnest', 1893, 'ger', 'book_data/covers/1260453.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Shakespeare')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('comedy')) LIMIT 1),
    'As You Like It', 'This play has two principal settings: the court that Frederick has usurped from his brother, the rightful Duke, and the Forest of Arden, where the Duke and his followers (including the disgruntled Lord Jaques and the jester Touchstone) are living.', 1734, 'ger', 'book_data/covers/7338874.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Yogananda Paramahansa')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('biography')) LIMIT 1),
    'Autobiography of a Yogi', 'The autobiography of Paramahansa Yogananda (1893 - 1952) details his search for a guru, during which he encountered many spiritual leaders and world-renowned scientists. When it was published in 1946 it was the first introduction of many westerners to yoga and meditation.The famous opera singer Amelita Galli-Curci said about the book:"Amazing, true stories of saints and masters of India, blended with priceless superphysical information-much needed to balance the Western material efficiency with Eastern spiritual efficiency-come from the vigorous pen of Paramhansa Yogananda, whose teachings my husband and myself have had the pleasure of studying for twenty years."', 1946, 'fre', 'book_data/covers/805448.jpg', 2, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Plutarch')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('biography')) LIMIT 1),
    'Lives', 'Character studies comparing statesmen and generals of pre-Christian Greece and Rome.', 1564, 'fre', 'book_data/covers/10679669.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Nevil Shute')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science')) LIMIT 1),
    'On The Beach', 'A novel about the survivors of an atomic war, who face an inevitable end as radiation poisoning moves toward Australia from the North.', 1957, 'rus', 'book_data/covers/997896.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Arthur C. Clarke')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('science')) LIMIT 1),
    '2001', 'A novel that proposes an idea about how the human race might have begun and where it might be headed...given a little help from out there. A colaboration of ideas with director Stanley Kubrick in the late 1960''s it begins at "the dawn of man" and then leaps to the year 2001 where a mission to Saturn (Jupiter in the film) is mounted to try and answer questions raised by the discovery of an ancient artifact dug up on the moon. Though not particularly fast paced, the science is good, and there are a few hair raising events. There are also interesting speculations about the future, such as the space shuttle, and a device eerily similar to an iPad. Leaving plenty of room for contemplation and the appreciation for the inevitable trials of space travel, this is one of the truly landmark pieces of hard science fiction.', 1968, 'rus', 'book_data/covers/11344400.jpg', 1, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Okakura Kakuzo')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('cooking')) LIMIT 1),
    'The book of tea', 'Tea began as a medicine and grew into a beverage. In China, in the eighth century, it entered the realm of poetry as one of the polite amusements. The fifteenth century saw Japan ennoble it into a religion of aestheticism - Teaism. Teaism is a cult founded on the adoration of the beautiful among the sordid facts of everyday existence. It inculcates purity and harmony, the mystery of mutual charity, the romanticism of the social order.', 1900, 'spa', 'book_data/covers/8245415.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('William Faulkner')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('cooking')) LIMIT 1),
    'The Sound and the Fury', 'In many ways this was an experimental novel, using several differing narrative styles. Divided into four parts, the author relates the same episodes from four different viewpoints, using a different style for each. The story concerns various members of a Southern family, once wealthy landowners but now struggling to maintain their reputation.', 1929, 'spa', 'book_data/covers/8292212.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('孙武')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('economics')) LIMIT 1),
    'The Art of War', 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu', 1900, 'fre', 'book_data/covers/4849549.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Karl Marx')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('economics')) LIMIT 1),
    'Das Kapital', 'Das Kapital, Karl Marx''s seminal work, is the book that above all others formed the twentieth century. From Kapital sprung the economic and political systems that at one time dominated half the earth and for nearly a century kept the world on the brink of war.', 1867, 'fre', 'book_data/covers/10995820.jpg', 4, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Benjamin Franklin')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('education')) LIMIT 1),
    'Autobiography', 'Few men could compare to Benjamin Franklin. Virtually self-taught, he excelled as an athlete, a man of letters, a printer, a scientist, a wit, an inventor, an editor, and a writer, and he was probably the most successful diplomat in American history. David Hume hailed him as the first great philosopher and great man of letters in the New World.

Written initially to guide his son, Franklin''s autobiography is a lively, spellbinding account of his unique and eventful life. Stylistically his best work, it has become a classic in world literature, one to inspire and delight readers everywhere.', 1791, 'jpn', 'book_data/covers/5647361.jpg', 3, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
INSERT INTO librarysystem.Books (
    author_id, genre_id, title, description, publication_year, language, cover_image_url, target_stock_count, created_at, updated_at
) VALUES (
    (SELECT author_id FROM librarysystem.Authors WHERE LOWER(TRIM(author_name)) = LOWER(TRIM('Dan Brown')) LIMIT 1),
    (SELECT genre_id FROM librarysystem.Genres WHERE LOWER(TRIM(genre_name)) = LOWER(TRIM('education')) LIMIT 1),
    'Angels & Demons', 'Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Brown''s subsequent novels. Angels & Demons shares many stylistic literary elements with its sequels, such as conspiracies of secret societies, a single-day time frame, and the Catholic Church. Ancient history, architecture, and symbology are also heavily referenced throughout the book.


----------
Contains:
[Angels & Demons [1/2]](https://openlibrary.org/works/OL34545389W)
[Angels & Demons [1/2]](https://openlibrary.org/works/OL36748095W)
[Angels & Demons [1/3]](https://openlibrary.org/works/OL17742693W)

Contained in:
[Angels & Demons / The Da Vinci Code](https://openlibrary.org/works/OL15290520W)', 2000, 'jpn', 'book_data/covers/11408459.jpg', 5, '2025-05-23 18:06:29', '2025-05-23 18:06:29'
);
