import { useState } from "react";

export default function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim())
      newErrors.title = "Title is required";

    if (!form.amount || Number(form.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!form.category.trim())
      newErrors.category = "Category is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

      <button type="submit">Add Expense</button>
    </form>
  );
}