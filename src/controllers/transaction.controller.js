import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model";

const createTransition = async function (req, res) {
    const { fromAccount, toAccount, amount, idempotencyID } = req.body;
    if (!fromAccount || !toAccount || !amount || !idempotencyID) {
        return res.status(400).json({
            message: "All fields are required to success trasaction",
            success: false
        })
    }

    const fromUserAccount = await Account.findById(fromAccount);
    const toUserAccount = await Account.findById(toAccount);

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount",
            success: false
        })
    }

    const isTransactionAlreadyExists = await Transaction.findOne({
        idempotencyKey: idempotencyID
    })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })

        }

        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
            })
        }

        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed, please retry"
            })
        }

        if (isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }

    if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction",
            success:false,
        })
    }

}