// // Equivalent code in JS 

// // Create a new cli wallet

// // solana-keygen new


// // Set the RPC url
// // solana config set --url https://api.devnet.solana.com


// // Create an empty JS file
// // npm init -y
// // touch index.js

// // Install dependencies
// // npm install @solana/web3.js @solana/spl-token


// // Write a function to airdrop yourself some solana

// const {Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} = require('@solana/web3.js');

// const connection = new Connection(clusterApiUrl('devnet'));

// async function airdrop(publicKey, amount) {
//     const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
//     await connection.confirmTransaction({signature: airdropSignature})
// }

// airdrop("GokppTzVZi2LT1MSTWoEprM4YLDPy7wQ478Rm3r77yEw", LAMPORTS_PER_SOL).then(signature => {
//     console.log('Airdrop signature:', signature);
// });

// // Check your balance
// // solana balance
// // Create token mint

// const { createMint } = require('@solana/spl-token');
// const { Keypair, Connection, clusterApiUrl,  TOKEN_PROGRAM_ID } = require('@solana/web3.js');

// const payer = Keypair.fromSecretKey(Uint8Array.from([102,144,169,42,220,87,99,85,100,128,197,17,41,234,250,84,87,98,161,74,15,249,83,6,120,159,135,22,46,164,204,141,234,217,146,214,61,187,254,97,124,111,61,29,54,110,245,186,11,253,11,127,213,20,73,8,25,201,22,107,4,75,26,120]));

// const mintAthority = payer;

// const connection = new Connection(clusterApiUrl('devnet'));

// async function createMintForToken(payer, mintAuthority) {
//     const mint = await createMint(
//         connection,
//         payer,
//         mintAuthority,
//         null,
//         6,
//         TOKEN_PROGRAM_ID
//     );
//     console.log('Mint created at', mint.toBase58());
//     return mint;
// }

// async function main() {
//     const mint = await createMintForToken(payer, mintAthority.publicKey);
// }

// main();

// // Verify token mint on chain


// // Check the token on solana fm https://solana.fm/address/ChNkv9iW5pZJ1YAsNswC2CrdMUkFJBUbRWinjdLvKpXA/transactions?cluster=devnet-solana
// // Use the getAccountInfo to see the data and lamports in the account

// // Create an associated token account, mint some tokens
// const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require('@solana/spl-token');
// const { Keypair, Connection, clusterApiUrl,  TOKEN_PROGRAM_ID, PublicKey } = require('@solana/web3.js');

// const payer = Keypair.fromSecretKey(Uint8Array.from([102,144,169,42,220,87,99,85,100,128,197,17,41,234,250,84,87,98,161,74,15,249,83,6,120,159,135,22,46,164,204,141,234,217,146,214,61,187,254,97,124,111,61,29,54,110,245,186,11,253,11,127,213,20,73,8,25,201,22,107,4,75,26,120]));

// const mintAthority = payer;

// const connection = new Connection(clusterApiUrl('devnet'));

// async function createMintForToken(payer, mintAuthority) {
//     const mint = await createMint(
//         connection,
//         payer,
//         mintAuthority,
//         null,
//         6,
//         TOKEN_PROGRAM_ID
//     );
//     console.log('Mint created at', mint.toBase58());
//     return mint;
// }

// async function mintNewTokens(mint, to, amount) { 
//     const tokenAccount = await getOrCreateAssociatedTokenAccount(
//         connection,
//         payer,
//         mint,
//         new PublicKey(to)
//       );

//       console.log('Token account created at', tokenAccount.address.toBase58());
//       await mintTo(
//         connection,
//         payer,
//         mint,
//         tokenAccount.address,
//         payer,
//         amount
//       )
//       console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
// }

// async function main() {
//     const mint = await createMintForToken(payer, mintAthority.publicKey);
//     await mintNewTokens(mint, mintAthority.publicKey, 100);    
// }

// main();


// // Check your balances in the explorer

// // Import the token in Phantom and see the balances


/* 
    PDAs

    When you created an `associated token account` , you actually created a PDA - 

    https://github.com/solana-labs/solana-program-library/blob/ab830053c59c9c35bc3a727703aacf40c1215132/associated-token-account/program/src/processor.rs#L81

    JS - https://github.com/solana-labs/solana-program-library/blob/ab830053c59c9c35bc3a727703aacf40c1215132/token/js/src/state/mint.ts#L171
*/

/* 
    Token-22 program
    Ref - https://spl.solana.com/token-2022

        A token program on the Solana blockchain, defining a common implementation for fungible and non-fungible tokens.

        The Token-2022 Program, also known as Token Extensions, is a superset of the functionality provided by the Token Program.

        - Create token mint
            
            ```jsx
            spl-token create-token  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
            ```
  
        - Create an associated token account
            
            ```jsx
            spl-token create-account 8fTM5XYRaoTJU9PLUuyakF3EypQ4RXL5HxKtiw2z9pQQ
            ```
            
        - Mint the tokens
            
            ```jsx
            spl-token mint 8fTM5XYRaoTJU9PLUuyakF3EypQ4RXL5HxKtiw2z9pQQ  100
            ```
*/

/* 
    Token-22 with Metadata

    # Token-22 with metadata

    https://cdn.100xdevs.com/metadata.json

    - Create a token with metadata enabled
        
        ```jsx
        spl-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --enable-metadata
        ```
        
    - Create metadata
        
        ```jsx
        spl-token initialize-metadata pXfZ6Hg2s78m1iSRVsdzos9TmfkqkQdv5MmQrr77ZQK 100xx 100xxx https://cdn.100xdevs.com/metadata.json
        ```
        
    - Create ATA
        
        ```jsx
        spl-token create-account pXfZ6Hg2s78m1iSRVsdzos9TmfkqkQdv5MmQrr77ZQK
        ```
        
    - Mint
        
        ```jsx
        spl-token mint 1000
        ```
        
    - Check out the token in your wallet
        
        !Screenshot 2024-08-23 at 6.53.42 PM.png
        

    ## Assignment

    1. Show all the tokens that the user has in our web based wallet (ref -`getTokenAccountsByOwner` RPC method)
    2. Create a token launchpad website that lets users launch tokens (take things like decimals, freeze athority as inputs from the user)
*/