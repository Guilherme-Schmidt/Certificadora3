CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario BIGSERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Funcao VARCHAR(50),
    Setor VARCHAR(50),
    Data_Entrada DATE NOT NULL,
    Data_Saida DATE,
    Permissao INT NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(100) NOT NULL,
    CONSTRAINT FK_Usuarios_Permissoes FOREIGN KEY (Permissao) REFERENCES Permissoes(ID_Permissao) ON DELETE RESTRICT
);