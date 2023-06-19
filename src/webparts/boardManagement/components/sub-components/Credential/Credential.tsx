/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import Modal from '../Modal/Modal';
import styles from './Credential.module.scss';
// import loginImg from '../../../assets/jira.png';

const Credential = (props: any) => {
    const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

    const onSubmit = () => {
        if(username === "" || password === "") return;
        else {
            props.setHasCredential(true);
        }
    }

    return (
        <Modal className={styles.credential_form_div}>
            <div>
                <form className={styles.credential_form}>
                    <img src={require('../../../assets/jira.png')} alt="Log In" />
                    <div className={styles.formcontainer}>
                    <hr />
                    <div className={styles.container}>
                        <label htmlFor='username'><strong>Username</strong></label>
                        <input onChange={(e)=>setUsername(e.target.value)} className={styles.input_field} type="text" placeholder="Enter Username" name="uname" id='username' required />
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input onChange={(e)=>setPassword(e.target.value)} className={styles.input_field} type="password" placeholder="Enter Password" name="psw" id='password' required />
                        </div>
                            <button className={styles.submit_btn} onClick={onSubmit}>Login</button>
                        </div>
                </form>
            </div>
        </Modal>
    );
};

export default Credential;