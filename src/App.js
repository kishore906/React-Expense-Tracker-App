import { useState, useEffect } from "react";

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [isTransFormOpen, setIsTransFormOpen] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  let balance = income - expense;

  // this function deals with adding newTransaction
  function handleAllTransactions(newTransaction) {
    // checking for balance before adding newTransaction
    if (
      (balance === 0 || balance < newTransaction.amount) &&
      newTransaction.transactionType === "Expense"
    ) {
      alert("You cannot add Expense as balance 💰 is Zero or Less");
      return;
    }

    if (newTransaction.transactionType === "Expense") {
      setAllTransactions((prev) => [...prev, newTransaction]);
      setExpense((prev) => prev + newTransaction.amount);
    } else if (newTransaction.transactionType === "Income") {
      setAllTransactions((prevTrans) => [...prevTrans, newTransaction]);
      setIncome((prevIncome) => prevIncome + newTransaction.amount);
    }
  }

  // this function deals with displaying addTransactionForm
  function handleAddTransForm() {
    setIsTransFormOpen((prev) => !prev);
  }

  return (
    <div className="app">
      <h3>Expense Tracker App</h3>

      <Balance
        balance={balance}
        onAddTransForm={handleAddTransForm}
        isTransFormOpen={isTransFormOpen}
      />

      {isTransFormOpen && (
        <AddTransaction addTransaction={handleAllTransactions} />
      )}

      <DisplayExpenseAndIncome income={income} expense={expense} />

      <Transactions allTransactions={allTransactions} />
    </div>
  );
}

// Balance Component
function Balance({ balance, onAddTransForm, isTransFormOpen }) {
  return (
    <div className="balance-container">
      <p>Balance: ${balance}</p>
      <button className="addBtn" onClick={onAddTransForm}>
        {isTransFormOpen ? "Close" : "Add"}
      </button>
    </div>
  );
}

// Adding New Transaction Component
function AddTransaction({ addTransaction }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("Expense");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newTransaction = { id, amount, description, transactionType };

    //console.log(newTransaction);

    addTransaction(newTransaction);

    setAmount("");
    setDescription("");
    setTransactionType("Expense");
  }

  return (
    <form className="addTransactionForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <div>
        <input
          type="radio"
          name=""
          value="Expense"
          onChange={(e) => setTransactionType(e.target.value)}
          checked={transactionType === "Expense"}
          id="expense"
        />
        <label htmlFor="expense">Expense</label>&nbsp;&nbsp;
        <input
          type="radio"
          name=""
          value="Income"
          onChange={(e) => setTransactionType(e.target.value)}
          checked={transactionType === "Income"}
          id="income"
        />
        <label htmlFor="income">Income</label>
      </div>

      <button className="addTransactionBtn">Add Transaction</button>
    </form>
  );
}

// Expense and Income Component
function DisplayExpenseAndIncome({ income, expense }) {
  return (
    <div className="expenseIncomeContainer">
      <div>
        <p>Expense</p>
        <p className="values">${expense}</p>
      </div>
      <div>
        <p>Income</p>
        <p className="values">${income}</p>
      </div>
    </div>
  );
}

// AllTransactions Component
function Transactions({ allTransactions }) {
  const [search, setSearch] = useState("");
  /*
  const [transactions, setTransactions] = useState(allTransactions);

  // this function filters the searched transaction
  const filterData = (search) => {
    if (!search || !search.trim().length) {
      setTransactions(allTransactions);
      return;
    }

    let txn = [...allTransactions];
    txn = txn.filter((trans) =>
      trans.description.toLowerCase().includes(search.toLowerCase().trim())
    );
    setTransactions(txn);
  };

  useEffect(() => filterData(search), [allTransactions, search]);
  */

  return (
    <div>
      <h4 style={{ fontSize: "20px" }}>Transactions</h4>
      <input
        type="text"
        className="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          //filterData(e.target.value);
        }}
        placeholder="Search Transaction.."
      />
      {allTransactions
        .filter((trans) =>
          trans.description.toLowerCase().includes(search.toLowerCase().trim())
        )
        .map((trans) => (
          <Transaction transaction={trans} key={trans.id} />
        ))}
    </div>
  );
}

// Each Transaction Component
function Transaction({ transaction }) {
  return (
    <div className="transaction">
      <p>{transaction.description}</p>
      <p>
        {transaction.transactionType === "Expense" ? "-" : "+"}$
        {transaction.amount}
      </p>
    </div>
  );
}

export default App;
