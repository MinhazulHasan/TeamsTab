/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Chip.module.scss';
import { X } from 'react-feather';

const Chip = (props: any) => {
    return (
        <div className={styles.chip} style={{backgroundColor: props.color}}>
            {props.text}
            {props.close && <X className={styles.chip_svg} onClick={props.onClose ? props.onClose() : ""} />}
        </div>
    );
};

export default Chip;