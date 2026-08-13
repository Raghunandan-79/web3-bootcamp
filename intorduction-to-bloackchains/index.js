// Encodings

// ASCII
function bytesToAscii(byteArray) {
  return byteArray.map((byte) => String.fromCharCode(byte)).join("");
}

// Example usage:
const bytes = [72, 101, 108, 108, 111]; // Corresponds to "Hello"
const asciiString = bytesToAscii(bytes);
console.log(asciiString); // Output: "Hello"

function asciiToBytes(asciiString) {
  const byteArray = [];
  for (let i = 0; i < asciiString.length; i++) {
    byteArray.push(asciiString.charCodeAt(i));
  }
  return byteArray;
}

// Example usage:
const ascii = "Hello";
const byteArray = asciiToBytes(ascii);
console.log(byteArray); // Output: [72, 101, 108, 108, 111]

// function bytesToAscii(byteArray) {
//   return new TextDecoder().decode(byteArray);
// }

// // Example usage:
// const bytes1 = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
// const asciiString1 = bytesToAscii(bytes1);
// console.log(asciiString1); // Output: "Hello"

function asciiToBytes(asciiString) {
  return new Uint8Array([...asciiString].map((char) => char.charCodeAt(0)));
}

// Example usage:
const ascii2 = "Hello";
const byteArray2 = asciiToBytes(ascii2);
console.log(byteArray2); // Output: Uint8Array(5) [72, 101, 108, 108, 111]

// HEX
function arrayToHex(byteArray) {
  let hexString = "";
  for (let i = 0; i < byteArray.length; i++) {
    hexString += byteArray[i].toString(16).padStart(2, "0");
  }
  return hexString;
}

// Example usage:
const byteArray3 = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
const hexString = arrayToHex(byteArray3);
console.log(hexString); // Output: "48656c6c6f"

function hexToArray(hexString) {
  const byteArray = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return byteArray;
}

// Example usage:
const hex = "48656c6c6f";
const byteArrayFromHex = hexToArray(hex);
console.log(byteArrayFromHex); // Output: Uint8Array(5) [72, 101, 108, 108, 111]

// Base64
const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
const base64Encoded = Buffer.from(uint8Array).toString("base64");
console.log(base64Encoded);

// Base58
// const bs58 = require('bs58');

// function uint8ArrayToBase58(uint8Array) {
//   return bs58.encode(uint8Array);
// }

// // Example usage:
// const byteArray = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
// const base58String = uint8ArrayToBase58(byteArray);
// console.log(base58String); // Output: Base58 encoded string

// const bs58 = require('bs58');

// function base58ToUint8Array(base58String) {
//   return bs58.decode(base58String);
// }

// // Example usage:
// const base58 = base58String; // Use the previously encoded Base58 string
// const byteArrayFromBase58 = base58ToUint8Array(base58);
// console.log(byteArrayFromBase58); // Output: Uint8Array(5) [72, 101, 108, 108, 111]

// Symmetric Encryption
const crypto = require("crypto");

// Generate a random encryption key
const key = crypto.randomBytes(32); // 32 bytes = 256 bits
const iv = crypto.randomBytes(16); // Initialization vector (IV)

// Function to encrypt text
function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Function to decrypt text
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Example usage
const textToEncrypt = "Hello, World!";
const encryptedText = encrypt(textToEncrypt);
const decryptedText = decrypt(encryptedText);

console.log("Original Text:", textToEncrypt);
console.log("Encrypted Text:", encryptedText);
console.log("Decrypted Text:", decryptedText);

// Asymmetric Encryption
// EdDSA
// using @noble/ed25519
// import * as ed from "@noble/ed25519";

// async function main() {
//   // Generate a secure random private key
//   const privKey = ed.utils.randomPrivateKey();

//   // Convert the message "hello world" to a Uint8Array
//   const message = new TextEncoder().encode("hello world");

//   // Generate the public key from the private key
//   const pubKey = await ed.getPublicKeyAsync(privKey);

//   // Sign the message
//   const signature = await ed.signAsync(message, privKey);

//   // Verify the signature
//   const isValid = await ed.verifyAsync(signature, message, pubKey);

//   // Output the result
//   console.log(isValid); // Should print `true` if the signature is valid
// }

// main();

// Using @solana/web3.js
// import { Keypair } from "@solana/web3.js";
// import nacl from "tweetnacl";

// // Generate a new keypair
// const keypair = Keypair.generate();

// // Extract the public and private keys
// const publicKey = keypair.publicKey.toString();
// const secretKey = keypair.secretKey;

// // Display the keys
// console.log("Public Key:", publicKey);
// console.log("Private Key (Secret Key):", secretKey);

// // Convert the message "hello world" to a Uint8Array
// const message = new TextEncoder().encode("hello world");

// const signature = nacl.sign.detached(message, secretKey);
// const result = nacl.sign.detached.verify(
//   message,
//   signature,
//   keypair.publicKey.toBytes(),
// );

// console.log(result);

// ECDSA
// using @noble/secp256k1
// import * as secp from "@noble/secp256k1";

// async function main() {
//   const privKey = secp.utils.randomPrivateKey(); // Secure random private key
//   // sha256 of 'hello world'
//   const msgHash =
//     "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
//   const pubKey = secp.getPublicKey(privKey);
//   const signature = await secp.signAsync(msgHash, privKey); // Sync methods below
//   const isValid = secp.verify(signature, msgHash, pubKey);
//   console.log(isValid);
// }

// main();

// using ethers
// import { ethers } from "ethers";

// // Generate a random wallet
// const wallet = ethers.Wallet.createRandom();

// // Extract the public and private keys
// const publicKey = wallet.address;
// const privateKey = wallet.privateKey;

// console.log("Public Key (Address):", publicKey);
// console.log("Private Key:", privateKey);

// // Message to sign
// const message = "hello world";

// // Sign the message using the wallet's private key
// const signature = await wallet.signMessage(message);
// console.log("Signature:", signature);

// // Verify the signature
// const recoveredAddress = ethers.verifyMessage(message, signature);

// console.log("Recovered Address:", recoveredAddress);
// console.log("Signature is valid:", recoveredAddress === publicKey);