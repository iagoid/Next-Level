//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dados para nossas operações


db.serialize(() => {
    //Com comandos SQL vou:
    
    //1) criar uma tabela
    db.run(`
         CREATE TABLE IF NOT EXISTS places (
             id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
             name TEXT NOT NULL,
             image TEXT NOT NULL,
             address TEXT NOT NULL,
             address2 TEXT NOT NULL,
             state TEXT NOT NULL,
             city TEXT NOT NULL,
             items TEXT NOT NULL
         );
    `)

    //2)Inserir dados na tabela
    //Esqueleto de inserção no SQL
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "PaperSider",
        "Guilherme Jambala, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    //cria uma função que ao demorar à responde o programa continua a execução, e imprimi uma mensagem ao dar um erro
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    //passa os values à query fazendo a verificação 
    //rodar no terminal node src/database/db.js
    db.run(query, values, afterInsertData)
    
    //3)Consultar dados da tabela

     db.all(` SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)

    })


    //4)Deletar dados da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [29], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    }) 
})


