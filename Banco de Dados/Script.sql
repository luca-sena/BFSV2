create database bfs;
use bfs;

create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    cpf char(11),
    email varchar(45),
    telefone varchar(11),
    genero varchar(45),
    senha varchar(12),
    tipo varchar(3),
    dtUsuario timestamp
) auto_increment = 10000;

create table endereco(
	idEndereco int primary key auto_increment,
	siglaEst varchar(2),
    cidade varchar(45),
    bairro varchar(45),
    rua varchar(45),
    numero int,
    cep varchar(8),
    fkEndUsuario int,
    foreign key (fkEndUsuario) references usuario(idUsuario)
    ) auto_increment = 2000;


    
create table formacao(
	idFormacao int primary key auto_increment,
    escolaridade varchar(45), -- 'Ensino Médio Incompleto(Treineiro)', 'Ensino Médio Incompleto(Finalizando)', 'Ensino Médio Completo', 'Ensino Superior Incompleto', 'Ensino Superior Completo'
	nomeFacEsc varchar(45),
    cursoInte varchar(45),
    comoConhe varchar(45),
    fkFormUsuario int,
    foreign key (fkFormUsuario) references usuario(idUsuario)
    )auto_increment = 30000;
    
create table curso(
	idCurso int primary key auto_increment,
    nomeCurso varchar(45),
    duracao int)
;

create table cadastro (
	idCad int auto_increment,
    fkCadUsuario int,
		foreign key (fkCadUsuario) references usuario(idUsuario),
    fkCadCurso int,
		foreign key (fkCadCurso) references curso(idCurso),
    dtProva datetime,
    regime varchar(45),
    periodo varchar(45),
		primary key (idCad, fkCadUsuario, fkCadCurso)
) auto_increment = 4000;

-- drop database bfs;

select * from usuario;
select * from endereco;
select * from formacao;

	