CREATE DATABASE clinicaestetica;

CREATE TABLE cliente (
    codcliente INT AUTO_INCREMENT primary key,
    nome VARCHAR (250) NOT NULL,
    sobrenome VARCHAR (250) NOT NULL,
    email VARCHAR (250) UNIQUE,
    whatsapp VARCHAR (12),
    cep VARCHAR (8) NOT NULL,
    logradouro VARCHAR (100) NOT NULL,
    numero VARCHAR (10),
    complemento VARCHAR (50),
    bairro VARCHAR (50),
    cidade VARCHAR (50),
    estado CHAR (2)
);


