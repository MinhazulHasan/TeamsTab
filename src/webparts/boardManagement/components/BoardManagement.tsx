/* eslint-disable @typescript-eslint/no-use-before-define */
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
import Credential from './sub-components/Credential/Credential';
import Projects from './sub-components/Projects/Projects';
import SingleProject from './sub-components/SingleProject/SingleProject';
// import { escape } from '@microsoft/sp-lodash-subset';

const BoardManagement: React.FC<IBoardManagementProps> = (props: IBoardManagementProps) => {

	const [hasCredential, setHasCredential] = useState(false);
	const [boardKey, setBoardKey] = useState("");
	const [page, setPage] = React.useState({ Projects: true, SingleProject: false })

	const [email, setEmail] = React.useState("");
    const [siteUrl, setSiteUrl] = React.useState("");
	const [token, setToken] = React.useState("");

	useEffect(() => {
		// getJiraData();
	}, []);

	return (
		<div className={styles.app}>
			{
				hasCredential ?
				<>
					<div className={`${styles.app_boards_container} ${styles.custom_scroll}`}>
						{page.Projects && <Projects setPage={setPage} setBoardKey={(e : any) => setBoardKey( e )} email={email} siteUrl={siteUrl} token={token} />}
						{page.SingleProject && <SingleProject setPage={setPage} boardKey={boardKey} />}
					</div>
				</>
				:
				<Credential
					setHasCredential={setHasCredential}
					setEmail={setEmail}
					setSiteUrl={setSiteUrl}
					setToken={setToken}
					email={email}
					siteUrl={siteUrl}
					token={token}
				/>
			}
		</div>
	);
};

export default BoardManagement;

// {/* <h2>Hello, {escape(props.userDisplayName)}!</h2> */}