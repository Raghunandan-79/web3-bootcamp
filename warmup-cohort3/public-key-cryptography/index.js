const binaryRepresentation = new TextEncoder().encode("h");
console.log(binaryRepresentation);

const publicKey = "Eg4F6LW8DD3SvFLLigYJBFvRnXSBiLZYYJ3KEePDL95Q";
const bytes = new TextEncoder().encode(publicKey);
console.log(bytes);

function arrayToHex(byteArray) {
    let hexString = "";

    for (let i = 0; i < byteArray.length; i++) {
        hexString += byteArray[i].toString(16).padStart(2, '0');
    }

    return hexString;
}

const str = "hello";
const byteArray1 = new TextEncoder().encode(str);
const hexString = arrayToHex(byteArray1);
console.log(hexString);

// .toHex()


// Base64 encoding: It uses 64 different characters [A-Z, a-z, 0-9, +, /] which means each character can represent one of 64 possible values https://www.base64encode.org

const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
const base64encode = Buffer.from(uint8Array).toString("base64");
console.log(base64encode);

// 5 bytes => 40 bits => ceil(40/6) = 7

// Base58 encoding
