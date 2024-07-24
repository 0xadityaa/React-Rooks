import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'
 
function SignUpPage() {
  return (
    <Card className="relative flex flex-col w-full p-8 sm:max-w-md justify-center gap-2">
 
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action="/api/auth/signup" method="post">
 
      <label className="text-md" htmlFor="username">
          Username
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="username"
          placeholder="username"
          required
        />
 
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
 
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button
          type='submit'
          variant={"default"}
        >
          Sign up
        </Button>
 
      </form>
      <small>Have an account? <a href="/signin" className='underline decoration-blue-500'>Login here</a></small>
    </Card>
  )
}
 
export default SignUpPage;