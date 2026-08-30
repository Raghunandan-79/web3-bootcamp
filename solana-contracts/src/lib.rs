use std::slice::Iter;

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info}, entrypoint::{ProgramResult, entrypoint},program_error::ProgramError::MissingRequiredSignature, pubkey::Pubkey,
};

entrypoint!(process_instruction);

#[derive(BorshSerialize, BorshDeserialize)]
struct Counter {
    count: u32,
    authority: Pubkey
}

#[derive(BorshSerialize, BorshDeserialize)]
enum InstructionData {
    Increase(u32),
    Decrease(u32),
    Init
}

pub fn process_instruction(
    _pubkey: &Pubkey,         // public key of where this program is deployed
    accounts: &[AccountInfo], // Array of all the accounts you are going to read or write to in this transaction, here read from counter account
    instruction_data: &[u8], // increase, decrease [0], [1]
) -> ProgramResult {
    // check if the account has signed the txn
    let mut iter: Iter<'_, AccountInfo<'_>>= accounts.iter();
    let counter_account: &AccountInfo<'_> = next_account_info(&mut iter)?;
    let user_account: &AccountInfo<'_> = next_account_info(&mut iter)?;

    if !counter_account.is_signer {
        return Err(MissingRequiredSignature);
    }

    // read the data inside the counter account, deserialize it to a struct
    let mut counter: Counter = Counter::try_from_slice(*counter_account.data.borrow())?;
    let instruction_data: InstructionData = InstructionData::try_from_slice(instruction_data)?;

    // increase the value / decrease the value based on whatever the user wants to do
    match instruction_data {
        InstructionData::Init => {
            if !counter_account.is_signer {
                return Err(solana_program::program_error::ProgramError::MissingRequiredSignature);
            }

            let init_counter: Counter = Counter {
                count: 0,
                authority: *user_account.key,
            };
            init_counter.serialize(&mut *counter_account.data.borrow_mut())?;
        },
        InstructionData::Decrease(count) => {
            if counter.authority != *user_account.key {
                return Err(solana_program::program_error::ProgramError::InvalidInstructionData);
            }

            counter.count = counter.count - count;
            counter.serialize(&mut *counter_account.data.borrow_mut())?;
        },
        InstructionData::Increase(count) => {
            if counter.authority != *user_account.key {
                return Err(solana_program::program_error::ProgramError::InvalidInstructionData);
            }

            counter.count = counter.count + count;
            counter.serialize(&mut *counter_account.data.borrow_mut())?;
        }
    }

    // write the change back
    counter.serialize(&mut *counter_account.data.borrow_mut())?;
    
    return Ok(());
}
