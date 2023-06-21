/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import Modal from '../Modal/Modal';
import styles from './Credential.module.scss';
// import loginImg from '../../../assets/jira.png';

const Credential = (props: any) => {

    const onSubmit = () => {
        if(props.email === "" || props.siteUrl === "" || props.token === "") return;
        else {
            localStorage.setItem("email", props.email );
            localStorage.setItem("siteUrl", props.siteUrl );
            localStorage.setItem("token", props.token );
            props.setHasCredential(true);
        }
    }

    const checkCredential = (userEmail: string, userSiteUrl: string, userToken: string) => {
        if(userEmail === null || userSiteUrl === null || userToken === null) return;
        else {
            props.setEmail(userEmail);
            props.setSiteUrl(userSiteUrl);
            props.setToken(userToken);
            props.setHasCredential(true);
        }
    }

    React.useEffect(() => {
        const userEmail = localStorage.getItem("email");
        const userSiteUrl = localStorage.getItem("siteUrl");
        const userToken = localStorage.getItem("token");

        checkCredential(userEmail, userSiteUrl, userToken);
    }, [])


    return (
        <Modal className={styles.credential_form_div}>
            <div>
                <form className={styles.credential_form}>
                    <img src={require('../../../assets/jira.png')} alt="Log In" />
                    <div className={styles.formcontainer}>
                    <hr />
                    <div className={styles.container}>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input onChange={(e)=>props.setEmail(e.target.value)} className={styles.input_field} type="email" placeholder="Enter Email" name="email" id='email' required />

                        <label htmlFor='siteUrl'><strong>Site URL</strong></label>
                        <input onChange={(e)=>props.setSiteUrl(e.target.value)} className={styles.input_field} type="text" placeholder="Enter Site URL" name="siteUrl" id='siteUrl' required />
                        
                        <label htmlFor='token'><strong>API Token</strong></label>
                        <input onChange={(e)=>props.setToken(e.target.value)} className={styles.input_field} type="text" placeholder="Enter Token" name="token" id='token' required />
                        </div>
                            <button className={styles.submit_btn} onClick={onSubmit}>Login</button>
                        </div>
                </form>
            </div>
        </Modal>
    );
};

export default Credential;