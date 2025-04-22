create database petstore;

use petstore;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE users ADD COLUMN cpf VARCHAR(14);
ALTER TABLE users ADD COLUMN telefone VARCHAR(15);

select * from users;

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_pet VARCHAR(100),
    raca_pet VARCHAR(100),
    tipo_servico VARCHAR(50),
    data_agendamento DATE,
    horario_agendamento TIME,
    imagem_pet VARCHAR(255),
    observacoes TEXT
);

select * from agendamentos;

ALTER TABLE agendamentos
ADD COLUMN usuario_id INT;

ALTER TABLE agendamentos
ADD CONSTRAINT fk_usuario
FOREIGN KEY (usuario_id) REFERENCES users(id);


INSERT INTO users (username, password, cpf, telefone)
VALUES
('joao@email.com', '$2b$10$QweRTY1234567890ABCDEuAqVvUGjFKnK1o1Uvhnl2Zt/j4y6yE6eW', '123.456.789-00', '(11) 91234-5678'),
('maria@email.com', '$2b$10$QweRTY1234567890ABCDEuAqVvUGjFKnK1o1Uvhnl2Zt/j4y6yE6eW', '987.654.321-00', '(21) 99876-5432');

INSERT INTO agendamentos (nome_pet, raca_pet, tipo_servico, data_agendamento, horario_agendamento, imagem_pet, observacoes, usuario_id)
VALUES
('Rex', 'Labrador', 'Banho', '2025-04-25', '10:00:00', 'rex.jpg', 'Muito agitado', 1),
('Luna', 'Poodle', 'Tosa', '2025-04-26', '14:30:00', 'luna.jpg', 'Tem alergia a shampoo', 1),
('Mingau', 'Persa', 'Consulta', '2025-04-27', '09:00:00', 'mingau.jpg', 'Está com tosse', 2);


INSERT INTO agendamentos (nome_pet, raca_pet, tipo_servico, data_agendamento, horario_agendamento, imagem_pet, observacoes, usuario_id)
VALUES
('Thor', 'Bulldog', 'Banho e Tosa', '2025-04-28', '11:00:00', 'thor.jpg', 'Não gosta de secador', 1),
('Mel', 'Beagle', 'Consulta', '2025-04-30', '15:15:00', 'mel.jpg', 'Vacinação anual', 1),
('Nina', 'Shih Tzu', 'Banho', '2025-05-02', '09:30:00', 'nina.jpg', 'Latido alto, mas dócil', 1);


INSERT INTO agendamentos (nome_pet, raca_pet, tipo_servico, data_agendamento, horario_agendamento, imagem_pet, observacoes, usuario_id)
VALUES
('Tom', 'Siamês', 'Consulta', '2025-04-29', '13:45:00', 'tom.jpg', 'Perdeu apetite', 2),
('Lola', 'Yorkshire', 'Banho', '2025-05-01', '10:30:00', 'lola.jpg', 'É muito medrosa', 2),
('Zeca', 'Golden Retriever', 'Banho e Tosa', '2025-05-03', '12:00:00', 'zeca.jpg', 'Muito peludo, cuidado com nós', 2);