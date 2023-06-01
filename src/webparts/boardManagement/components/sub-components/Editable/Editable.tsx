/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { X } from 'react-feather';
import styles from './Editable.module.scss';

const Editable = (props: any) => {
    const [showEdit, setShowEdit] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    return (
        <div className={styles.editable}>
            {
                showEdit ?
                    <form
                        className={`${styles.editable_edit} ${props.editClass || ""}`}
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (props.onSubmit) props.onSubmit(inputValue);
                            setShowEdit(false);
                            setInputValue("");
                        }}
                    >
                        <input
                            autoFocus
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={props.placeholder || "Enter Item"}
                        />
                        <div className={styles.editable_edit_footer}>
                            <button type='submit'>{props.buttonText || 'Add'}</button>
                            <X onClick={()=>setShowEdit(false)} />
                        </div>
                    </form>
                    :
                    <p className={`${styles.editable_display} ${props.displayClass || ""}`} onClick={()=>setShowEdit(true)}>{props.text || 'Add Item'}</p>
            }
        </div>
    );
};

export default Editable;