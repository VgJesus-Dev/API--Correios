const express = require('express'); // Importa o framework Express para criar o servidor web
const app = express(); // Cria uma instância do aplicativo Express
const mysql = require('mysql'); // Importa o módulo para interagir com o banco de dados MySQL
const bodyParser = require('body-parser'); // Importa o módulo body-parser para analisar o corpo das requisições
const conexao = require ('./banco');

//configuração do express
app.use(express.static('public')); // Define a pasta 'public' como a pasta de arquivos estáticos (CSS, JavaScript, imagens)
app.set('view engine', 'ejs'); // Define o EJS como o mecanismo de visualização (template engine)
app.set('views', __dirname + '/views'); // Define a pasta 'views' como a pasta onde as views (arquivos EJS) estão localizadas

// Configuração do body-parser para analisar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true })); // Analisa requisições com codificação URL
app.use(bodyParser.json()); // Analisa requisições com formato JSON


// Rota para segunda página (lista)

app.get('/', (req, res) => {
    res.render('index');  
});

app.get('/listadeclientes', (req, res) => {
    // Consulta todos os produtos do banco de dados
    var sql = 'SELECT * FROM cliente';
    conexao.query(sql, function (err, results) {
        if (err) {
            console.error(err); // Loga o erro no console
            res.status(500).send('Erro ao conectar no Banco de dados'); // Envia uma resposta de erro 500 para o cliente
            return; // Encerra a execução da função para evitar que o código continue
        }
        
        res.render('listadeclientes', { cliente: results });
    });
});


//POST

app.post('/', function (req, res) {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var whatsapp = req.body.whatsapp;
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    

    var sql = 'INSERT INTO cliente (nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; //ERRO 2 (FALTOU FECHAR PARENTESES NO FINAL DO ESTADO)
    conexao.query(sql, [nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao salvar no Banco de Dados' +  nome);
            return;
        }
    
        res.redirect('listadeclientes'); 
    });
});

 
app.get('/listadeclientes', function(req, res){
   
        var sql = 'SELECT * FROM cliente';
 
        conexao.query(sql, function(error, result){
            if(error) console.log(error);
            res.render("listadeclientes", {cliente: result});
        });
    });


app.get('/delete-cliente', function(req, res){
    

        var sql = "delete from cliente where codcliente=?";
 
        var id = req.query.codcliente;
 
        conexao.query(sql, [id], function(error, result){
            if(error) console.log(error);
            res.redirect('/listadeclientes');
        });
    });

app.get('/update-cliente', function(req, res){
    
    var sql = "select * from cliente where codcliente=?";

    var id = req.query.codcliente;

    conexao.query(sql, [id], function(error, result){
       if(error) console.log(error);
       
       if(result && result.length > 0) {
        res.render("alteracliente", { cliente: result[0]});
       }else{
        res.status(404).send('usuario nao encontrado');
       }
    });
});

app.post('/update-cliente', function(req, res){
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var whatsapp = req.body.whatsapp;
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var codcliente = req.body.codcliente;
  
    
    var sql = "UPDATE cliente set nome=?, sobrenome=?, email=? ,  whatsapp=?, cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, estado=? WHERE codcliente=?";
    
    
    
    conexao.query(sql, [nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado, codcliente], function(error, result){
        if(error) console.log(erro);
        res.redirect("listadeclientes");
    });
    });

app.listen(3007, () => {
    console.log('Servidor iniciado na porta 3000');
});