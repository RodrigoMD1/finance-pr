import React from 'react'

export const Register = () => {
  return (
    <fieldset className="p-4 border fieldset w-xs bg-base-200 border-base-300 rounded-box ">
      <legend className="fieldset-legend">Register</legend>

      <label className="fieldset-label">Email</label>
      <input type="email" className="input" placeholder="Email" />

      <label className="fieldset-label">Name</label>
      <input type="name" className="input" placeholder="Name" />

      <label className="fieldset-label">Password</label>
      <input type="password" className="input" placeholder="Password" />

      <button className="mt-4 btn btn-neutral">Register</button>
      <button className="mt-4 btn btn-neutral">Login</button>
    </fieldset>
  )
}
