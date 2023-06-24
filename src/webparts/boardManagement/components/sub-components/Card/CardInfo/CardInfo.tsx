/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CardInfo.module.scss';
import Modal from '../../Modal/Modal';
import { ChevronDown, ChevronUp, Eye, List, MoreHorizontal, Share2, ThumbsUp, Type, Unlock, X, } from "react-feather";
import Editable from '../../Editable/Editable';
import Select from 'react-select';
import * as moment from 'moment';
import axios from 'axios';
import { ToastMessage } from '../../../../assets/Toast/toast';

const CardInfo = (props: any) => {
    // const colors: Array<string> = ["#a8193d", "#4fcc25", "#1ebffa", "#8da377", "#9975bd", "#cf61a1", "#240959"];

    // const [selectedColor, setSelectedColor] = React.useState(null);
    const [values, setValues] = React.useState({ ...props.card });

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
    const updateDesc = async(value: string) => {
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

    const [dropdownData, setDropdownData] = React.useState([]);

    const [selectedOption, setSelectedOption] = React.useState(props.card.fields.assignee !== null ? [{ value: props.card.fields.assignee, label: props.card.fields.assignee.displayName }] : null);
    const [showAccordion, setShowAccordion] = React.useState(true);

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

    // const addLabel = (label: any) => {
    //     const index = values.labels.findIndex((item: { text: any; }) => item.text === label.text);
    //     if (index > -1) return;
    //     setSelectedColor("");
    //     setValues({
    //         ...values,
    //         labels: [...values.labels, label],
    //     });
    // };

    // const removeLabel = (label: { text: any; }) => {
    //     const tempLabels = values.labels.filter((item: { text: any; }) => item.text !== label.text);

    //     setValues({
    //         ...values,
    //         labels: tempLabels,
    //     });
    // };

    // const addTask = (value: any) => {
    //     const task = {
    //         id: Date.now() + Math.random() * 2,
    //         completed: false,
    //         text: value,
    //     };
    //     setValues({
    //         ...values,
    //         tasks: [...values.tasks, task],
    //     });
    // };

    // const removeTask = (id: any) => {
    //     const tasks = [...values.tasks];
    //     const tempTasks = tasks.filter((item) => item.id !== id);
    //     setValues({
    //         ...values,
    //         tasks: tempTasks,
    //     });
    // };

    // const updateTask = (id: any, value: boolean) => {
    //     const tasks = [...values.tasks];
    //     const index = tasks.findIndex((item) => item.id === id);
    //     if (index < 0) return;
    //     tasks[index].completed = value;
    //     setValues({
    //         ...values,
    //         tasks,
    //     });
    // };

    // const calculatePercent = () => {
    //     if (!values.tasks?.length) return 0;
    //     const completed = values.tasks?.filter((item: { completed: any; }) => item.completed)?.length;
    //     return (completed / values.tasks?.length) * 100;
    // };

    // const updateDate = (date: string) => {
    //     if (!date) return;
    //     setValues({ ...values, date });
    // };

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

    React.useEffect(() => {
        console.log(props);
        getDropdownData();
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

                    {/* <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <Calendar />
                            <p>Date</p>
                        </div>
                        <div className={styles.cardinfo_box_body}>
                            <input
                                type="date"
                                defaultValue={values.fields.updated.split('T')[0]}
                                min={new Date().toISOString().substr(0, 10)}
                                onChange={(event) => updateDate(event.target.value)}
                            />
                        </div>
                    </div> */}

                    {/* <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <Tag />
                        </div>
                        <div className={styles.cardinfo_box_body}>
                            <div className={styles.cardinfo_box_labels}>
                                {values.labels?.map((item: { color?: any; text: any; }, index: React.Key) => (
                                    <label
                                        key={index}
                                        style={{ backgroundColor: item.color, color: "#fff" }}
                                    >
                                        {item.text}
                                        <X onClick={() => removeLabel(item)} />
                                    </label>
                                ))}
                            </div>
                            <ul style={{ margin: '0' }}>
                                {colors.map((item, index) => (
                                    <li
                                        key={index + item}
                                        style={{ backgroundColor: item }}
                                        className={selectedColor === item ? `${styles.li_active}` : ""}
                                        onClick={() => setSelectedColor(item)}
                                    />
                                ))}
                            </ul>
                            <Editable
                                text="Add Label"
                                placeholder="Enter label text"
                                onSubmit={(value: any) =>
                                    addLabel({ color: selectedColor, text: value })
                                }
                            />
                        </div>
                    </div> */}

                    {/* <div className={styles.cardinfo_box}>
                        <div className={styles.cardinfo_box_title}>
                            <CheckSquare />
                            <p>Sub-Tasks</p>
                        </div>
                        <div className={styles.cardinfo_box_progress_bar}>
                            <div
                                className={styles.cardinfo_box_progress}
                                style={{
                                    width: `${calculatePercent()}%`,
                                    backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                                }}
                            />
                        </div>
                        <div className={styles.cardinfo_box_task_list}>
                            {values.features?.subtasks?.map((item: { id: React.Key; completed: boolean; text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => (
                                <div key={item.id} className={styles.cardinfo_box_task_checkbox}>
                                    <input
                                        type="checkbox"
                                        defaultChecked={item.completed}
                                        onChange={(event) => updateTask(item.id, event.target.checked)}
                                    />
                                    <p className={item.completed ? `${styles.completed}` : ""}>{item.text}</p>
                                    <Trash onClick={() => removeTask(item.id)} />
                                </div>
                            ))}
                        </div>
                        <Editable
                            text={"Add a Task"}
                            placeholder="Enter task"
                            onSubmit={addTask}
                        />
                    </div> */}
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
                                                isClearable
                                                isSearchable
                                            />
                                        </div>
                                    </div>

                                    {/* <div className={styles.cardinfo_box} style={{ marginBottom: '1' }}>
                                        <div className={styles.cardinfo_box_title} style={{ width: '71' }}>
                                            Labels
                                        </div>
                                        <div className={styles.cardinfo_box_body}>
                                            <Select
                                                value={selectedOption}
                                                onChange={handleChange}
                                                options={dropdownData}
                                                isClearable
                                                isSearchable
                                            />
                                        </div>
                                    </div> */}

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