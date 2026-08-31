use std::slice::Iter;

use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    instruction::{AccountMeta, Instruction},
    program::invoke,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    publicKey: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let mut iter: Iter<'_, AccountInfo<'_>> = accounts.iter();
    let data_account: &AccountInfo<'_> = next_account_info(&mut iter)?;
    let double_contract_address: &AccountInfo<'_> = next_account_info(&mut iter)?;

    let instruction: Instruction = Instruction {
        program_id: *double_contract_address.key,
        accounts: vec![AccountMeta {
            is_signer: true,
            is_writable: true,
            pubkey: *data_account.key,
        }],
        data: vec![],
    };

    invoke(&instruction, &[data_account.clone()])?;

    Ok(())
}
