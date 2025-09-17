const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Block structure
class Block {
  constructor(index, timestamp, donation, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.donation = donation;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0; // A random number for mining
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.donation) +
          this.previousHash +
          this.nonce // Include nonce in hash
      )
      .digest("hex");
  }

  // New Mining function!
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}

// Blockchain structure
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2; // Make it so hashes must start with 2 zeros
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), { donor: "Genesis", amount: 0, purpose: "Start" }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty); // Mine the new block before adding!
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];
      // Recalculate hash with correct nonce to validate
      const tempNonce = current.nonce;
      current.nonce = 0; // Temporarily reset nonce to recalculate from start (for validation)
      const recalculatedHash = current.calculateHash();
      // Find the hash again by mining to be sure
      let validationNonce = 0;
      let hashToValidate = '';
      while (hashToValidate.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
          validationNonce++;
          hashToValidate = crypto.createHash("sha256").update(current.index + current.timestamp + JSON.stringify(current.donation) + current.previousHash + validationNonce).digest("hex");
      }
      current.nonce = tempNonce; // Restore original nonce

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== prev.hash) return false;
    }
    return true;
  }
}
// Initialize donation blockchain
const donationChain = new Blockchain();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Blockchain Donation Tracker!");
});

// View all donations (the blockchain)
app.get("/donations", (req, res) => {
  res.json(donationChain.chain);
});

// Add a donation (POST)
app.post("/donate", (req, res) => {
  const { donor, amount, purpose } = req.body;
  if (!donor || amount === undefined || !purpose) {
    return res.status(400).send("Please provide donor, amount, and purpose.");
  }
  const newBlock = new Block(
    donationChain.chain.length,
    Date.now(),
    { donor, amount, purpose }
  );
  donationChain.addBlock(newBlock);
  res.send({ message: "Donation added successfully!", block: newBlock });
});

// Optional: validate chain status
app.get("/validate", (req, res) => {
  res.json({ valid: donationChain.isValid() });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
