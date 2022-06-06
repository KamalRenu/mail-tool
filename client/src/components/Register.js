import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required').min(5, 'Name must atleast contain 5 characters'),
      email: yup.string().email('Enter valid email').required('Email is required'),
      password: yup.string().required('Please Enter your password').min(5, 'Password must contain mininum 5 character')
    }),
    onSubmit: async (values, onSubmitProps) => {
      let loginData, tostify
      try {
        loginData = await axios.post("/api/user/registerUser", values)
        tostify = loginData.data.success ? toast.success : toast.error
        loginData = loginData.data.message
        navigate("/")
      } catch (error) {
        console.log(error)
        loginData = error.response.data.error;
        tostify = toast.error
      }
      tostify(loginData, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <img src="https://www.nicepng.com/png/detail/207-2076661_email-logo-transparent-www-mail-logo-png-transparent.png" alt="logo" width="100" />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  <form onSubmit={formik.handleSubmit} className="needs-validation" novalidate="" autocomplete="off">
                    <div className="mb-3">
                      <label className="mb-2 text-muted" for="name">Name</label>
                      <input id="name" type="text" className="form-control" name="name" onChange={formik.handleChange} value={formik.values.name} required autofocus />
                      {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                      <div className="invalid-feedback">
                        Name is required
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" for="email">E-Mail Address</label>
                      <input id="email" type="email" className="form-control" name="email" onChange={formik.handleChange} value={formik.values.email} required />
                      {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                      <div className="invalid-feedback">
                        Email is invalid
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" for="password">Password</label>
                      <input id="password" type="password" className="form-control" name="password" onChange={formik.handleChange} value={formik.values.password} required />
                      {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <p className="form-text text-muted mb-3">
                      By registering you agree with our terms and condition.
                    </p>

                    <div className="align-items-center d-flex">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account? <Link to="/" className="text-dark">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register