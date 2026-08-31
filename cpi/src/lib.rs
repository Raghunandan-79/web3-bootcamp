use std::slice::Iter;

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info}, entrypoint:: ProgramResult, entrypoint, program_error::ProgramError, pubkey::Pubkey,
};

entrypoint!(process_instruction);

#[derive(BorshSerialize, BorshDeserialize)]
struct OnChainData {
    count: u32
}

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo], // [data_account]
    instruction_data: &[u8],
) -> ProgramResult {
    let mut iter: Iter<'_, AccountInfo<'_>> = accounts.iter();
    let data_account: &AccountInfo<'_> = next_account_info(&mut iter)?;
    let user_account: &AccountInfo<'_> = next_account_info(&mut iter)?;

    if data_account.is_signer != true {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let mut counter: OnChainData = OnChainData::try_from_slice(&data_account.data.borrow_mut())?; // &[u8]

    if counter.count == 0 {
        counter.count = 1;
    } else {
        counter.count = counter.count * 2;
    }

    counter.serialize(&mut *data_account.data.borrow_mut())?;

    Ok(())
}
