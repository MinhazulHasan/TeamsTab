/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as React from 'react';
import styles from './SingleProject.module.scss';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { JiraIssue } from './ISingleProject';
import Board from '../Board/Board';
import Editable from '../Editable/Editable';
import Loader from '../../../assets/Loader/Loader';

const SingleProject = (props: any) => {
	const [boards, setBoards] = useState([]);

	const [targetCard, setTargetCard] = React.useState({
		bId: "",
		card: {
			id: "",
			fields: {
				status: {
					name: ""
				}
			}
		}
	});

	const addboardHandler = (name: string) => {
		const tempBoards: any = [...boards];
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
		let data = JSON.stringify({
			"email": "imran.khan@brainstation23.com",
			"url": "https://pm23.atlassian.net/",
			"token": "ATATT3xFfGF0RbLyeeO5NwyZmpcLmIlSPfhV5ZnLfGYPB5M1lQ4niXFelllcHG1J7mrxsJJn2ctXTNSiWpI0gd6tJQPuBGwvpDjyQrfpCi0g6RsjQlcRqzsDcEcojrM5IOJPxTnGKjTRsDXc8Rpp88yavyKlOGI58e0e8kz261TQ5h0Fv7SSHCU=8E46BD24",
			"summary": title,
			"key": props.boardKey,
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://proxy-skip-app-production.up.railway.app/create-issue',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		try {
			const response = await axios.request(config);
			console.log("Create:", response.data);
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
				let newBoard: any = [...boards];
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

	const removeCard = async (bid: string, cid: string, cardKey: any) => {
		console.log(cardKey)

		const data = JSON.stringify({
			"email": "imran.khan@brainstation23.com",
			"url": "https://pm23.atlassian.net/",
			"token": "ATATT3xFfGF0RbLyeeO5NwyZmpcLmIlSPfhV5ZnLfGYPB5M1lQ4niXFelllcHG1J7mrxsJJn2ctXTNSiWpI0gd6tJQPuBGwvpDjyQrfpCi0g6RsjQlcRqzsDcEcojrM5IOJPxTnGKjTRsDXc8Rpp88yavyKlOGI58e0e8kz261TQ5h0Fv7SSHCU=8E46BD24",
			"key": cardKey,
		});

		const config = {
			method: 'DELETE',
			url: 'https://proxy-skip-app-production.up.railway.app/delete-issue',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		try {
			const res = await axios.request(config);
			console.log("Delete:", res.data);
			const index = boards.findIndex((item: { issueId: string; }) => item.issueId === bid);
			if (index < 0) return;

			const tempBoards = [...boards];
			const cards = tempBoards[index].issue;

			const cardIndex = cards.findIndex((item: { id: string; }) => item.id === cid);
			if (cardIndex < 0) return;

			cards.splice(cardIndex, 1);
			setBoards(tempBoards);
		}
		catch (error) {
			console.log(error);
		}
	};

	const dragEntered = (bId: string, card: { id: string, fields: {status: { name: string }} }) => {
		if (targetCard.card.id === card.id) return;
		setTargetCard({ bId, card });
		console.log("Drag Enter:\n", { bId, card })
	}

	const dragEnded = async (bId: string, card: { id: string, key: string }) => {

		console.log(targetCard?.card?.fields?.status?.name);

		const data = JSON.stringify({
			"email": "imran.khan@brainstation23.com",
			"url": "https://pm23.atlassian.net/",
			"token": "ATATT3xFfGF0RbLyeeO5NwyZmpcLmIlSPfhV5ZnLfGYPB5M1lQ4niXFelllcHG1J7mrxsJJn2ctXTNSiWpI0gd6tJQPuBGwvpDjyQrfpCi0g6RsjQlcRqzsDcEcojrM5IOJPxTnGKjTRsDXc8Rpp88yavyKlOGI58e0e8kz261TQ5h0Fv7SSHCU=8E46BD24",
			"key": card.key,
			"status": targetCard?.card?.fields?.status?.name,
		});

		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://proxy-skip-app-production.up.railway.app/change-issue-status',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		try {
			const res = await axios.request(config);
			console.log(res.data)

			console.log("Drag End:\n", { bId, card })
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

			setTargetCard({ bId: "", card: { id: "", fields: {status: { name: "" }} } });
		}
		catch (error) {
			console.log(error)
		}

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
			const data = JSON.stringify({
				"key": props.boardKey,
				"email": "imran.khan@brainstation23.com",
				"url": "https://pm23.atlassian.net/",
				"token": "ATATT3xFfGF0RbLyeeO5NwyZmpcLmIlSPfhV5ZnLfGYPB5M1lQ4niXFelllcHG1J7mrxsJJn2ctXTNSiWpI0gd6tJQPuBGwvpDjyQrfpCi0g6RsjQlcRqzsDcEcojrM5IOJPxTnGKjTRsDXc8Rpp88yavyKlOGI58e0e8kz261TQ5h0Fv7SSHCU=8E46BD24"
			});

			

			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://proxy-skip-app-production.up.railway.app/get-all-issue',
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			};

			const res = await axios.request(config);

			let jiraIssue = res.data?.map((issue: any) => {
				return { issueId: issue.fields?.status?.id, issueTitle: issue.fields?.status?.name, issue: issue }
			})

			
			console.log("Jira Issue = ", jiraIssue);
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

			console.log("Converted Jira Issue = ", convertedJiraIssue);
			setBoards(convertedJiraIssue);
		}
		catch (error) {
			console.log("Error = ", error);
		}

	}, []);

	useEffect(() => {
		getJiraData();
	}, [props.boardKey]);

	return ((boards.length === 0) ? <Loader /> :
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
	);
};

export default SingleProject;