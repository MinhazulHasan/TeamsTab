/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import Modal from '../Modal/Modal';
import styles from './Credential.module.scss';
// import loginImg from '../../../assets/jira.png';

const Credential = (props: any) => {
    const [email, setEmail] = React.useState("");
	const [token, setToken] = React.useState("");

    const onSubmit = () => {
        if(email === "" || token === "") return;
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
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input onChange={(e)=>setEmail(e.target.value)} className={styles.input_field} type="email" placeholder="Enter Email" name="email" id='email' required />
                        
                        <label htmlFor='token'><strong>API Token</strong></label>
                        <input onChange={(e)=>setToken(e.target.value)} className={styles.input_field} type="text" placeholder="Enter Token" name="token" id='token' required />
                        </div>
                            <button className={styles.submit_btn} onClick={onSubmit}>Login</button>
                        </div>
                </form>
            </div>
        </Modal>
    );
};

export default Credential;