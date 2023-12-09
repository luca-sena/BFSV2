create database bfs;
use bfs;

create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    dtNasc date,
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
    )auto_increment = 3000;
    
create table curso(
	idCurso int primary key auto_increment,
    nomeCurso varchar(45),
    duracao int
    );

create table cadastro (
	idCad int auto_increment,
    fkCadUsuario int,
		foreign key (fkCadUsuario) references usuario(idUsuario),
    fkCadCurso int,
		foreign key (fkCadCurso) references curso(idCurso),
    regime varchar(45),
	periodo varchar(45),
	dtProva datetime,
	resultado varchar(15),
		primary key (idCad, fkCadUsuario, fkCadCurso)
) auto_increment = 4000;


insert into curso values
	(null, 'Design de Moda', 8),
	(null, 'Gestão de Moda', 8),
	(null, 'Estilismo de Moda', 4),
	(null, 'Marketing de Moda', 8),
	(null, 'Produção de Moda', 6),
	(null, 'Tecnologia Têxtil', 6),
	(null, 'Modelagem e Criação de Moda', 4);
    
insert into usuario values
	(null ,'Administrador', '2000-11-19' , '00011100011', 'adm@adm', '11955555555', 'Outro', 'adm123', 'ADM', CURRENT_TIMESTAMP);

insert into endereco values
	(null, 'SP', 'Guarulhos', 'Ponte Alta', 'Mario Luiz Macca', '810', '07179130', 10000);
    
insert into formacao values
	(null, 'ESC', 'Eniac', '1', 'MídiasSociais', 10000);
    
insert into cadastro values 
	(null, 10000, 1, 'Hibrido', 'Noturno', '2024-02-12 12:30:00', null);
    

select * from usuario;
select * from endereco;
select * from formacao;
select * from curso;
select * from cadastro;


select * from formacao join
	usuario on fkFormUsuario = idUsuario
		where idUsuario = 10000;
        
-- drop database bfs;
-- INSERT INTO usuario VALUES (null, 'Luca Sena', '2000-11-19', '07179130', 'luca@luca' ,'11984199966', 'Masculino', '123', 'ALU', CURRENT_TIMESTAMP);

  
      select * from endereco join usuario
            on fkEndUsuario = idUsuario
                join cadastro on fkCadUsuario = idUsuario
                 join curso on fkCadCurso = idCurso
                   join formacao on fkFormUsuario = idUsuario WHERE email = 'luca@luca' AND senha = '123' AND tipo = 'ALU';
                   
SELECT 
    genero,
    COUNT(*) as qntdGenero,
    (SELECT COUNT(DISTINCT genero) FROM usuario) as totalGeneros
FROM usuario
GROUP BY genero;

SELECT  genero, COUNT(*) as qntdGenero, (SELECT COUNT(DISTINCT genero) FROM usuario) as totalGeneros FROM usuario GROUP BY genero;

select endereco.*,
    usuario.*,
    cadastro.*,
    curso.*,
    formacao.*,
    (SELECT COUNT(*) FROM usuario) as qntdDeCadastros,
    (SELECT COUNT(*) FROM usuario u WHERE u.genero = 'Masculino') as qntdGeneroMasculino,
    (SELECT COUNT(*) FROM usuario u WHERE u.genero = 'Feminino') as qntdGeneroFeminino,
    (SELECT COUNT(*) FROM usuario u WHERE u.genero = 'Outro') as qntdGeneroOutros,
    (SELECT COUNT(*) FROM cadastro where regime = "Presencial") as qntRegimePres,
	(SELECT COUNT(*) FROM cadastro where regime = "EAD") as qntRegimeEAD,
	(SELECT COUNT(*) FROM cadastro where regime = "Híbrido") as qntRegimeHib,
    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) < 18) as qntdMenor18,
    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) >= 18 AND YEAR(CURDATE()) - YEAR(dtNasc) <= 25) as qntdEntre18e25,
    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) >= 26 AND YEAR(CURDATE()) - YEAR(dtNasc) <= 35) as qntdEntre26e35,
    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) >= 36 AND YEAR(CURDATE()) - YEAR(dtNasc) <= 59) as qntdEntre36e59,
    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) > 60) as qntdMaior60,
    (SELECT COUNT(*) FROM formacao f where f.escolaridade = 'EMIT') as qntEscEMIT,
	(SELECT COUNT(*) FROM formacao f where f.escolaridade = 'EMIF') as qntEscEMIF,
	(SELECT COUNT(*) FROM formacao f where f.escolaridade = 'EMC') as qntEscEMC,
	(SELECT COUNT(*) FROM formacao f where f.escolaridade = 'ESI') as qntEscESI,
	(SELECT COUNT(*) FROM formacao f where f.escolaridade = 'ESC') as qntEscESC,
    (SELECT COUNT(*) FROM formacao f where f.comoConhe = 'Amigos') as qntdConheAmigos,
	(SELECT COUNT(*) FROM formacao f where f.comoConhe = 'Parentes') as qntdConheParentes,
	(SELECT COUNT(*) FROM formacao f where f.comoConhe = 'MídiasSociais') as qntdConheMidiasSociais,
	(SELECT COUNT(*) FROM formacao f where f.comoConhe = 'Ex-Alunos') as qntdConheExAlunos,
	(SELECT COUNT(*) FROM formacao f where f.comoConhe = 'Outro') as qntdConheOutro
		from endereco join usuario
            on fkEndUsuario = idUsuario
                join cadastro on fkCadUsuario = idUsuario
                 join curso on fkCadCurso = idCurso
                   join formacao on fkFormUsuario = idUsuario WHERE email = 'adm@adm' AND senha = 'adm123' AND tipo = 'ADM';






