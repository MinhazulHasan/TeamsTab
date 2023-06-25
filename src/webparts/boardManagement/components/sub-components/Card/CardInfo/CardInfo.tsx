/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './CardInfo.module.scss';
import Modal from '../../Modal/Modal';
import { ChevronDown, ChevronUp, Clock, Eye, List, MoreHorizontal, Share2, ThumbsUp, Type, Unlock, Watch, X, } from "react-feather";
import Editable from '../../Editable/Editable';
import Select from 'react-select';
import * as moment from 'moment';
import axios from 'axios';
import { ToastMessage } from '../../../../assets/Toast/toast';

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

        const editedCard = { ...props.card };
        editedCard.fields.summary = value;
        setValues(editedCard);

        const data = JSON.stringify({
            "email": props.email,
            "url": props.siteUrl,
            "token": props.token,
            "issueIdOrKey": props.card.key,
            "fields": {
                "summary": value,
                "description": ""
            }
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://proxy-skip-app-production.up.railway.app/set-assigner',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const res = await axios.request(config);
            console.log(res.data)
            // if (res.data) ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Card Title Update Successfully!');
            // else ToastMessage.toastWithConfirmation('error', 'Sorry...', 'Card Title Update Failed!');
        }
        catch (err) {
            ToastMessage.toastWithConfirmation('error', 'Card Title Update Failed!', err);
        }

    }
    const updateDesc = async (value: string) => {
        const editedCard = { ...props.card };
        editedCard.fields.description = value;
        setValues(editedCard);

        const data = JSON.stringify({
            "email": props.email,
            "url": props.siteUrl,
            "token": props.token,
            "issueIdOrKey": props.card.key,
            "fields": {
                "summary": props.card.fields.summary,
                "description": value
            }
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://proxy-skip-app-production.up.railway.app/set-assigner',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const res = await axios.request(config);
            console.log(res.data)
            // if (res.data) ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Card Title Update Successfully!');
            // else ToastMessage.toastWithConfirmation('error', 'Sorry...', 'Card Title Update Failed!');
        }
        catch (err) {
            ToastMessage.toastWithConfirmation('error', 'Card Title Update Failed!', err);
        }
    }

    const setOrUpdateDevTimeLog = async (value: string) => {
        if(Number.isNaN(parseFloat(value))) {
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
        if(res) setDevTimeLog(parseFloat(value));
    }

    const getDevTimeLog = async () => {
        const jiraIssueObj = {
            Title: props.email,
            BoardID: parseInt(props.boardId),
            IssueID: parseInt(props.card.id)
        }
        const timeLog = await props.pnpService.getDevTimeLog(jiraIssueObj);
        if(timeLog)
            setDevTimeLog(timeLog);
    }

    const handleChange = async (selectedOption: any) => {
        console.log(selectedOption)
        setSelectedOption(selectedOption);

        try {
            const data = JSON.stringify({
                "email": props.email,
                "url": props.siteUrl,
                "token": props.token,
                "key": props.card.key,
                "assignee": selectedOption.value
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/set-assigner',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios.request(config);
            if (res.data) ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Member Assign Successfully!');
            else ToastMessage.toastWithConfirmation('error', 'Sorry...', 'Member Assign Failed!');

        } catch (err) {
            ToastMessage.toastWithConfirmation('error', 'Member Assign Failed!', err);
        }
    };

    const getDropdownData = async () => {
        try {
            const data = JSON.stringify({
                "key": props.boardKey,
                "email": props.email,
                "url": props.siteUrl,
                "token": props.token
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/get-assigner',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios.request(config);
            const result = res.data.map((e: { locale: any; accountId: any; displayName: any; }) => {
                if (e.locale) {
                    return { value: e.accountId, label: e.displayName }
                }
            }).filter(Boolean);
            setDropdownData(result);

        } catch (err) {
            console.log(err)
        }
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
                                defaultValue={values.fields.summary}
                                text={values.fields.summary}
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
                                defaultValue={values.fields.description}
                                text={values.fields.description || "Add a Description"}
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
                                                onChange={handleChange}
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