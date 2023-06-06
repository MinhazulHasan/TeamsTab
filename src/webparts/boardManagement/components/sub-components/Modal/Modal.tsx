/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Modal.module.scss';

const Modal = (props: any) => {
    return (
        <div className={styles.modal} onClick={() => (props.onClose ? props.onClose() : "")}>
            <div
                className={`${styles.modal_content} ${styles.custom_scroll}`}
                onClick={(event) => event.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;