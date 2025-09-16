# Blockchain Donation Tracking System

A simple backend application built with Node.js and Express to demonstrate the fundamental concepts of blockchain technology. Each donation is stored as a block, cryptographically linked to the previous one, creating a secure and immutable ledger of records.

---

## Features

-   **Immutable Ledger:** Stores donations in a chain of blocks, ensuring that past records cannot be altered.
-   **Proof-of-Work Mining:** Implements a difficulty setting to simulate the "mining" required to add new blocks, a core concept of cryptocurrencies like Bitcoin.
-   **Cryptographic Security:** Each block is secured with a SHA-256 hash. The entire chain's integrity can be verified at any time.
-   **RESTful API:** Provides simple API endpoints to view donations, add new ones, and validate the blockchain.

---

## Tech Stack

-   **Node.js:** JavaScript runtime environment for the server.
-   **Express.js:** Web application framework for building the API.
-   **Crypto (built-in Node.js module):** Used for generating the SHA-256 hashes for the blocks.

---

## API Endpoints

The server runs on `http://localhost:3000`.

-   `GET /donations`
    -   **Description:** Fetches and displays the entire donation blockchain.
    -   **Response:** An array of Block objects in JSON format.

-   `POST /donate`
    -   **Description:** Adds a new donation to the blockchain after successfully "mining" it.
    -   **Request Body (JSON):**
        ```json
        {
          "donor": "Alice",
          "amount": 100,
          "purpose": "School supplies"
        }
        ```
    -   **Response:** A success message and the newly created block.

-   `GET /validate`
    -   **Description:** Checks the integrity of the blockchain to ensure it has not been tampered with.
    -   **Response:** `{"valid": true}` or `{"valid": false}`.

---

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rizma/blockchain-project.git](https://github.com/rizma/blockchain-project.git) 
    cd blockchain-project
    ```
    *(Note: Replace with your actual GitHub repository link)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running at `http://localhost:3000`.

---

## Example Usage

You can use a tool like Postman or a terminal command like `Invoke-RestMethod` (PowerShell) to interact with the API.

**1. Add a donation (this will take a moment to "mine"):**
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/donate -ContentType 'application/json' -Body '{"donor":"Bob","amount":50,"purpose":"Charity"}'