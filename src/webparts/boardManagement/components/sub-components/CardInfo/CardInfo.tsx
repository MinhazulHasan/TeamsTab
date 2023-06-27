/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './CardInfo.module.scss';
import Modal from '../Modal/Modal';
import { ChevronDown, ChevronUp, Clock, Eye, List, MoreHorizontal, Share2, ThumbsUp, Type, Unlock, Watch, X, } from "react-feather";
import Editable from '../Editable/Editable';
import Select from 'react-select';
import * as moment from 'moment';
import { ToastMessage } from '../../../../../services/toast';

const CardInfo = (props: any) => {
    const [values, setValues] = React.useState({ ...props.card });
    const [dropdownData, setDropdownData] = useState([]);
    const [showAccordion, setShowAccordion] = useState(true);
    const [devTimeLog, setDevTimeLog] = useState(0);
    const [selectedOption, setSelectedOption] = useState(
        props.card.fields.assignee !== null ?
            [{ value: props.card.fields.assignee, label: props.card.fields.assignee.displayName }] :
            null
    );

    const updateTitle = async (value: string) => {
        const res = await props.axiosService.updateIssueSummary(value, props.card.id);
        if (res) {
            const editedCard = { ...props.card };
            editedCard.fields.summary = value;
            setValues(editedCard);

            ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Card Title Update Successfully!');
        }
    }

    const updateDesc = async (value: string) => {
        const res = await props.axiosService.updateIssueDescription(value, props.card.id);
        if (res) {
            const editedCard: any = { ...props.card };
            editedCard.fields.description.content[0].content[0].text = value;
            setValues(editedCard);
            await ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Card Description Update Successfully!');
        }
    }

    const setOrUpdateDevTimeLog = async (value: string) => {
        if (Number.isNaN(parseFloat(value))) {
            ToastMessage.toastWithConfirmation('error', 'Invalid Number', 'Please enter a valid number');
            return;
        }
        const jiraIssueObj = {
            Title: props.email,
            BoardID: parseInt(props.boardId),
            IssueID: parseInt(props.card.id),
            DevTimeLog: parseFloat(value)
        }
        const res = await props.pnpService.setOrUpdateDevTimeLog(jiraIssueObj);
        if (res) setDevTimeLog(parseFloat(value));
    }

    const getDevTimeLog = async () => {
        const jiraIssueObj = {
            Title: props.email,
            BoardID: parseInt(props.boardId),
            IssueID: parseInt(props.card.id)
        }
        const timeLog = await props.pnpService.getDevTimeLog(jiraIssueObj);
        if (timeLog)
            setDevTimeLog(timeLog);
    }

    const setIssueAssigner = async (selectedOption: any) => {
        setSelectedOption(selectedOption);
        const data = await props.axiosService.setIssueAssigner(props.card.key, selectedOption.value);
        if (data) ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Member Assign Successfully!');
        else ToastMessage.toastWithConfirmation('error', 'Sorry...', 'Member Assign Failed!');
    };

    const getDropdownData = async () => {
        const data = await props.axiosService.getAssigners(props.boardKey);
        const result = data.map((e: { locale: any; accountId: any; displayName: any; }) => {
            if (e.locale) {
                return { value: e.accountId, label: e.displayName }
            }
        }).filter(Boolean);
        setDropdownData(result);
    }

    useEffect(() => {
        getDropdownData();
        getDevTimeLog();
        if (props.updateCard) props.updateCard(props.boardId, values.id, values);
    }, [values]);

    return (
        <Modal onClose={props.onClose}>
            <div className={styles.card_top}>
                <span onClick={() => props.setShowModal(false)}><X /></span>
                <span><MoreHorizontal /></span>
                <span><Share2 /></span>
                <span><ThumbsUp /></span>
                <span><Eye /></span>
                <span><Unlock /></span>
            </div>
            <div className={styles.card}>
                <div className={styles.cardinfo}>

                    <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <Type />
                        </div>
                        <div className={styles.cardinfo_box_body}>
                            <Editable
                                style={{ fontSize: "1.5rem", fontWeight: 600 }}
                                defaultValue={values?.fields?.summary}
                                text={values?.fields?.summary}
                                placeholder="Enter Title"
                                onSubmit={updateTitle}
                            />
                        </div>
                    </div>

                    <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <List />
                        </div>
                        <div className={styles.cardinfo_box_body}>
                            <Editable
                                defaultValue={
                                    props.card?.fields?.description?.content[0]?.content[0]?.text ?
                                        props.card?.fields?.description?.content[0]?.content[0]?.text :
                                        "Add a Description"
                                }
                                text={
                                    props.card?.fields?.description?.content[0]?.content[0]?.text ?
                                        props.card?.fields?.description?.content[0]?.content[0]?.text :
                                        "Add a Description"
                                }
                                placeholder="Enter description"
                                onSubmit={updateDesc}
                            />
                        </div>
                    </div>

                    <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <Clock />
                        </div>
                        <div className={styles.cardinfo_box_body}>
                            <Editable
                                defaultValue={devTimeLog}
                                text={devTimeLog ? `Dev Time: ${devTimeLog} hours` : "Enter Developers Time Log (Hours)"}
                                placeholder="Developers Time Log (Hours)"
                                onSubmit={setOrUpdateDevTimeLog}
                                buttonText="Update"
                            />
                        </div>
                    </div>

                    <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <Watch />
                        </div>
                        <div className={styles.cardinfo_box_body}>
                            <p>
                                {
                                    props.card?.fields?.timeestimate ?
                                        `Assign Time: ${props.card.fields.timeestimate} hours` :
                                        "Assign Time: Time hasn't been allocated yet"
                                }
                            </p>
                        </div>
                    </div>

                </div>

                <div className={styles.cardinfo}>

                    <div style={{ marginRight: '20px' }}>
                        <div className={styles.accrodion_header} onClick={() => setShowAccordion(!showAccordion)}>
                            <span>Details</span>
                            <span>
                                {showAccordion ? <ChevronUp /> : <ChevronDown />}
                            </span>
                        </div>

                        {
                            showAccordion &&
                            <>
                                <div className={styles.accrodion_body}>

                                    <div className={styles.cardinfo_box} style={{ marginBottom: '15px' }}>
                                        <div className={styles.cardinfo_box_title} style={{ width: '705x' }}>
                                            Assignee
                                        </div>
                                        <div className={styles.cardinfo_box_body}>
                                            <Select
                                                value={selectedOption}
                                                onChange={setIssueAssigner}
                                                options={dropdownData}
                                                // isClearable
                                                isSearchable
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.cardinfo_box} style={{ marginBottom: '5px' }}>
                                        <div className={styles.cardinfo_box_title} style={{ width: '75px' }}>
                                            Reporter
                                        </div>
                                        <div className={styles.cardinfo_box_body}>
                                            <span>{values.fields?.reporter?.displayName}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    <div className={styles.date_shocase}>
                        <p>Created {moment(values.fields.created).format("MMMM D, YYYY [at] h:mm A")}</p>
                        <p>Updated {moment(values.fields.updated).format("MMMM D, YYYY [at] h:mm A")}</p>
                    </div>

                </div>

            </div>
        </Modal>
    );
};

export default CardInfo;