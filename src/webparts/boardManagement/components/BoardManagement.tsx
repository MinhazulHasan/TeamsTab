/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import styles from './BoardManagement.module.scss';
import { IBoardManagementProps, JiraIssue } from './IBoardManagementProps';
import Board from './sub-components/Board/Board';
import Editable from './sub-components/Editable/Editable';
import axios from 'axios';
// import { escape } from '@microsoft/sp-lodash-subset';

const BoardManagement: React.FC<IBoardManagementProps> = (props: IBoardManagementProps) => {
	const [boards, setBoards] = useState([]);
	const [targetCard, setTargetCard] = React.useState({ bId: "", card: {id: ""} });
	const addboardHandler = (name: string) => {
		const tempBoards = [...boards];
		tempBoards.push({
			id: Date.now() + Math.random() * 2,
			title: name,
			cards: [],
		});
		setBoards(tempBoards);
	};

	const removeBoard = (id: string) => {
		const index = boards.findIndex((item: { id: string; }) => item.id === id);
		if (index < 0) return;

		const tempBoards = [...boards];
		tempBoards.splice(index, 1);
		setBoards(tempBoards);
	};

	const addCardHandler = async (issueTitle: string, title: string) => {
		const inputData = {
			fields: {
				project: {
					key: "JIRATEAMS"
				},
				summary: title,
				description: title,
				issuetype: {
					name: "Task"
				}
			}
		}
		const config = {
			method: 'post',
			url: 'https://proxy-skip-app-production.up.railway.app/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(inputData)
		};
		try {
			const response = await axios.request(config);
			if (response.data.self) {
				const newIssue = {
					id: response.data.id,
					key: response.data.key,
					self: response.data.self,
					fields: {
						project: {
							key: "JIRATEAMS"
						},
						summary: title,
						description: title,
						issuetype: {
							name: "Task"
						}
					},
				}
				let newBoard: {issueTitle: string; issue: any[]}[] = [...boards];
				newBoard[0].issue.push(newIssue);
				console.log(newBoard)
				setBoards(newBoard);
			}
			else {
				alert("Error in creating card");
			}
		}
		catch (error) {
			console.error("error:", error);
		}
	};

	const removeCard = (bid: string, cid: string) => {
		const index = boards.findIndex((item: { issueId: string; }) => item.issueId === bid);
		if (index < 0) return;

		const tempBoards = [...boards];
		const cards = tempBoards[index].issue;

		const cardIndex = cards.findIndex((item: { id: string; }) => item.id === cid);
		if (cardIndex < 0) return;

		cards.splice(cardIndex, 1);
		setBoards(tempBoards);
	};

	const dragEntered = (bId: string, card: {id: string}) => {
		if (targetCard.card.id === card.id) return;
		setTargetCard({ bId, card });
		console.log("Drag Enter:\n",{ bId, card })
	}

	const dragEnded = (bId: string, card: {id: string}) => {
		let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;

		s_boardIndex = boards.findIndex((item: { issueId: string; }) => item.issueId === bId);
		if (s_boardIndex < 0) return;

		s_cardIndex = boards[s_boardIndex]?.issue?.findIndex((item: { id: string; }) => item.id === card.id);
		if (s_cardIndex < 0) return;

		t_boardIndex = boards.findIndex((item: { issueId: string; }) => item.issueId === targetCard.bId);
		if (t_boardIndex < 0) return;

		t_cardIndex = boards[t_boardIndex]?.issue?.findIndex((item: { id: string; }) => item.id === targetCard.card.id);
		if (t_cardIndex < 0) return;

		const tempBoards = [...boards];
		const sourceCard = tempBoards[s_boardIndex].issue[s_cardIndex];
		tempBoards[s_boardIndex].issue.splice(s_cardIndex, 1);
		tempBoards[t_boardIndex].issue.splice(t_cardIndex, 0, sourceCard);
		setBoards(tempBoards);

		setTargetCard({ bId: "", card: {id: ""} });
	}

	const updateCard = (bId: string, cId: string, card: any) => {
		const index = boards.findIndex((item: { id: string; }) => item.id === bId);
		if (index < 0) return;
		const tempBoards = [...boards];
		const cards = tempBoards[index].cards;
		const cardIndex = cards.findIndex((item: { id: string; }) => item.id === cId);
		if (cardIndex < 0) return;
		tempBoards[index].cards[cardIndex] = card;
		setBoards(tempBoards);
	};

	const getJiraData = useCallback(async () => {
		try {
			const res = await axios('https://proxy-skip-app-production.up.railway.app');
			let jiraIssue = res.data?.issues?.map((issue: any) => {
				return { issueId: issue.fields?.status?.id, issueTitle: issue.fields?.status?.name, issue: issue }
			})
			// jiraIssue = [...new Set(jiraIssue.issueTitle)];

			const convertedJiraIssue: JiraIssue[] = [];

			jiraIssue.forEach((item: { issueId: string; issueTitle: string; issue: object; }) => {
				const existingIssue = convertedJiraIssue.find(
					(convertedItem) => (convertedItem.issueTitle === item.issueTitle && convertedItem.issueId === item.issueId)
				);

				if (existingIssue) {
					existingIssue.issue.push(item.issue);
				} else {
					convertedJiraIssue.push({
						issueId: item.issueId,
						issueTitle: item.issueTitle,
						issue: [item.issue],
					});
				}
			});
			console.log(convertedJiraIssue)
			setBoards(convertedJiraIssue);
		}
		catch (error) {
			console.log("Error = ", error);
		}

	}, []);



	useEffect(() => {
		getJiraData();
		localStorage.setItem("board-management", JSON.stringify(boards));
	}, []);

	return (
		<div className={styles.app}>
			{/* <div className={styles.app_navbar}>
				<h2>Hello, {escape(props.userDisplayName)}!</h2>
			</div> */}
			<div className={`${styles.app_boards_container}`}>
				<div className={`${styles.app_boards} ${styles.custom_scroll}`}>
					{boards.map((item: { id: any; }) => (
						<Board
							key={item.id}
							board={item}
							addCard={addCardHandler}
							removeBoard={() => removeBoard(item.id)}
							removeCard={removeCard}
							dragEnded={dragEnded}
							dragEntered={dragEntered}
							updateCard={updateCard}
						/>
					))}
					<div className={styles.app_boards_last}>
						<Editable
							displayClass={styles.app_boards_board_add}
							editClass={styles.app_boards_add_board_edit}
							placeholder="Enter Board Title"
							text="Add Board"
							onSubmit={addboardHandler}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoardManagement;
