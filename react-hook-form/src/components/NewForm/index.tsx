'use client'

import { SubmitHandler, useForm } from "react-hook-form"

type FormFields = {
  email: string;
  password: string;
}

export default function NewForm() {

  const {register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tutorial gap-2">
      <input
        type="text"
        {...register('email', {
          required: 'E-mail is required',
          validate: (value) => {
            if(!value.includes('@')) {
              return 'E-mail input must include @ '
            }
            return true;
          }
        })}
        placeholder="Email"
      />
      {errors.email && (
        <div>
          <p className="text-red-500">{errors.email.message}</p>
        </div>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
      />
      {errors.password && (
        <div>
          <p className="text-red-500">{errors.password.message}</p>
        </div>
      )}

      <button disabled={isSubmitting} type="submit">
        {
          isSubmitting ? "Loading..." : 'Submit'
        }
      </button>
    </form>
  )
}