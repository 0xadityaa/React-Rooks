import { Input } from '@/components/ui/input'
import React from 'react'

function SignInPage() {
  return (
    <div className="form-wrapper">
            <h1 className="form-title">Sign in</h1>

            <form action="/api/auth/signin" method="post">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input type="text" name="username" id="username" className="w-100" autoFocus placeholder="chino"/>
                </div>

                <div className="form-group mb-1">
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" id="password" className="w-100"/>
                </div>

                <div className="form-group mb-0">
                    <Input type="submit" value="Login" className="w-100" id="submit"/>
                </div>
            </form>

            <small>Don&apos;t have an account? <a href="/signup">Sign up here</a></small>
            
        </div>
  )
}

export default SignInPage