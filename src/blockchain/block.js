const ChainUtil = require("../util/chain-util");
const {
    DIFFICULTY,
    MINE_RATE
} = require("../config");
class Block {
    constructor(timestamp, lHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lHash = lHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }
    toString() {
        return `Block-
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lHash.substring(0, 10)}
        Hash      : ${this.hash.substring(0, 10)}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data}`;
    }
    static genesis() {
        return new this('10-14-2017', 'W3-Mi55-Y0u', '`1n-M3m0ry-0f-P3G6Y-L@cY', [], 0, DIFFICULTY)
    }
    static mineBlock(lBlock, data) {
        let hash, timestamp;
        const lHash = lBlock.hash;
        let {
            difficulty
        } = lBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lBlock, timestamp);
            hash = Block.hash(timestamp, lHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lHash, hash, data, nonce, difficulty);
    }
    static hash(timestamp, lHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lHash}${data}${nonce}${difficulty}`).toString();
    }
    static blockHash(block) {
        const {
            timestamp,
            lHash,
            data,
            nonce,
            difficulty
        } = block;
        return Block.hash(timestamp, lHash, data, nonce, difficulty);
    }
    static adjustDifficulty(lBlock, currentTime) {
        let {
            difficulty
        } = lBlock;
        difficulty = lBlock.timestamp + MINE_RATE > currentTime ?
         difficulty + 1. +  Math.floor(Math.random() * 1) : difficulty - 1. +  Math.floor(Math.random() * 1);
        return difficulty;
    }
}

module.exports = Block;