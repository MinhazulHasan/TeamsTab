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

            <div className={styles.board_header}>
                <p className={styles.board_header_title}>
                    {props.board?.name}
                    <span> - {props.board?.cards?.length || 0}</span>
                </p>
                <div
                    className={styles.board_header_title_more}
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowDropdown(true);
                    }}
                >
                    <MoreHorizontal />
                    {showDropdown && (
                        <Dropdown class={styles.board_dropdown} onClose={() => setShowDropdown(false)}>
                            <p onClick={() => props.removeBoard()}>
                                Delete Board
                            </p>
                        </Dropdown>
                    )}
                </div>
            </div>

            <div className={`${styles.board_cards} ${styles.custom_scroll}`}>
                {props.board?.cards?.map((item: any) => (
                    <Card
                        key={item.id}
                        card={item}
                        boardId={props.board.id}
                        removeCard={props.removeCard}
                        dragEntered={props.dragEntered}
                        dragEnded={props.dragEnded}
                        updateCard={props.updateCard}
                    />
                ))}
                <Editable
                    displayClass={styles.board_add_card}
                    editClass={styles.board_add_card_edit}
                    text="+ Add Card"
                    placeholder="Enter card title"
                    onSubmit={(value: any) => props.addCard(props.board?.id, value)}
                />
            </div>

        </div>
    );
};

export default Board;