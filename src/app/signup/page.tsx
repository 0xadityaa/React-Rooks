import { Input } from '@/components/ui/input'
import React from 'react'

function SignUpPage() {
  return (
    <div className="form-wrapper">
            <h1 className="form-title">Sign up</h1>

            <form action="/api/auth/signup" method="post">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input type="text" name="username" id="username" className="w-100" autoFocus placeholder="chino"/>
                </div>

                <div className="form-group mb-1">
                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" id="email" className="w-100"
                        title="email here"/>
                </div>

                <div className="form-group mb-1">
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" id="password" className="w-100"
                        title="strong password please"/>
                </div>

                <div className="form-group mb-0">
                    <Input type="submit" value="sign up" className="w-100" id="submit"/>
                </div>
            </form>

            <small>Have an account? <a href="/signin">Login here</a></small>
        </div>
  )
}

export default SignUpPage