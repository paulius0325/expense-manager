import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { createExpense, getExpenses, deleteExpense } from "../services/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // GET logika
  const loadExpenses = async () => {
  try {
    setHasLoaded(true);
    const res = await getExpenses(selectedCategory);
    setExpenses(res.data);
  } catch (err) {
    setMessage("error loading expenses");
  }
};
  // CREATE
  const handleCreate = async (data) => {
    try {
      await createExpense(data);
      setMessage("success: expense created");

      loadExpenses(); // refresh list
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "error: something went wrong";

      setMessage(errorMsg);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      setMessage("success: expense deleted");

      loadExpenses(); // refresh
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "error deleting expense";

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

    <select
      value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
      <option value="">All</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Other">Other</option>
    </select>

      <button onClick={loadExpenses}>
        Filter
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
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.amount}</td>
                <td>{e.category}</td>
                <td>{new Date(e.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(e.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}