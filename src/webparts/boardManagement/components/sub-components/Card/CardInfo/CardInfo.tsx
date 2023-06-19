/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CardInfo.module.scss';
import Modal from '../../Modal/Modal';
import { Calendar, CheckSquare, List, Tag, Trash, Type, X, } from "react-feather";
import Editable from '../../Editable/Editable';

const CardInfo = (props: any) => {
    console.log(props)
    const colors: Array<string> = ["#a8193d", "#4fcc25", "#1ebffa", "#8da377", "#9975bd", "#cf61a1", "#240959"];

    const [selectedColor, setSelectedColor] = React.useState(null);
    const [values, setValues] = React.useState({ ...props.card });

    const updateTitle = (value: string) => setValues({ ...values, title: value });
    const updateDesc = (value: string) => setValues({ ...values, desc: value });

    const addLabel = (label: any) => {
        const index = values.labels.findIndex((item: { text: any; }) => item.text === label.text);
        if (index > -1) return;
        setSelectedColor("");
        setValues({
            ...values,
            labels: [...values.labels, label],
        });
    };

    const removeLabel = (label: { text: any; }) => {
        const tempLabels = values.labels.filter((item: { text: any; }) => item.text !== label.text);

        setValues({
            ...values,
            labels: tempLabels,
        });
    };

    const addTask = (value: any) => {
        const task = {
            id: Date.now() + Math.random() * 2,
            completed: false,
            text: value,
        };
        setValues({
            ...values,
            tasks: [...values.tasks, task],
        });
    };

    const removeTask = (id: any) => {
        const tasks = [...values.tasks];
        const tempTasks = tasks.filter((item) => item.id !== id);
        setValues({
            ...values,
            tasks: tempTasks,
        });
    };

    const updateTask = (id: any, value: boolean) => {
        const tasks = [...values.tasks];
        const index = tasks.findIndex((item) => item.id === id);
        if (index < 0) return;
        tasks[index].completed = value;
        setValues({
            ...values,
            tasks,
        });
    };

    const calculatePercent = () => {
        if (!values.tasks?.length) return 0;
        const completed = values.tasks?.filter((item: { completed: any; }) => item.completed)?.length;
        return (completed / values.tasks?.length) * 100;
    };

    const updateDate = (date: string) => {
        if (!date) return;
        setValues({ ...values, date });
    };

    React.useEffect(() => {
        if (props.updateCard) props.updateCard(props.boardId, values.id, values);
    }, [values]);

    return (
        <Modal onClose={props.onClose}>
            <div className={styles.cardinfo}>
                <div className={styles.cardinfo_box}>
                    <div className={styles.cardinfo_box_title}>
                        <Type />
                        <p>Title</p>
                    </div>
                    <div className={styles.cardinfo_box_body}>
                        <Editable
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
                        <p>Description</p>
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
                </div>

                <div className={styles.cardinfo_box}>
                    <div className={styles.cardinfo_box_title}>
                        <Tag />
                        <p>Labels</p>
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
                        <ul>
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
                </div>

                <div className={styles.cardinfo_box}>
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
                </div>
            </div>
        </Modal>
    );
};

export default CardInfo;