const express = require("express");
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const P2pServer = require("./p2p-server");
const Wallet = require('../wallet');
const TransactionPool = require("../wallet/transaction-pool");
const Miner = require("./miner");
// proccess.env.HTTP_PORT ( ALLOWs USER TO SPECIFY PORT )
const HTTP_PORT = process.env.HTTP_PORT || 3001;
//  || 3000 + Math.floor(Math.random() * 101);

const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(bodyParser.json());

console.log(`... Now Making Coffee...`)

// Shows Current chain
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

//gets Transactions
app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
});

// Sets Data to be mined
app.post('/post', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New Block Added: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect("/blocks");
});

//posts transacts
app.post('/transact',(req, res)=>{
    const {recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, bc, tp);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});

// Gets Public Key
app.get("/public-key", (req, res) =>{
    res.json({publickey: wallet.publicKey});
});

//Mines new data
app.get("/mine", (req, res)=> {
    const block = miner.mine();
    console.log(`New bylock added: ${block.toString()}`);
    res.redirect("/blocks");
})

//starts server
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});

p2pServer.listen();
