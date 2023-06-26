/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Board.module.scss';
import { MoreHorizontal } from 'react-feather';
import Card from '../Card/Card';
import Editable from '../Editable/Editable';
import Dropdown from '../Dropdown/Dropdown';

const Board = (props: any) => {
    console.log("issue=",props.board?.issue)
    const [showDropdown, setShowDropdown] = React.useState(false);
    return (
        <div className={styles.board}>

            <div className={styles.board_header}>
                <p className={styles.board_header_title}>
                    {props.board?.issueTitle}
                    <span> - {props.board?.issue?.length || 0}</span>
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
                {props.board?.issue?.map((item: any) => (
                    <Card
                        key={item.id}
                        card={item}
                        boardId={props.board.issueId}
                        removeCard={props.removeCard}
                        dragEntered={props.dragEntered}
                        dragEnded={props.dragEnded}
                        updateCard={props.updateCard}
                        email={props.email}
                        siteUrl={props.siteUrl}
                        token={props.token}
                        pnpService={props.pnpService}
                        axiosService={props.axiosService}
                    />
                ))}
                <Editable
                    displayClass={styles.board_add_card}
                    editClass={styles.board_add_card_edit}
                    text="+ Add Card"
                    placeholder="Enter card title"
                    onSubmit={(value: any) => props.addCard(props.board?.issueTitle, value)}
                />
            </div>

        </div>
    );
};

export default Board;