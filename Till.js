"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function main() {
    var change = 0;
    var tillBalance = 500; // Initial till balance
    var output = ""; // Initialize output string
    try {
        var data = fs.readFileSync("input.txt");
        var lines = data.toString().split('\n');
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var transactionsAndPayment = line.split(",");
            var transactions = transactionsAndPayment[0].split(";");
            var amountsStr = transactionsAndPayment[transactionsAndPayment.length - 1].split("-");
            var transactionTotal = processTotalTransaction(transactions);
            var paid = processPaidAmount(amountsStr);
            change = paid - transactionTotal;
            output += "Till Start: R".concat(tillBalance, ", Transaction Total: R").concat(transactionTotal, ", Paid: R").concat(paid, ", Change Total: R").concat(change, ", Change Breakdown: ").concat(change === 0 ? "0" : "R" + changeBreakDown(change), "\n");
            // Update till balance for the next transaction
            tillBalance += paid - change;
        }
        output += "Remaining Balance in Till: R".concat(tillBalance);
        fs.writeFileSync("output.txt", output); // Write output to output.txt
    }
    catch (err) {
        console.error("Error reading input file: " + err);
    }
}
function changeBreakDown(change) {
    var note = [50, 20, 10, 5, 2, 1];
    var count = new Array(note.length).fill(0);
    var changeBreakDownStr = "";
    for (var i = 0; i < note.length; i++) {
        while (change >= note[i]) {
            change -= note[i];
            count[i]++;
        }
    }
    var first = true;
    for (var i = 0; i < note.length; i++) {
        for (var j = 0; j < count[i]; j++) {
            if (!first) {
                changeBreakDownStr += "-";
            }
            else {
                first = false;
            }
            changeBreakDownStr += note[i];
        }
    }
    return changeBreakDownStr;
}
function processPaidAmount(amountsStr) {
    var paid = 0;
    for (var _i = 0, amountsStr_1 = amountsStr; _i < amountsStr_1.length; _i++) {
        var amount = amountsStr_1[_i];
        var paidString = void 0;
        if (amount.length == 2) {
            paidString = amount.trim().substring(1);
        }
        else if (amount.length == 3) {
            paidString = amount.trim().substring(1, 3);
        }
        else {
            paidString = amount.trim().substring(1, 4);
        }
        paid += parseInt(paidString);
    }
    return paid;
}
function processTotalTransaction(transactions) {
    var totalTransaction = 0;
    for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
        var transaction = transactions_1[_i];
        var parts = transaction.split(" ");
        totalTransaction += parseInt(parts[parts.length - 1].trim().substring(1));
    }
    return totalTransaction;
}
main();
