import ExpenseForm from "../components/ExpenseForm";
import { createExpense } from "../services/api";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

 const handleCreate = async (data) => {
  try {
    const res = await createExpense(data);

    setMessage({
      type: "success",
      text: "Expense created successfully"
    });

  } catch (err) {
    console.log(err);

    const apiError =
      err.response?.data?.error ||
      err.response?.data?.title ||
      "Unexpected error occurred";

    setMessage({
      type: "error",
      text: apiError
    });
  }
};

  return (
    <div>
      <h1>Expense Manager</h1>

      <ExpenseForm onSubmit={handleCreate} />

      {message && (
  <p style={{ color: message.type === "success" ? "green" : "red" }}>
    {message.text}
  </p>)}
    </div>
  );
}