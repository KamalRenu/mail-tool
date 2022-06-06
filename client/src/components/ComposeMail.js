import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Compose.css';

function ComposeMail() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            subject: '',
            text: ''
        },
        onSubmit: async (values) => {
            const token = window.localStorage.getItem("my_token")
            try {
                await axios.post("/api/mailer/send", values, {
                    headers : {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS'
                    }
                })
                navigate("/dashboard")
            } catch (error) {
                console.log(error)
            }
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="col-lg-8 messege-right p-3 border">
                <div className="row m-0">
                    <div className="col-lg-12 bg-dark text-white">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1 className="pt-2">New Message</h1>
                            </div>
                            <div className="col-lg-6 pt-2 message-box-icon">
                                <span className="pull-right">
                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                    <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 p-0 message-box-input">
                        <div>
                            <div className="form-group">
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="To" onChange={formik.handleChange} value={formik.values.email} />
                                <input type="text" name="subject" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Subject" onChange={formik.handleChange} value={formik.values.subject} />
                                <textarea name="text" className="form-control" id="exampleFormControlTextarea1" rows="6" onChange={formik.handleChange} value={formik.values.text}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="co-lg-12 message-box-last-content p-2">
                        <button type="submit" className="btn btn-primary btn-sm pl-3 pr-3">SEND</button>
                        <span>
                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                            <i className="fa fa-file" aria-hidden="true"></i>
                            <i className="fa fa-picture-o" aria-hidden="true"></i>
                            <i className="fa fa-link" aria-hidden="true"></i>
                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                        </span>
                        <span className="pull-right">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ComposeMail