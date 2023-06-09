/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Card.module.scss';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import CardInfo from '../CardInfo/CardInfo';

const Card = (props: any) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const { card } = props;
    const { date, tasks, labels } = props.card;

    const formatDate = (value: string | number | Date) => {
        if (!value) return "";
        const date = new Date(value);
        if (!date) return "";

        const months = ["Jan", "Feb", "Mar", "Aprl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

        const day = date.getDate();
        const month = months[date.getMonth()];
        return day + " " + month;
    };

    
    return (
        <>
            {
                showModal &&
                <CardInfo
                    onClose={() => setShowModal(false)}
                    card={props.card}
                    boardId={props.boardId}
                    updateCard={props.updateCard}
                    email={props.email}
                    siteUrl={props.siteUrl}
                    token={props.token}
                    setShowModal={setShowModal}
                    pnpService={props.pnpService}
                    axiosService={props.axiosService}
                />
            }
            <div
                className={styles.card}
                draggable
                onDragEnd={() => props.dragEnded(props.boardId, card)}
                onDragEnter={() => props.dragEntered(props.boardId, card)}
                onClick={() => setShowModal(true)}
            >
                <div className={styles.card_top}>
                    <div className={styles.card_top_labels}>
                        {labels?.map((item: { text: string; color: string; }, index: any) => (
                            <label key={index} style={{ backgroundColor: item.color }}>
                                {item.text}
                            </label>
                        ))}
                    </div>

                    <div
                        className={styles.card_top_more}
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowDropdown(true);
                        }}
                    >
                        <MoreHorizontal />
                        {showDropdown && (
                            <Dropdown className={styles.board_dropdown} onClose={() => setShowDropdown(false)}>
                                <p onClick={() => props.removeCard(props.boardId, card.id, card.key)}>
                                    Delete Card
                                </p>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className={styles.card_title}>{card?.fields?.summary}</div>
                <div style={{ color: 'gray' }}>{card?.key}</div>
                <div className={styles.card_footer}>
                    {date && (
                        <p className={styles.card_footer_item}>
                            <Clock className={styles.card_footer_icon} />
                            {formatDate(date)}
                        </p>
                    )}
                    {tasks && tasks?.length > 0 && (
                        <p className={styles.card_footer_item}>
                            <CheckSquare className={styles.card_footer_icon} />
                            {tasks?.filter((item: any) => item.completed)?.length}/{tasks?.length}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;