/* eslint-disable prefer-const */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as React from 'react';
import styles from './BoardManagement.module.scss';
import { IBoardManagementProps } from './IBoardManagementProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Board from './sub-components/Board/Board';
import Editable from './sub-components/Editable/Editable';



const BoardManagement: React.FC<IBoardManagementProps> = (props: IBoardManagementProps) => {
	const [boards, setBoards] = React.useState([
		{
			id: (Date.now() + Math.random() * 2).toString(),
			title: "To Do",
			cards: [
				{
					id: (Date.now() + Math.random()).toString(),
					title: "Card 1",
					tasks: [],
					labels: [
						{
							text: "frontend",
							color: 'blue'
						}
					],
					desc: "hliudh dhuwqhydo dhqawhdo",
					date: "",
				},
				{
					id: (Date.now() + Math.random()).toString(),
					title: "Card 2",
					tasks: [],
					labels: [
						{
							text: "backend",
							color: 'green'
						}
					],
					desc: "hliudh dhuwqhydo dhqawhdo",
					date: "",
				}
			]
		}
	])

	const [targetCard, setTargetCard] = React.useState({ cId: "", bId: "" });

	const addCard = (title: any, bId: any) => {
		const card: any = {
			id: Date.now() + Math.random(),
			title,
			labels: [],
			tasks: [],
			date: "",
			desc: ""
		}

		const index = boards.findIndex((item: { id: any; }) => item.id === bId);
		if (index < 0) return;

		const tempBoards = [...boards];
		tempBoards[index].cards.push(card);
		setBoards(tempBoards);
	}

	const removeCard = (cardId: any, bId: any) => {
		const bIndex = boards.findIndex((item: { id: any; }) => item.id === bId);
		if (bIndex < 0) return;
		const cIndex = boards[bIndex].cards.findIndex((item: { id: any; }) => item.id === cardId);
		if (cIndex < 0) return;

		const tempBoards = [...boards];
		tempBoards[bIndex].cards.splice(cIndex, 1);
		setBoards(tempBoards);
	}

	const addBoard = (title: any) => {
		setBoards([
			...boards,
			{
				id: (Date.now() + Math.random()).toString(),
				title,
				cards: []
			}
		])
	}

	const removeBoard = (bId: any) => {
		const tempBoards = boards.filter(item => item.id !== bId);
		setBoards(tempBoards);
	}

	const handleDragEnter = (cId: string, bId: string) => {
		if (targetCard.cId === cId) return;
		setTargetCard({ cId, bId });
	}

	const handleDragEnd = (cId: string, bId: string) => {
		let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;

		s_boardIndex = boards.findIndex((item) => item.id === bId);
		if (s_boardIndex < 0) return;

		s_cardIndex = boards[s_boardIndex]?.cards?.findIndex((item) => item.id === cId);
		if (s_cardIndex < 0) return;

		t_boardIndex = boards.findIndex((item) => item.id === targetCard.bId);
		if (t_boardIndex < 0) return;

		t_cardIndex = boards[t_boardIndex]?.cards?.findIndex((item) => item.id === targetCard.cId);
		if (t_cardIndex < 0) return;

		const tempBoards = [...boards];
		const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
		tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
		tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
		console.log(tempBoards)
		setBoards(tempBoards);

		setTargetCard({ bId: "", cId: "" });
	}

	return (
		<div className={styles.app}>
			<div className={styles.app_navbar}>
				<h2>Hello, {escape(props.userDisplayName)}!</h2>
			</div>
			<div className={`${styles.app_outer} ${styles['custom-scroll']}`}>
				<div className={`${styles.app_boards}`}>
					{boards.map((item) => (
						<Board
							key={item.id}
							board={item}
							removeBoard={removeBoard}
							addCard={addCard}
							removeCard={removeCard}
							handleDragEnter={handleDragEnter}
							handleDragEnd={handleDragEnd}
						/>
					))}
					<div className={styles.app_boards_board}>
						<Editable
							displayClass={styles.app_boards_board_add}
							text="Add Board"
							placeholder="Enter Board Title"
							onSubmit={(value: any) => addBoard(value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoardManagement;
