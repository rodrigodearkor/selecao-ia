DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  email VARCHAR(100) NOT NULL,
  login VARCHAR(50) NOT NULL,
  password VARCHAR(250) NOT NULL,
  admin INT NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime,
  constraint uq_login unique (login)
);

INSERT INTO users (name, email, login, password, admin, created_at) VALUES ('Evandir Rodrigo', 'rodrigodearkor@gmail.com', 'evandir', '$2a$10$FUg1MQZ9wcNloHyWpYtg4.v.Ny0KbFr5oQDf.ypUStwPnYcS76JvW', 1, current_time());