/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import './Navbar.scss';
import Swal from 'sweetalert2';

const Navbar = (props: any) => {
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
                <a><span onClick={() => props.setPage({ Projects: true, SingleProject: false })}>Projects</span></a>
                <a><span onClick={handleLogOut}>LogOut</span></a>
            </div>
        </div>
    );
};

export default Navbar;