var database = require("../database/config")

function autenticar(email, senha, tipo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `SELECT

                    endereco.*,
                    usuario.*,
                    cadastro.*,
                    curso.*,
                    formacao.*,
                    (SELECT COUNT(*) FROM usuario) as qntdDeCadastros,
                    (SELECT COUNT(*) FROM usuario u WHERE u.genero = 'Masculino') as qntdGeneroMasculino,
                    (SELECT COUNT(*) FROM usuario u WHERE u.genero = 'Feminino') as qntdGeneroFeminino,
                    (SELECT COUNT(*) FROM usuario u WHERE u.genero = 'Outro') as qntdGeneroOutros,
                    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) < 18) as qntdMenor18,
                    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) >= 18 AND YEAR(CURDATE()) - YEAR(dtNasc) <= 25) as qntdEntre18e25,
                    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) >= 26 AND YEAR(CURDATE()) - YEAR(dtNasc) <= 35) as qntdEntre26e35,
                    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) >= 36 AND YEAR(CURDATE()) - YEAR(dtNasc) <= 59) as qntdEntre36e59,
                    (SELECT COUNT(*) FROM usuario WHERE YEAR(CURDATE()) - YEAR(dtNasc) > 60) as qntdMaior60
                   
                    from endereco join usuario
                        on fkEndUsuario = idUsuario
                            join cadastro on fkCadUsuario = idUsuario
                            join curso on fkCadCurso = idCurso
                            join formacao on fkFormUsuario = idUsuario WHERE email = '${email}' AND senha = '${senha}' AND tipo = '${tipo}';        
    `;
    // var instrucao2 = `SELECT  genero, COUNT(*) as qntdGenero, (SELECT COUNT(DISTINCT genero) FROM usuario) as totalGeneros FROM usuario GROUP BY genero;`
    var instrucao2 = ``
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, dtNasc, cpf, email, telefone, genero, senha, estado, cidade, bairro, rua, numero, cep, escolaridade, nomeEscola, curso, regime, periodo, data, comoConheceu) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoCadastroUsuario = `
        INSERT INTO usuario VALUES (null, '${nome}', ${dtNasc}, '${cpf}', '${email}' ,'${telefone}', '${genero}', '${senha}', 'ALU', CURRENT_TIMESTAMP); 
    `;
   
    console.log("Executando a instrução SQL: \n" + instrucaoCadastroUsuario );
        return database.executar(instrucaoCadastroUsuario).then((result) => {
            var instrucaoCadastroEndereco = `
                INSERT INTO endereco VALUES (null, '${estado}', '${cidade}', '${bairro}' ,'${rua}', '${numero}', '${cep}', (select idUsuario from usuario where cpf = '${cpf}'));
            `;

            console.log("Executando a instrução SQL para cadastrar endereço: \n" + instrucaoCadastroEndereco);
            return database.executar(instrucaoCadastroEndereco).then((result) => {
            
                var instrucaoCadastroEscolaridade = `
                    INSERT INTO formacao VALUES (null, '${escolaridade}', '${nomeEscola}', '${curso}', '${comoConheceu}', (select idUsuario from usuario where cpf = '${cpf}'))
                `;

                console.log("Executando a instrução SQL para cadastrar endereço: \n" + instrucaoCadastroEscolaridade);
                return database.executar(instrucaoCadastroEscolaridade).then((result) => {
            
                    var instrucaoCadastroCadastro = `
                    insert into cadastro values (null, (select idUsuario from usuario where cpf = '${cpf}'), '${curso}', '${regime}','${periodo}', '${data}', null);
                    `;
    
                    console.log("Executando a instrução SQL para cadastrar endereço: \n" + instrucaoCadastroCadastro);
                    return database.executar(instrucaoCadastroCadastro)
                })
            });
        });
}

module.exports = {
    autenticar,
    cadastrar
};