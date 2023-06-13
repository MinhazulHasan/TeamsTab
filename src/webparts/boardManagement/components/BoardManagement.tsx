/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './BoardManagement.module.scss';
import { IBoardManagementProps } from './IBoardManagementProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import Board from './sub-components/Board/Board';
import Editable from './sub-components/Editable/Editable';



const BoardManagement: React.FC<IBoardManagementProps> = (props: IBoardManagementProps) => {
	const [boards, setBoards] = useState([]);  // JSON.parse(localStorage.getItem("board-management")) || []

	const [targetCard, setTargetCard] = React.useState({ bId: "", cId: "" });

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

	const addCardHandler = (id: string, title: string) => {
		const index = boards.findIndex((item: { id: any }) => item.id === id);
		if (index < 0) return;

		const tempBoards = [...boards];
		tempBoards[index].cards.push({
			id: Date.now() + Math.random() * 2,
			title,
			labels: [],
			date: "",
			tasks: [],
		});
		setBoards(tempBoards);
	};

	const removeCard = (bid: string, cid: string) => {
		const index = boards.findIndex((item: { id: string; }) => item.id === bid);
		if (index < 0) return;

		const tempBoards = [...boards];
		const cards = tempBoards[index].cards;

		const cardIndex = cards.findIndex((item: { id: string; }) => item.id === cid);
		if (cardIndex < 0) return;

		cards.splice(cardIndex, 1);
		setBoards(tempBoards);
	};

	const dragEntered = (bId: string, cId: string) => {
		if (targetCard.cId === cId) return;
		setTargetCard({ bId, cId });
	}

	const dragEnded = (bId: string, cId: string) => {
		let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;

		s_boardIndex = boards.findIndex((item: { id: string; }) => item.id === bId);
		if (s_boardIndex < 0) return;

		s_cardIndex = boards[s_boardIndex]?.cards?.findIndex((item: { id: string; }) => item.id === cId);
		if (s_cardIndex < 0) return;

		t_boardIndex = boards.findIndex((item: { id: string; }) => item.id === targetCard.bId);
		if (t_boardIndex < 0) return;

		t_cardIndex = boards[t_boardIndex]?.cards?.findIndex((item: { id: string; }) => item.id === targetCard.cId);
		if (t_cardIndex < 0) return;

		const tempBoards = [...boards];
		const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
		tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
		tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
		setBoards(tempBoards);

		setTargetCard({ bId: "", cId: "" });
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

	const getTrelloData = async () => {
		const res = await fetch('https://api.trello.com/1/boards/s0IHODed/lists?key=c81f41b37b2e6b3eccc14dd61dc458e8&token=ATTA4dc97d9045ba763bd8379f25562f444a3089df6c6edfc8ccc93f9a053135769365C046BA&cards=all');
		const data = await res.json();
		setBoards(data);
		console.log(data);
	};

	useEffect(() => {
		console.log(JSON.parse(localStorage.getItem("board-management")))
		getTrelloData();
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
