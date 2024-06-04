const PORT = 3030;
const express =  require('express');
const app = express();
const path = require('path');

const credencial = require('./credencial.js');

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/montaLanche', (req, res)=>{
  res.render('montaLanche');
})

app.get('/combos', (req, res)=>{
  res.render('combos');
})

app.get('/:total_a_pagar', (req, res)=>{
  res.render('total_a_pagar');
})

app.post('/', express.urlencoded({extended:true}), (req, res)=>{
  const selectedItems = JSON.parse(req.body.selectedItems);
  run(selectedItems).catch(console.dir);
})


const { MongoClient } = require("mongodb");

//conexão
let uri =`mongodb+srv://${credencial.username}:${credencial.password}@cluster0.mzlrytu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
 
// Replace the following with your Atlas connection string
const client = new MongoClient(uri);
                 
//criar uma thend onde cira o json e dpois chama a imprtação
async function run(json) {
  console.log("--------No app.js--------")
  console.log(json);

    try {
        // Connect to the Atlas cluster
        await client.connect();

         //nome do banco
         const db = client.db("TotemLanches");
         //nome da coleção
         const col = db.collection("Pedidos");

         // Insert o pedido na coleção       
         const p = await col.insertMany(json);
        } catch (err) {
        //mensagem de erro
         console.log(err.stack);
     }
 
     finally {
        //finaliza fechando o banco
        await client.close();
    }
}


//Setando a engine EJS
app.set('view engine', 'ejs');
// Configuração dos arquivos estáticos da pasta templates
app.use('/', express.static(__dirname));
app.set('views', path.join(__dirname, 'templete'));
// Configuração dos arquivos estáticos da pasta public
app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>{
    console.log("Escutando na porta", PORT);
})

//npms nessarios
//ejs
//  expres
//  jsdom
//  mongodb
