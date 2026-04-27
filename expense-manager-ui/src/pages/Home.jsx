import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { createExpense, getExpenses } from "../services/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // GET logika 
  const loadExpenses = async () => {
  try {
    setHasLoaded(true);
    const res = await getExpenses();
    setExpenses(res.data);
  } catch (err) {
    setMessage("error loading expenses");
  }
};

<button onClick={loadExpenses}>Load Expenses</button>
const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      await createExpense(data);
      setMessage("success: expense created");

      loadExpenses(); 
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "error: something went wrong";

      setMessage(errorMsg);
    }
  };

  return (
    <div>
      <h1>Expense Manager</h1>

      <ExpenseForm onSubmit={handleCreate} />

      <p style={{ color: message.includes("success") ? "green" : "red" }}>
        {message}
      </p>

     <h2>Expenses</h2>

<button onClick={loadExpenses}>
  Load Expenses
</button>

{hasLoaded && expenses.length === 0 && (
  <p>No expenses found</p>
)}

{expenses.length > 0 && (
  <table border="1">
    <thead>
      <tr>
        <th>Title</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((e) => (
        <tr key={e.id}>
          <td>{e.title}</td>
          <td>{e.amount}</td>
          <td>{e.category}</td>
          <td>{new Date(e.createdAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  );
}