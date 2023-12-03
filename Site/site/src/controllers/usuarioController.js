var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;



    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (tipo == undefined) {
        res.status(400).send("Seu tipo está indefinido!");
    } else {

        usuarioModel.autenticar(email, senha, tipo)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json(resultadoAutenticar[0]
                            // idUsuario: resultadoAutenticar[0].idUsuario,
                            // siglaEst: resultadoAutenticar[0].siglaEst,
                            // cidade: resultadoAutenticar[0].cidade,
                            // bairro: resultadoAutenticar[0].bairro,
                            // rua: resultadoAutenticar[0].rua,
                            // numero: resultadoAutenticar[0].numero,
                            // cep: resultadoAutenticar[0].cep,
                            // fkEndUsuario: resultadoAutenticar[0].fkEndUsuario,
                            // nome: resultadoAutenticar[0].nome,
                            // cpf: resultadoAutenticar[0].cpf,
                            // email: resultadoAutenticar[0].email,
                            // telefone: resultadoAutenticar[0].telefone,
                            // genero: resultadoAutenticar[0].genero,
                            // senha: resultadoAutenticar[0].senha,
                            // tipo: resultadoAutenticar[0].tipo,
                            // dtUsuario: resultadoAutenticar[0].dtUsuario,
                            // idCad: resultadoAutenticar[0].idCad,
                            // fkCadUsuario: resultadoAutenticar[0].fkCadUsuario,
                            // fkCadCurso: resultadoAutenticar[0].fkCadCurso,
                            // regime: resultadoAutenticar[0].regime,
                            // periodo: resultadoAutenticar[0].periodo,
                            // dtProva: resultadoAutenticar[0].dtProva,
                            // resultado: resultadoAutenticar[0].resultado,
                            // idCurso: resultadoAutenticar[0].idCurso,
                            // nomeCurso: resultadoAutenticar[0].nomeCurso,
                            // duracao: resultadoAutenticar[0].duracao,

                            // qntdDeCadastros: resultadoAutenticar[0].qntdDeCadastros,

                            // qntdGeneroMasculino: resultadoAutenticar[0].qntdGeneroMasculino,
                            // qntdGeneroFeminino: resultadoAutenticar[0].qntdGeneroFeminino,
                            // qntdGeneroOutros: resultadoAutenticar[0].qntdGeneroOutros,
                            // dtNasc: resultadoAutenticar[0].dtNasc,

                            // qntdMenor18: resultadoAutenticar[0].qntdMenor18,
                            // qntdEntre18e25: resultadoAutenticar[0].qntdEntre18e25,
                            // qntdEntre26e35: resultadoAutenticar[0].qntdEntre26e35,
                            // qntdEntre36e59: resultadoAutenticar[0].qntdEntre36e59,
                            // qntdMaior60: resultadoAutenticar[0].qntdMaior60,

                            // qntEscEMIT: resultadoAutenticar[0].qntEscEMIT,
                            // qntEscEMIF: resultadoAutenticar[0].qntEscEMIF,
                            // qntEscEMC: resultadoAutenticar[0].qntEscEMC,
                            // qntEscESI: resultadoAutenticar[0].qntEscESI,
                            // qntEscESC: resultadoAutenticar[0].qntEscESC,
                            
                            // qntConheAmigos: resultadoAutenticar[0].qntConheAmigos,
                            // qntConheParentes: resultadoAutenticar[0].qntConheParentes,
                            // qntConheMidiasSociais: resultadoAutenticar[0].qntConheMidiasSociais,
                            // qntConheExAlunos: resultadoAutenticar[0].qntConheExAlunos,
                            // qntConheOutro: resultadoAutenticar[0].qntConheOutro,



                        );


                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var genero = req.body.generoServer;
    var senha = req.body.senhaServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;
    var escolaridade = req.body.escolaridadeServer;
    var nomeEscola = req.body.nomeEscolaServer;
    var curso = req.body.cursoServer;
    var regime = req.body.regimeServer;
    var periodo = req.body.periodoServer;
    var data = req.body.dataServer;
    var comoConheceu = req.body.comoConheceuServer;

    var qntdDeCadastros = req.body.qntdDeCadastrosuServer;

    var qntdGeneroMasculino = req.body.qntdGeneroMasculinouServer;
    var qntdGeneroFeminino = req.body.qntdGeneroFemininouServer;
    var qntdGeneroOutros = req.body.qntdGeneroOutrosuServer;
    var dtNasc = req.body.dtNascServer;

    var qntdMenor18 = req.body.qntdMenor18Server
    var qntdEntre18e25 = req.body.qntdEntre18e25Server
    var qntdEntre26e35 = req.body.qntdEntre26e35Server
    var qntdEntre36e59 = req.body.qntdEntre36e59Server
    var qntdMaior60 = req.body.qntdMaior60Server

    var qntEscEMIT = req.body.qntEscEMITServer
    var qntEscEMIF = req.body.qntEscEMIFServer
    var qntEscEMC = req.body.qntEscEMCServer
    var qntEscESI = req.body.qntEscESIServer
    var qntEscESC = req.body.qntEscESCServer
    
    var qntConheAmigos = req.body.qntConheAmigosServer
    var qntConheParentes = req.body.ParentesServer
    var qntConheMidiasSociais = req.body.qntConheMidiasSociaisServer
    var qntConheExAlunos = req.body.qntConheExAlunosServer
    var qntConheOutro = req.body.qntConheOutroServer
    



    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf === undefined) {
        res.status(400).send("O CPF está undefined!");
    } else if (email === undefined) {
        res.status(400).send("O email está undefined!");
    } else if (telefone === undefined) {
        res.status(400).send("O telefone está undefined!");
    } else if (genero === undefined) {
        res.status(400).send("O gênero está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("A senha está undefined!");
    } else if (estado === undefined) {
        res.status(400).send("O estado está undefined!");
    } else if (cidade === undefined) {
        res.status(400).send("A cidade está undefined!");
    } else if (bairro === undefined) {
        res.status(400).send("O bairro está undefined!");
    } else if (rua === undefined) {
        res.status(400).send("A rua está undefined!");
    } else if (numero === undefined) {
        res.status(400).send("O número está undefined!");
    } else if (cep === undefined) {
        res.status(400).send("O CEP está undefined!");
    } else if (escolaridade === undefined) {
        res.status(400).send("A escolaridade está undefined!");
    } else if (nomeEscola === undefined) {
        res.status(400).send("O nome da escola/faculdade está undefined!");
    } else if (curso === undefined) {
        res.status(400).send("O curso está undefined!");
    } else if (regime === undefined) {
        res.status(400).send("O regime está undefined!");
    } else if (periodo === undefined) {
        res.status(400).send("O periodo está undefined!");
    } else if (data === undefined) {
        res.status(400).send("O data está undefined!");
    } else if (comoConheceu == undefined) {
        res.status(400).send("O como nos conheceu está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, dtNasc, cpf, email, telefone, genero,
             senha, estado, cidade, bairro, rua, numero, cep, escolaridade, nomeEscola, 
             curso, regime, periodo, data, comoConheceu, qntdDeCadastros, qntdGeneroMasculino,
              qntdGeneroFeminino, qntdGeneroOutros, qntdMenor18, qntdEntre18e25, qntdEntre26e35, 
              qntdEntre36e59, qntdMaior60, qntEscEMIT, qntEscEMIF, qntEscEMC, qntEscESI, qntEscESC,
              qntConheAmigos, qntConheParentes, qntConheMidiasSociais, qntConheExAlunos, qntConheOutro
              )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}