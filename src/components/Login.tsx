import React from 'react'

export const Login = () => {
  return (
    <fieldset className="p-4 border fieldset w-xs bg-base-200 border-base-300 rounded-box ">
      <legend className="fieldset-legend">Login</legend>

      <label className="fieldset-label">Email</label>
      <input type="email" className="input" placeholder="Email" />

      <label className="fieldset-label">Password</label>
      <input type="password" className="input" placeholder="Password" />

      <button className="mt-4 btn btn-neutral">Login</button>
      <button className="mt-4 btn btn-neutral">Register</button>
    </fieldset>
  )
}
