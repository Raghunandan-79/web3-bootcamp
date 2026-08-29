use adder::add;
use calculator::{divide, multiply, subtract};

fn main() {
    println!("{}", add(10, 20));
    println!("{}", multiply(10, 20));
    println!("{}", subtract(30, 20));
    println!("{}", divide(30, 40));
}
