import ExpenseForm from "../components/ExpenseForm";
import { createExpense } from "../services/api";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleCreate = async (data) => {
    try {
      await createExpense(data);

      setMessage("success: expense created");
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
    </div>
  );
}