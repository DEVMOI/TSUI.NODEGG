const Wallet = require("../wallet");
const Transaction = require("../wallet/transaction");
class Miner {
    constructor( blockchain, transactionPool, wallet, p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        const validTransactions = this.transactionPool.validTransactions();
        // include miner reward
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        // create block of valid transactions
        const block = this.blockchain.addBlock(validTransactions);
        // sync p2pserver chains
        this.p2pServer.syncChains();
        // clear local transaction pool
        this.transactionPool.clear();
        // broadcast to ever miner to clear tranaction pool
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}
module.exports = Miner;