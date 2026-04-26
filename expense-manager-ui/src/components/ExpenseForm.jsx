import { useState } from "react";

export default function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title required");
      return;
    }

    if (Number(form.amount) <= 0) {
      alert("Amount must be > 0");
      return;
    }

    if (!form.category.trim()) {
      alert("Category required");
      return;
    }

    onSubmit({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}