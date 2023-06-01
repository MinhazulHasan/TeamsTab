/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Board.module.scss';
import { MoreHorizontal } from 'react-feather';
import Card from '../Card/Card';
import Editable from '../Editable/Editable';
import Dropdown from '../Dropdown/Dropdown';

const Board = (props: any) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    return (
        <div className={styles.board}>
            <div className={styles.board_top}>
                <p className={styles.board_top_title}>
                    To Do &nbsp;<span>2</span>
                </p>
                <div
                    className={styles.board_top_more}
                    onClick={() => setShowDropdown(true)}
                >
                    <MoreHorizontal />
                    {showDropdown && (
                        <Dropdown onClose={() => setShowDropdown(false)}>
                            <div className={styles.board_dropdown}>
                                <p onClick={() => props.removeBoard(props.board?.id)}>Delete Board</p>
                            </div>
                        </Dropdown>
                    )}
                </div>
            </div>
            <div className={`${styles.board_cards} ${styles['custom-scroll']}`}>
                {props.board?.cards?.map((item: { id: any; }) => (
                    <Card
                        key={item.id}
                        card={item}
                        removeCard={props.removeCard}
                        boardId={props.board.id}
                        handleDragEnter={props.handleDragEnter}
						handleDragEnd={props.handleDragEnd}
                    />
                ))}
                <Editable
                    displayClass={styles.board_cards_add}
                    text="Add Card"
                    placeholder="Enter card title"
                    onSubmit={(value: any) => props.addCard(value, props.board?.id)}
                />
            </div>
        </div>
    );
};

export default Board;