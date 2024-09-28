'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof formSchema>

export default function NewForm() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    defaultValues: {
      email: 'caioceretta@gmail.com'
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      throw new Error();
      console.log(data)
    } catch (error) {
      setError("root", {
        message: "This email is already taken"
      } )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tutorial gap-2">
      <input
        type="text"
        {...register('email')}
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
        {...register('password')}
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
      {errors.root && (
        <div>
          <p className="text-red-500">{errors.root.message}</p>
        </div>
      )}
    </form>
  )
}

