import { test, expect, beforeAll, describe } from "bun:test";
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

const isNativeLiteSVMAvailable = async () => {
  try {
    const mod = await import("litesvm");
    return !!mod.LiteSVM;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      "Skipping litesvm tests because the native dependency is unavailable on this platform:",
      message,
    );
    return false;
  }
};

let LiteSVM: typeof import("litesvm").LiteSVM | undefined;

const liteSvmReady = await isNativeLiteSVMAvailable();
if (liteSvmReady) {
  ({ LiteSVM } = await import("litesvm"));
}

describe("Create pda from client", () => {
  if (!LiteSVM) {
    test.skip("should create pda", () => {
      expect(true).toBe(true);
    });
    return;
  }

  let liveSvm: InstanceType<typeof LiteSVM>;
  let pda: PublicKey;
  let bump: number;
  let programId: PublicKey;
  let payer: Keypair;

  beforeAll(() => {
    liveSvm = new LiteSVM();
    programId = PublicKey.unique();
    payer = Keypair.generate();
    liveSvm.addProgramFromFile(
      programId,
      "C:\\Users\\build\\Documents\\web3-bootcamp\\programs-with-pdas\\client\\programs_with_pdas.so",
    );
    liveSvm.airdrop(payer.publicKey, BigInt(100000000000));
    [pda, bump] = PublicKey.findProgramAddressSync([Buffer.from("client1"), payer.publicKey.toBuffer()], programId);

    const ix = new TransactionInstruction({
      keys: [
        {
          pubkey: payer.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      programId,
      data: Buffer.from(""),
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = liveSvm.latestBlockhash();
    tx.sign(payer);
    const res = liveSvm.sendTransaction(tx);
    console.log(res.toString());
  });

  test("should create pda", () => {
    const balance = liveSvm.getBalance(pda);
    console.log(balance);
    expect(Number(balance)).toBeGreaterThan(0);
    expect(Number(balance)).toBe(1000000000);
  });

  test("should derive the same PDA and bump from seeds", () => {
    const [derivedPda, derivedBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("client1"), payer.publicKey.toBuffer()],
      programId,
    );

    expect(derivedPda.equals(pda)).toBe(true);
    expect(derivedBump).toBe(bump);
  });
});