// const { getAssociatedTokenAddress, unpackAccount } = require("@solana/spl-token");
// const { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
// const connection = new Connection("https://api.mainnet-beta.solana.com")


// async function main() {
//     const kp = Keypair.generate();
//     const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/YOUR_KEY");
//     connection.requestAirdrop(kp.publicKey, LAMPORTS_PER_SOL * 0.1);

//     const balance = await connection.getBalance(kp.publicKey);
//     console.log("Balance is: " + balance);
// }

// async function getTokenBalance(publicKey, mintAddress) {
//     // const ataAddress = await getAssociatedTokenAddress(
//     //     mintAddress, 
//     //     publicKey,
//     //     true
//     // );

//     const [ataAddress, bump] = PublicKey.findProgramAddressSync(
//         [
//             publicKey.toBuffer(), 
//             new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").toBuffer(), mintAddress.toBuffer()
//         ],
//         new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
//     )

//     const accountData = await connection.getAccountInfo(ataAddress);
//     console.log(accountData);

//     // const innerData = unpackAccount(ataAddress, accountData);
//     // console.log(innerData);

//     console.log(ataAddress.toBase58());

//     console.log("Bump is: " + bump)
// }

// getTokenBalance(new PublicKey("4Lh1PGnh2TMYFXmNRsys6Kb5nsy4KgJN5C56S371JG2b"), new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"));

// // main();

const { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { Connection, Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const connection = new Connection("https://api.mainnet-beta.solana.com");
const kp = Keypair.fromSecretKey(
    new Uint8Array([
        12, 45, 78, 23, 156, 201, 34, 87,
        90, 123, 44, 211, 56, 77, 188, 9,
        143, 62, 171, 99, 5, 248, 31, 64,
        201, 18, 76, 154, 220, 33, 87, 145,
        111, 72, 16, 203, 89, 41, 177, 60,
        14, 222, 95, 134, 70, 251, 38, 109,
        194, 28, 83, 167, 49, 210, 122, 7,
        158, 66, 239, 24, 91, 173, 52, 118
    ])
);

async function main() {
    const newPublicKey = Keypair.generate();
    const [randomPda] = PublicKey.findProgramAddressSync([], ASSOCIATED_TOKEN_PROGRAM_ID);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: kp.publicKey,
            newAccountPubkey: newPublicKey,
            lamports: 0.1 * LAMPORTS_PER_SOL,
            space: 165,
            programId: TOKEN_PROGRAM_ID
        })
    );

    await connection.sendTransaction(transaction, [kp, newPublicKey]);
    console.log(newPublicKey.publicKey.toBase58());
}

main();