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

    if (!form.category)
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
      category: form.category 
    });

    // reset form
    setForm({
      title: "",
      amount: "",
      category: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TITLE */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}

      {/* CATEGORY DROPDOWN */}
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

      <button type="submit">Add Expense</button>
    </form>
  );
}