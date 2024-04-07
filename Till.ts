import * as fs from 'fs';

function main() {
    let change = 0;
    let tillBalance = 500; // Initial till balance
    let output = ""; // Initialize output string

    try {
        const data = fs.readFileSync("input.txt");
        const lines = data.toString().split('\n');
        for (const line of lines) {
            const transactionsAndPayment = line.split(",");
            const transactions = transactionsAndPayment[0].split(";");
            const amountsStr = transactionsAndPayment[transactionsAndPayment.length - 1].split("-");

            const transactionTotal = processTotalTransaction(transactions);
            const paid = processPaidAmount(amountsStr);
            change = paid - transactionTotal;

            output += `Till Start: R${tillBalance}, Transaction Total: R${transactionTotal}, Paid: R${paid}, Change Total: R${change}, Change Breakdown: ${change === 0 ? "0" : "R" + changeBreakDown(change)}\n`;

            // Update till balance for the next transaction
            tillBalance += paid - change;
        }
        output += `Remaining Balance in Till: R${tillBalance}`;

        fs.writeFileSync("output.txt", output); // Write output to output.txt
    } catch (err) {
        console.error("Error reading input file: " + err);
    }
}

function changeBreakDown(change: number): string {
    const note = [50, 20, 10, 5, 2, 1];
    const count = new Array<number>(note.length).fill(0);
    let changeBreakDownStr = "";

    for (let i = 0; i < note.length; i++) {
        while (change >= note[i]) {
            change -= note[i];
            count[i]++;
        }
    }

    let first = true;
    for (let i = 0; i < note.length; i++) {
        for (let j = 0; j < count[i]; j++) {
            if (!first) {
                changeBreakDownStr += "-";
            } else {
                first = false;
            }
            changeBreakDownStr += note[i];
        }
    }
    return changeBreakDownStr;
}

function processPaidAmount(amountsStr: string[]): number {
    let paid = 0;
    for (const amount of amountsStr) {
        let paidString;
        if (amount.length == 2) {
            paidString = amount.trim().substring(1);
        } else if (amount.length == 3) {
            paidString = amount.trim().substring(1, 3);
        } else {
            paidString = amount.trim().substring(1, 4);
        }
        paid += parseInt(paidString);
    }
    return paid;
}

function processTotalTransaction(transactions: string[]): number {
    let totalTransaction = 0;
    for (const transaction of transactions) {
        const parts = transaction.split(" ");
        totalTransaction += parseInt(parts[parts.length - 1].trim().substring(1));
    }
    return totalTransaction;
}

main();
