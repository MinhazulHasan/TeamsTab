/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import './Navbar.scss';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ToastMessage } from '../../../assets/Toast/toast';

const Navbar = (props: any) => {
    const [flag, setFlag] = React.useState(false);
    // LogOut and Removed all the credentials from local storage
    const handleLogOut = () => {
        Swal.fire({
            icon: "question",
            title: "Are you sure to LogOut?",
            text: "You will be lost your credentials",
            toast: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(result => {
            if (result.isConfirmed) {
                localStorage.removeItem("email");
                localStorage.removeItem("siteUrl");
                localStorage.removeItem("token");
                props.setHasCredential(false);
            }
        });

    }

    const handleSyncData = async () => {
        let offlineData = localStorage.getItem("syncData");
        offlineData = JSON.parse(offlineData);
        console.log("offline daoiujoiujoikujoiphuy", typeof offlineData, offlineData);

       

        for (let i = 0; i < offlineData.length; i++) {
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/create-issue',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: offlineData[i]
            };

            const response = await axios.request(config);

            if((i === (offlineData.length-1)) && response.status === (201 || 200)){
                setFlag(true);
                localStorage.removeItem("syncData");
                ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'All Issue has been Synced!');
            }
        }
    }

    const syncStatus = React.useMemo(() => {
        let status = false;
        let offlineData = localStorage.getItem("syncData");
        offlineData = JSON.parse(offlineData);
        console.log(offlineData);

        if (offlineData && offlineData.length > 0) {
            status = true;
        }
        else {
            status = false;
        }

        if(flag){
            status = true;
        }

        return status;
    }, [window, flag]);

    console.log("NAVBAR CALLING:", syncStatus)


    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    <img src={require("../../../assets/bs-23.svg")} alt="" />
                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="nav-links">
                <a><span>{props.currentUser}</span></a>
                {
                    syncStatus  === true && !flag ? <a><span onClick={handleSyncData}>{'Sync Issues'}</span></a> : <></>
                }
                <a><span onClick={() => props.setPage({ Projects: true, SingleProject: false })}>Projects</span></a>
                <a><span onClick={handleLogOut}>LogOut</span></a>
            </div>
        </div>
    );
};

export default Navbar;