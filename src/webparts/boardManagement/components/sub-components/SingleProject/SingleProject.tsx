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
import { ToastMessage } from '../../../assets/Toast/toast';
import Swal from 'sweetalert2';
import { Version3Client } from 'jira.js';

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
	// Add Board (Row) in a Particular Jira Project
	const addboardHandler = (name: string) => {
		const tempBoards: any = [...boards];
		tempBoards.push({
			issueId: Date.now() + Math.random() * 2,
			issueTitle: name,
			cards: [],
		});
		setBoards(tempBoards);
	};
	// Remove Board from a Particular Jira Project
	const removeBoard = (id: string) => {
		Swal.fire({
			icon: "question",
			title: "Are you sure to delete the Board?",
			toast: true,
			showCancelButton: true,
			confirmButtonText: "Delete",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const index = boards.findIndex((item: { issueId: string; }) => item.issueId === id);
				if (index < 0) return;

				const tempBoards = [...boards];
				tempBoards.splice(index, 1);
				setBoards(tempBoards);

				ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Board Deleted Successfully!');
			}
		});
	};
	// Add a Card (Issue) in a Particular Jira Board
	const addCardHandler = async (issueTitle: string, title: string) => {
		// console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');

		let data = JSON.stringify({
			"email": props.email,
			"url": props.siteUrl,
			"token": props.token,
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

		if (!window.navigator.onLine) {
			let temp: any = [];
			let offlineData = localStorage.getItem("syncData");
			offlineData = JSON.parse(offlineData);
			console.log("Offline Data = ", offlineData)
			if (offlineData && offlineData.length > 0) {
				temp = offlineData;
				temp.push(data);
			}
			else {
				temp.push(data);
			}
			localStorage.setItem("syncData", JSON.stringify(temp));

			const newIssue = {
				id: '10091',
				key: 'JIRATEAMS-53',
				self: 'self',
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

			return;
		}

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
				let newBoard: any = [...boards];
				newBoard[0].issue.push(newIssue);
				console.log(newBoard)
				setBoards(newBoard);

				ToastMessage.toastWithoutConfirmation('success', 'Congrats...', 'Issue Created Successfully!');
			}
			else {
				ToastMessage.toastWithConfirmation('error', 'Action Faield...', 'Error in Creating Card!');
			}
		}
		catch (error) {
			ToastMessage.toastWithConfirmation('error', 'Action Faield...', error);
		}
	};
	// Remove a Card (Issue) from a Particular Jira Board
	const removeCard = async (bid: string, cid: string, cardKey: any) => {
		const index = boards.findIndex((item: { issueId: string; }) => item.issueId === bid);
		if (index < 0) return;
		Swal.fire({
			icon: "question",
			title: "Are you sure to delete the Issue?",
			toast: true,
			showCancelButton: true,
			confirmButtonText: "Delete",
		}).then(async (result) => {
			if (result.isConfirmed) {
				// let config = {
				// 	method: 'delete',
				// 	url: `${props.siteUrl}rest/api/2/issue/${cid}`,
				// 	headers: {
				// 		'Authorization': `Basic ${props.token}`
				// 	}
				// };
				try {
					// const res = await axios.request(config);
					// console.log("Delete:", res.data);

					const client = new Version3Client({
						host: props.siteUrl,
						authentication: {
							basic: {
								email: props.email,
								apiToken: props.token,
							},
						},
					});

					// Delete the issue
					const deletionResponse = await client.issues.deleteIssue({
						issueIdOrKey: cid,
					});
					console.log(deletionResponse)

					const tempBoards = [...boards];
					const cards = tempBoards[index].issue;

					const cardIndex = cards.findIndex((item: { id: string; }) => item.id === cid);
					if (cardIndex < 0) return;

					cards.splice(cardIndex, 1);
					setBoards(tempBoards);

					ToastMessage.toastWithoutConfirmation('success', 'Success...', 'Card Deleted Successfully!');
				}
				catch (error) {
					console.log("ERROR:", error)
					ToastMessage.toastWithConfirmation('error', 'Action Faield...', error);
				}
			}
		})
	};
	// Drag a Card (Issue) from one Board to Another Board and set the Target Card
	const dragEntered = (bId: string, card: { id: string, fields: { status: { name: string } } }) => {
		if (targetCard.card.id === card.id) return;
		setTargetCard({ bId, card });
		console.log("Drag Enter:\n", { bId, card })
	}
	// Drop the Card (Issue) from one Board to Another Board and change the status of the Card (Issue)
	const dragEnded = async (bId: string, card: { id: string, key: string }) => {
		const data = JSON.stringify({
			"email": props.email,
			"url": props.siteUrl,
			"token": props.token,
			"key": card.id,
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

			setTargetCard({ bId: "", card: { id: "", fields: { status: { name: "" } } } });
			ToastMessage.toastWithoutConfirmation('success', 'Success...', 'Card Moved successfully!');
		}
		catch (error) {
			ToastMessage.toastWithConfirmation('error', 'Action faield...', error);
		}

	}
	// Update several features of a Card (Issue)
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
	// Get all the boards and Issues of a Jira Project
	const getJiraData = useCallback(async () => {
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
				url: 'https://proxy-skip-app-production.up.railway.app/get-all-issue',
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			};

			const res = await axios.request(config);
			let jiraIssue = res.data?.map((issue: any) => {
				return { issueId: issue.fields?.status?.id, issueTitle: issue.fields?.status?.name, issue: issue }
			});
			const convertedJiraIssue: JiraIssue[] = [];
			jiraIssue.forEach((item: { issueId: string; issueTitle: string; issue: object; }) => {
				const existingIssue = convertedJiraIssue.find((convertedItem) => (convertedItem.issueTitle === item.issueTitle));

				if (existingIssue) existingIssue.issue.push(item.issue);
				else {
					convertedJiraIssue.push({
						issueId: item.issueId,
						issueTitle: item.issueTitle,
						issue: [item.issue],
					});
				}
			});
			setBoards(convertedJiraIssue);
		}
		catch (error) {
			ToastMessage.toastWithConfirmation("error", "Something went wrong", error);
		}

	}, []);

	useEffect(() => {
		getJiraData();
	}, [props.boardKey]);

	return ((boards.length === 0) ? <Loader /> :
		<div className={`${styles.app_boards} ${styles.custom_scroll}`}>
			{boards.map((item: { issueId: string; }) => (
				<Board
					key={item.issueId}
					board={item}
					addCard={addCardHandler}
					removeBoard={() => removeBoard(item.issueId)}
					removeCard={removeCard}
					dragEnded={dragEnded}
					dragEntered={dragEntered}
					updateCard={updateCard}
					email={props.email}
					siteUrl={props.siteUrl}
					token={props.token}
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