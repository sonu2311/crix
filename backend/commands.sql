DROP TABLE users;
DROP TABLE chat;


CREATE table users ( id serial primary key, name varchar(100), phone_number varchar(20),  email varchar(100), password varchar(100), profile_pic varchar(1000), role varchar(100));

CREATE table chat (id serial primary key, sender_id int, receiver_id int, content varchar(100000), chat_time int);
