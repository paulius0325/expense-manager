import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} from "../services/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const [editErrors, setEditErrors] = useState({});

  const loadExpenses = async () => {
    try {
      setHasLoaded(true);
      const res = await getExpenses(selectedCategory);
      setExpenses(res.data);
    } catch (err) {
      setMessage("error loading expenses");
    }
  };

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

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setMessage("success: expense deleted");
      loadExpenses();
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "error deleting expense";
      setMessage(errorMsg);
    }
  };

  // VALIDATION
  const validateEdit = () => {
    const newErrors = {};

    if (!editForm.title.trim())
      newErrors.title = "Title is required";
    else if (!/^[a-zA-Z\s]+$/.test(editForm.title))
      newErrors.title = "Title must contain only letters";

    if (!editForm.amount || Number(editForm.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!editForm.category)
      newErrors.category = "Category is required";

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditErrors({});
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category
    });
  };

  const handleUpdate = async () => {
    if (!validateEdit()) return;

    try {
      await updateExpense(editingId, {
        title: editForm.title,
        amount: Number(editForm.amount),
        category: editForm.category
      });

      setMessage("success: expense updated");
      setEditingId(null);
      setEditErrors({});
      loadExpenses();
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "error updating expense";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="container">
      <h1>Expense Manager</h1>

      <div className="section">
        <ExpenseForm onSubmit={handleCreate} />
      </div>

      {message && (
        <p
          className={`message ${
            message.includes("success") ? "success" : "error-message"
          }`}
        >
          {message}
        </p>
      )}

      <div className="section">
        <h2>Expenses</h2>

        <div className="form-row">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <button className="btn primary" onClick={loadExpenses}>
            Filter
          </button>
        </div>

        {hasLoaded && expenses.length === 0 && (
          <div className="empty">No expenses found</div>
        )}

        {expenses.length > 0 && (
          <div className="table-wrapper"> {/* ✅ FIX */}
            <table>
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
                    {editingId === e.id ? (
                      <>
                        <td>
                          <input
                            value={editForm.title}
                            onChange={(ev) =>
                              setEditForm({
                                ...editForm,
                                title: ev.target.value
                              })
                            }
                          />
                          {editErrors.title && (
                            <div className="error-box">{editErrors.title}</div>
                          )}
                        </td>

                        <td>
                          <input
                            type="number"
                            value={editForm.amount}
                            onChange={(ev) =>
                              setEditForm({
                                ...editForm,
                                amount: ev.target.value
                              })
                            }
                          />
                          {editErrors.amount && (
                            <div className="error-box">{editErrors.amount}</div>
                          )}
                        </td>

                        <td>
                          <select
                            value={editForm.category}
                            onChange={(ev) =>
                              setEditForm({
                                ...editForm,
                                category: ev.target.value
                              })
                            }
                          >
                            <option value="">Select category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                          </select>

                          {editErrors.category && (
                            <div className="error-box">
                              {editErrors.category}
                            </div>
                          )}
                        </td>

                        <td colSpan="2">
                          <button
                            className="btn primary"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>

                          <button
                            className="btn secondary"
                            onClick={() => {
                              setEditingId(null);
                              setEditErrors({});
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{e.title}</td>
                        <td>{e.amount}</td>
                        <td>{e.category}</td>
                        <td>
                          {new Date(e.createdAt).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="btn primary"
                            onClick={() => handleEdit(e)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn secondary"
                            onClick={() => handleDelete(e.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}