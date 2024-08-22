import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { auth } from '../../redux/AuthActioncreaters'
import { connect } from 'react-redux'
import { replace, useNavigate } from 'react-router-dom'


const mapDispatchToProps=dispatch=>{
  return{
  auth:(email,password,mode)=>dispatch(auth(email,password,mode))
  }
}

const mapStateToProps=state=>{
  return{
    token:state.token
  }
}


const Auth = (props) => {
  const [mode, setMode] = useState('sign up')

  const nevigate=useNavigate()

  useEffect(()=>{
    if (props.token){
      nevigate('/' ,{replace:true})
    }
  })

  return (
    <div className='d-flex justify-content-center border' style={{ marginTop: "20px" }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) =>{
          
          props.auth(values.email,values.password,mode)
        }
        }
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 4) {
            errors.password = 'Must be at least 4 characters!';
          }

          if (mode === "sign up") {
            if (!values.passwordConfirm) {
              errors.passwordConfirm = 'Required';
            } else if (values.password !== values.passwordConfirm) {
              errors.passwordConfirm = 'Passwords do not match!';
            }
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <div className='w-50' style={{ marginTop: '40px' }}>
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  id="form2Example1"
                  className="form-control"
                />
                <label className="form-label" htmlFor="form2Example1">Email address</label>
                <br />
                <span style={{ color: "red" }}>{errors.email}</span>
              </div>

              {/* Password input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="password"
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  id="form2Example2"
                  className="form-control"
                />
                <label className="form-label" htmlFor="form2Example2">Password</label>
                <br />
                <span style={{ color: "red" }}>{errors.password}</span>
              </div>

              {/* Password Confirm input */}
              {mode === 'sign up' ? (
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    name='passwordConfirm'
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    id="form2Example3"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form2Example3">Password Confirm</label>
                  <br />
                  <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                </div>
              ) : null}

              {/* Submit button */}
              <button
                type="submit"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-block mb-4"
              >
                {mode === 'sign in' ? 'Sign in' : 'Sign up'}
              </button>

              {/* Switch mode button */}
              <div className="text-center">
                Switch to
                <button
                  type="button"
                  onClick={() => setMode(mode === 'sign up' ? 'sign in' : 'sign up')}
                  style={{ border: 'none', background: 'white', color: 'blue' }}
                >
                  {mode === 'sign up' ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
