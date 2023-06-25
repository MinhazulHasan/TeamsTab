/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { X } from 'react-feather';
import styles from './Editable.module.scss';

const Editable = (props: any) => {
    const [isEditable, setIsEditable] = React.useState(false);
    const [inputText, setInputText] = React.useState(props.defaultValue || "");
    // Form submission method for creating issue or board
    const submission = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (inputText && props.onSubmit) {
            setInputText("");
            props.onSubmit(inputText);
        }
        setIsEditable(false);
    };

    return (
        <div className={styles.editable}>
            {isEditable ?
                <form
                    className={`${styles.editable_edit} ${props.editClass || ""}`}
                    onSubmit={submission}
                >
                    <input
                        type="text"
                        value={inputText}
                        placeholder={props.placeholder || props.text}
                        onChange={(event) => setInputText(event.target.value)}
                        autoFocus
                    />
                    <div className={styles.editable_edit_footer}>
                        <button type='submit'>{props.buttonText || 'Add'}</button>
                        <X onClick={() => setIsEditable(false)} className={styles.closeIcon} />
                    </div>
                </form>
                :
                <p
                    className={`${styles.editable_display} ${props.displayClass ? props.displayClass : ""}`}
                    onClick={() => setIsEditable(true)}
                >
                    {props.text}
                </p>
            }
        </div>
    );
};

export default Editable;