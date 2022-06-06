import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import axios from 'axios';

function Dashboard() {
    const [Mails, setMails] = useState([])
    useEffect(() => {
        (async()=>{
            fetchUser()
        })();
    }, [])

    let fetchUser = async () => {
        const token = window.localStorage.getItem("my_token")
        try {
            let mailList = await axios.get("/api/mailer/getmail",{
                headers : {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            setMails(mailList.data)
        } catch (error) {
            console.log(error);
        }
    }

    let handleDelete = async (id) => {
        const token = window.localStorage.getItem("my_token")
        try {
            let result = window.confirm("Are you sure do you wank to delete?")
            if(result) {
                await axios.delete(`https://gmail-clone-api.herokuapp.com/api/mailer/delete/${id}`,
                {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                })
                fetchUser()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Topbar />
            <div className="main_body">
                <Sidebar />
                <div className="emailList">
                    <div className="emailList_sections">
                        <div className="section section_selected">
                            <span className="material-icons">inbox</span>
                            <h4>Primary</h4>
                        </div>

                        <div className="section">
                            <span className="material-icons">people</span>
                            <h4>Social</h4>
                        </div>

                        <div className="section">
                            <span className="material-icons">local_offer</span>
                            <h4>Promotions</h4>
                        </div>
                    </div>

                    <div className="emailList_list">
                        {
                            Mails.map(elem => (
                                <div className="emailRow">
                                    <div className="emailRow_options">
                                        <input type="checkbox" />
                                        <span className="material-icons">star_border</span>
                                        <span className="material-icons">label_important</span>
                                    </div>
                                    <h2 className="emailRow_title">{elem.email}</h2>

                                    <div className="emailRow_message">
                                        <h5>{elem.subject}
                                            <span className="emailRow_description">
                                                - {elem.text}</span>
                                        </h5>
                                    </div>
                                    <p className="emailRow_time">{elem.time}</p>
                                    <span onClick={() => handleDelete(elem._id)} className="material-icons">delete</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard