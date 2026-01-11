ALTER TABLE users ADD COLUMN phonenumber varchar(15) NOT NULL AFTER  name;


ALTER table transactions ADD column description TEXT after amount;


INSERT into users(name, phonenumber) VALUES('brand', '08105594926');

ALTER TABLE wallets DROP FOREIGN KEY wallets_user_id;
TRUNCATE TABLE users;
TRUNCATE TABLE wallets;
ALTER TABLE wallets ADD CONSTRAINT `wallets_user_id` FOREIGN KEY(`user_id`) REFERENCES users(`id`) ON DELETE CASCADE;

ALTER TABLE wallets MODIFY column balance bigint not null default 0;

DELETE from users where id=1;


INSERT INTO users (name, phonenumber)
VALUES
    ('John Doe', '1234567890'),
    ('Jane Smith', '0987654321'),
    ('Michael Johnson', '1122334455'),
    ('Emily Davis', '6677889900'),
    ('Daniel Brown', '5566778899'),
    ('Sophia Wilson', '4455667788'),
    ('David Clark', '3344556677'),
    ('Olivia Lewis', '2233445566'),
    ('James Walker', '7788990011'),
    ('Emma Hall', '9900112233');
