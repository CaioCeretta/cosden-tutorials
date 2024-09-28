'use client'

import { FormEvent, useState } from "react";

export default function OldForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Clear errors for new submission
    setErrors({ email: "", password: "" });

    // Manual validation
    if (!email.includes("@")) {
      setErrors({ ...errors, email: "E-mail must include a @" });
      return;
    }

    if (password.length < 8) {
      setErrors({ ...errors, password: "Password must be at least 8 characters" });
      return;
    }

    console.log('Form Submitted');
  }

  return (
    <form onSubmit={handleSubmit} className="tutorial gap-2">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={errors.email ? "border-red-500" : ""}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={errors.password ? "border-red-500" : ""}
      />

      {errors.password && <div className="text-red-500">{errors.password}</div>}
      {errors.email && <div className="text-red-500">{errors.email}</div>}

      <button type="submit">Submit</button>
    </form>
  )
}