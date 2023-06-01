/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Card.module.scss';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Chip from '../Chip/Chip';
import Dropdown from '../Dropdown/Dropdown';

const Card = (props: any) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    return (
        <div
            className={styles.card}
            draggable
            onDragEnter={()=>props.handleDragEnter(props.card.id, props.boardId)}
            onDragEnd={()=>props.handleDragEnd(props.card.id, props.boardId)}
        >
            <div className={styles.card_top}>
                <div className={styles.card_top_labels}>
                    {props.card?.labels?.map((item: { text: string; color: string; }, index: any) =>
                        <Chip key={index} text={item.text} color={item.color} close />
                    )}
                </div>

                <div
                    className={styles.card_top_more}
                    onClick={() => setShowDropdown(true)}
                >
                    <MoreHorizontal />
                    {showDropdown && (
                        <Dropdown onClose={() => setShowDropdown(false)}>
                            <div className={styles.card_dropdown}>
                                <p onClick={()=>props.removeCard(props.card.id, props.boardId)}>Delete Cart</p>
                            </div>
                        </Dropdown>
                    )}
                </div>


            </div>
            <div className={styles.card_title}>
                {props.card?.title}
            </div>
            <div className={styles.card_footer}>
                {
                    props.card?.date &&
                    <p><Clock />&nbsp;{props.card?.date}</p>
                }
                <p>
                    <CheckSquare />&nbsp;
                    1/4
                </p>
            </div>
        </div>
    );
};

export default Card;