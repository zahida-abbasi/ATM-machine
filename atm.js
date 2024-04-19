#! /usr/bin/env node 
import inquirer from "inquirer";
(async () => {
    let myBalance = 25000; // Initial balance
    let myPin = 1234; // Default PIN
    // Prompt user for PIN
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your PIN",
            type: "number"
        }
    ]);
    if (pinAnswer.pin === myPin) {
        console.log("Correct PIN code");
        // Prompt user to select account type
        let accountTypeAnswer = await inquirer.prompt([
            {
                type: "list",
                name: "accountType",
                choices: ["Current", "Saving"],
                message: "Select Your Account Type"
            }
        ]);
        // Prompt user to select transaction type
        let transactionTypeAnswer = await inquirer.prompt([
            {
                type: "list",
                name: "transactionType",
                choices: ["Withdraw", "Check balance"],
                message: "Select Your Transaction"
            }
        ]);
        if (transactionTypeAnswer.transactionType === "Withdraw") {
            // Handle cash withdrawal
            let withdrawalAmount = 0;
            if (transactionTypeAnswer.transactionType === "Fast Cash") {
                // Prompt user for fast cash withdrawal amount
                withdrawalAmount = await promptForFastCashWithdrawal();
            }
            else {
                // Prompt user for withdrawal amount
                let amountAnswer = await inquirer.prompt([
                    {
                        name: "amount",
                        message: "Enter the amount to withdraw",
                        type: "number"
                    }
                ]);
                withdrawalAmount = amountAnswer.amount;
            }
            // Check if sufficient balance is available
            if (myBalance >= withdrawalAmount) {
                myBalance -= withdrawalAmount;
                console.log("Withdrawal successful!");
                console.log("Your remaining balance is: " + myBalance);
            }
            else {
                console.log("Insufficient balance!");
            }
        }
        else if (transactionTypeAnswer.transactionType === "Check balance") {
            // Display current balance
            console.log("Your current balance is: " + myBalance);
        }
    }
    else {
        console.log("Incorrect PIN code");
    }
})();
async function promptForFastCashWithdrawal() {
    // Prompt user for fast cash withdrawal amount
    let amountAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "amount",
            choices: [1000, 2000, 5000, 10000, 20000, 25000, 30000],
            message: "Select the amount you want to withdraw"
        }
    ]);
    return amountAnswer.amount;
}
