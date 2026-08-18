const { getAssociatedTokenAddress } = require("@solana/spl-token");
const { PublicKey, Keypair, Transaction, SystemProgram, Connection, LAMPORTS_PER_SOL } = require("@solana/web3.js");

async function main() {
    const address = await getAssociatedTokenAddress(
        new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
        true
    );

    const [address2] = await PublicKey.findProgramAddress(
        [
            new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB").toBuffer(), // USDT Mint
            new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").toBuffer(), // SPL Token Program
            new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").toBuffer() // USDC Mint
        ],
        new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), // Associated Token Account Program
    )

    console.log(address.toBase58());
    console.log(address2.toBase58());
}

// const connection = new Connection("https://api.devnet.solana.com");

// const adminKeypair = Keypair.generate();

// async function main() {
//     await connection.requestAirdrop(adminKeypair.publicKey, LAMPORTS_PER_SOL);

//     const keypair = Keypair.generate();
//     // const txn = new Transaction().add(
//     //     SystemProgram.createAccount({
//     //         owner: SystemProgram.programId,
//     //         lamports: 100000000,
//     //         space: 1000,
//     //         fromPubkey: adminKeypair.publicKey,
//     //         newAccountPubkey: keypair.publicKey
//     //     })
//     // );

//     const txn2 = new Transaction().add(
//         SystemProgram.transfer({
//             lamports: 100000000,
//             fromPubkey: adminKeypair.publicKey,
//             toPubkey: keypair.publicKey
//         })
//     )

//     // await connection.sendTransaction(txn, [keypair, adminKeypair]);
//     await connection.sendTransaction(txn2, [keypair, adminKeypair]);
//     console.log(keypair.publicKey.toBase58());
// }

main();