# Certificadora3
# Meninas Digitais no Controle (MDC) 
## Integrantes 
[George Silva Oliveira](https://github.com/georgeutfpr)<br>
[Guilherme Augusto Silva de Melo](https://github.com/Guilherme-Silva-Melo)<br>
[Guilherme Schmidht Lingnau](https://github.com/Guilherme-Schmidt)<br>
## Objetivos do Sistema
Desenvolver um sistema para gerenciar voluntários e apoiadores do projeto de extensão Meninas Digitais da UTFPR-CP
## Funcionalidades Desenvolvidas

- **Autenticação de Usuários**  
  - Login com validação no backend e geração de tokens para controle de acesso.

- **Cadastro de Usuários**  
  - Registro de novos usuários no sistema.

- **Listagem de Usuários**  
  - Exibição de uma lista com as informações dos usuários cadastrados.

- **Cadastro de Atividades**  
  - Registro de atividades relacionadas ao projeto *(funcionalidade ainda em desenvolvimento)*.

- **Listagem de Atividades**  
  - Visualização das atividades cadastradas *(funcionalidade ainda em desenvolvimento)*.

## ROTEIRO
## [VIDEO AUXILIAR DE INSTALAÇÃO](https://youtu.be/PyvDRSf8d2o)
## [VÍDEO FINAL DE INSTALAÇÃO DAS FERRAMENTAS E EXECUÇÃO DO SISTEMA](https://youtu.be/H4l7jEifH10)
## Banco de Dados

### Passo 1: Download do PostgreSQL
1. Acesse o site oficial do PostgreSQL.
2. Selecione o sistema operacional e baixe o instalador recomendado.

### Passo 2: Instalação do PostgreSQL
1. Execute o instalador e siga as instruções, como escolher o local de instalação e definir uma senha para o usuário padrão `postgres`.
2. Certifique-se de instalar o `pgAdmin` junto com o PostgreSQL.
3. Finalize o processo de instalação.

### Passo 3: Criação do Banco de Dados `mdc`
- **Usando pgAdmin**: Abra o pgAdmin, crie um novo banco de dados e nomeie-o como `mdc`. 
- **Usando Terminal**: Acesse o PostgreSQL e crie o banco de dados `mdc` por meio de comandos.

## Passo 4: Criação das Tabelas

Com o banco de dados `mdc` criado, o próximo passo é criar as tabelas necessárias para armazenar os dados do projeto. Abaixo estão as instruções para criar as tabelas **Usuários** e **Atividades**.

1. **Tabela de Usuários**  
   A tabela **Usuários** conterá dados sobre os usuários, como nome, função, setor, datas de entrada e saída, permissões, email e senha.
```
CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario BIGSERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Funcao VARCHAR(50),
    Setor VARCHAR(50),
    Data_Entrada DATE NOT NULL,
    Data_Saida DATE,
    Permissao VARCHAR(100)  NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(100) NOT NULL);
````
2. **Tabela de Atividades**  
   A tabela **Atividades** armazenará informações sobre as atividades realizadas, como nome, descrição, horas, data e o usuário responsável. Também contém uma chave estrangeira que referencia a tabela de **Usuários**.

 ```
CREATE TABLE IF NOT EXISTS Atividades (
    ID_Atividade BIGSERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Horas VARCHAR(50) NOT NULL,
    Data DATE NOT NULL,
    ID_Usuario BIGINT NOT NULL,
    Grupo VARCHAR(50) NOT NULL,
    CONSTRAINT FK_Atividades_Usuarios FOREIGN KEY (ID_Usuario) REFERENCES usuarios(ID_Usuario) ON DELETE CASCADE
);
 ```


Após executar esses comandos, as tabelas estarão prontas para armazenar os dados necessários para o gerenciamento de atividades e usuários no sistema.

### Passo 5: Criar o Usuário Administrador no Banco de Dados

Para garantir o acesso completo ao sistema, é necessário criar um usuário administrador. Para isso, siga os seguintes passos:

1. **Acessar o Banco de Dados:**
   Abra o terminal ou o cliente de banco de dados (como o pgAdmin ou psql) e conecte-se ao banco de dados `mdc`.

2. **Executar o Comando INSERT:**
   Execute o seguinte comando SQL para inserir um usuário com permissões administrativas na tabela `Usuarios`:

   ```sql
   INSERT INTO Usuarios (Nome, Funcao, Setor, Data_Entrada, Permissao, Email, Senha)
   VALUES ('Administrador', 'Admin', 'TI', '2024-12-07', 'ADMIN', 'admin@admin.com', '$2a$12$XGAUObOAViLIJ1cD2FUTJedKYMlJ7H7AFimfuKFlzXu7BYyJ9eaP6');
   ```
Com isso, o banco de dados `mdc` estará pronto para ser utilizado.
EMAIL: admin@admin.com
senha: 123456

## BACK-END
## Configuração de Acesso ao Banco de Dados

Para conectar o seu projeto ao banco de dados PostgreSQL, é necessário configurar o arquivo `application.properties` presente no diretório `Back-End/src/main/resources/`. Siga as instruções abaixo para inserir o **username** e a **senha** corretos do banco de dados.

### Passo 1: Localize o arquivo de configuração
1. Navegue até o diretório `Back-End/src/main/resources/`.
2. Abra o arquivo `application.properties` em um editor de texto.

### Passo 2: Atualize as configurações de banco de dados
Dentro do arquivo `application.properties`, localize a seguinte seção:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mdc
spring.datasource.username=postgres
spring.datasource.password=1234
spring.datasource.driver-class-name=org.postgresql.Driver
```
- spring.datasource.url: Aqui, você já tem o URL do banco de dados configurado, que é o endereço onde o PostgreSQL está rodando. Certifique-se de que o localhost e a porta 5432 estão corretos para o seu ambiente.
- spring.datasource.username: Altere o valor postgres para o nome de usuário do banco de dados, caso tenha modificado.
- spring.datasource.password: Atualize a senha para a senha correta de acesso ao banco de dados.
3. Salve e feche o arquivo

### Passo 2: Instalar o Java 17

Para rodar aplicações Java, você precisa instalar o JDK 17. Siga os passos abaixo:

1. **Baixar o JDK 17:**
   - Acesse o JDK 17 diretamente do [site da Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
   - Selecione a versão adequada para o seu sistema operacional (Windows, macOS ou Linux).

2. **Instalar o JDK 17:**
   - Após o download, execute o instalador e siga as instruções de instalação.
   - No caso do macOS e Linux, também pode ser necessário configurar as variáveis de ambiente para o Java.

3. **Verificar a instalação:**
   Após a instalação, abra o terminal e execute o comando:

   ```bash
   java -version
   ```
   O comando deve retornar algo como:
   ```
   openjdk version "17.0.x" 2021-09-14
   OpenJDK Runtime Environment (build 17.0.x+xx)
   OpenJDK 64-Bit Server VM (build 17.0.x+xx, mixed mode)
   ```
### Passo 3: Instalar o Visual Studio Code
1. Baixar o Visual Studio Code (VSCode):

- Acesse o site oficial do VSCode.
-Clique em "Download" e selecione a versão apropriada para seu sistema operacional.
2. Instalar o VSCode:

3. Execute o instalador e siga as instruções.
- Instalar as extensões para Java no VSCode:

- Abra o VSCode.
- Vá até a aba Extensions (Ctrl+Shift+X).
- Pesquise por Java Extension Pack e clique em Install. Este pacote inclui:
- Language Support for Java™ by Red Hat: Suporte básico para Java.
- Debugger for Java: Extensão para depuração.
- Java Test Runner: Para executar testes unitários.
- Maven for Java: Suporte ao Maven (caso precise).
- Java Dependency Viewer: Visualiza as dependências de seu projeto Java.
### Passo 4: Configurar o Java 17 no VSCode
1. Se o VSCode não detectar automaticamente o JDK 17, abra a paleta de comandos (Ctrl+Shift+P).
2. Digite Java: Configure Java Runtime e siga as instruções para configurar o caminho do JDK 17 no seu sistema.

### Passo 5: Executar o Arquivo Java pelo VSCode
Para executar o arquivo `ControleDeVoluntariosApplication.java` no VSCode, siga os seguintes passos:

1. **Abrir o arquivo no VSCode:**
   - Navegue até o diretório do seu projeto no VSCode.
   - Vá até `back-end/src/main/java/com/mds/demo/ControleDeVoluntariosApplication.java` e abra o arquivo.

2. **Executar o arquivo:**
   - No canto superior direito do VSCode, você verá um ícone de **Run** (um triângulo verde).
   - Clique neste ícone para executar o arquivo diretamente.

O VSCode irá compilar e rodar o arquivo Java, iniciando a aplicação. Se tudo estiver configurado corretamente, você verá a saída no terminal integrado do VSCode.

Agora o backend está sendo executado e estamo prontos para iniciar o front-end e por fim, termos acesso à nossa aplicação por inteiro.

## FRONT-END
## Configuração do Front-End

### Passo 1: Instalar o Node.js
Para começar a desenvolver o front-end, você precisará instalar o Node.js, que é necessário para rodar o npm (Node Package Manager).

1. Acesse o [site oficial do Node.js](https://nodejs.org/).
2. Baixe a versão LTS (Long Term Support) recomendada para estabilidade.
3. Siga as instruções para instalar o Node.js no seu sistema operacional.

### Passo 2: Verificar a Instalação do Node.js
Após a instalação, abra o terminal e execute os seguintes comandos para verificar se o Node.js e o npm foram instalados corretamente:

```bash
node -v
npm -v
```
Isso deve retornar as versões do Node.js e npm instaladas.

### Passo 3: Instalar Dependências do Projeto
Navegue até o diretório do seu projeto front-end. No seu terminal, execute:
```
cd caminho/para/seu/projeto/Certificadora3/front_end
```

```
npm install
```
### Passo 4: Iniciar o Servidor de Desenvolvimento
Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento:
```
npm start
```

### Passo 5: Servidor Pronto no localhost:3000
Depois de executar npm start, o servidor de desenvolvimento estará rodando localmente e você poderá acessar o aplicativo no seu navegador em:
```
http://localhost:3000
```

