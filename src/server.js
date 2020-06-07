const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta public (faz puxar o css)
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//Utilizando Template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true, //informações alteradas não são armazenadas no cache(ex. excluir parte html)
})

//configurar caminhos da aplicação
//página inicial
//req: requisição --- res: resposta
server.get("/", (req, res) => {
    //retorna o arquivo que está a página inicia e o que vai na variavel title , {title: "Um título"}
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    //pega os query Strings da URL
    //console.log(req.query)

    return res.render("create-point.html")
})

//Mudar no formulário o action e o method
server.post("/savepoint", (req, res) => {
    //req.body: corpo do formulário
    //console.log(req.body)

    //inserir dados no banco
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    //Valores wue devem ser inserido
    values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    //cria uma função que ao demorar à responde o programa continua a execução, e imprimi uma mensagem ao dar um erro
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.render("create-point.html", {saved: false})
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    //passa os values à query fazendo a verificação 
    //rodar no terminal node src/database/db.js
    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
    const search = req.query.search

    //pesquisa vazia
    if(search == ""){
        return res.render("search-results.html", { total: 0})        
    }

    //pegar os dados do banco de dados
    db.all(` SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length

        //mostrar a página HTML com os dados do banco
        return res.render("search-results.html", { places: rows, total})
    })

})


//ligar o servidor
server.listen(3000)