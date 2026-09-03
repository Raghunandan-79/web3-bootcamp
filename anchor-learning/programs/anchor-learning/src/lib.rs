use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        ctx.accounts.new_account.data = data;
        msg!("Changed data to: {}!", data);
        Ok(())
    }

    pub fn double(ctx: Context<Double>) -> Result<()> {
        ctx.accounts.data_account.data = ctx.accounts.data_account.data * 2;
        Ok(())
    }

    pub fn half(ctx: Context<Half>) -> Result<()> {
        ctx.accounts.data_account.data = ctx.accounts.data_account.data / 2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Subtract>, amount: u64) -> Result<()> {
        ctx.accounts.data_account.data -= amount as u64;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Subtract<'info> {
    #[account(mut)]
    pub data_account: Account<'info, NewAccount>,
    #[account(mut)] 
    pub signer: Signer<'info>
}

#[derive(Accounts)]
pub struct Half<'info> {
    #[account(mut)]
    pub data_account: Account<'info, NewAccount>,
    #[account(mut)] 
    pub signer: Signer<'info>
}

#[derive(Accounts)]
pub struct Double<'info> {
    #[account(mut)]
    pub data_account: Account<'info, NewAccount>,
    #[account(mut)] 
    pub signer: Signer<'info>
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 8,
        owner = pubkey!("11111111111111111111111111111111")
    )]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    data: u64
}