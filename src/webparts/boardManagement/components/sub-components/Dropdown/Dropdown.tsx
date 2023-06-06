/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Dropdown.module.scss';

const Dropdown = (props: any) => {
    const dropdownRef: any = React.useRef();
    const handleClick = (event: { target: any; }) => {
        if (dropdownRef && !dropdownRef?.current?.contains(event?.target) && props.onClose)
            props.onClose();
    }

    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return (
        <div ref={dropdownRef} className={`${styles.dropdown} ${props.class ? props.class : ""}`}>
            {props.children}
        </div>
    );
};

export default Dropdown;