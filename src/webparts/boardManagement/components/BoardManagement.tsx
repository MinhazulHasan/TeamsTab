/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as React from 'react';
import { useState } from 'react';
import styles from './BoardManagement.module.scss';
import { IBoardManagementProps } from './IBoardManagementProps';
import Credential from './sub-components/Credential/Credential';
import Projects from './sub-components/Projects/Projects';
import SingleProject from './sub-components/SingleProject/SingleProject';
import Navbar from './sub-components/Navbar/Navbar';
import { escape } from '@microsoft/sp-lodash-subset';

export const UserContext = React.createContext(null);

const BoardManagement: React.FC<IBoardManagementProps> = (props: IBoardManagementProps) => {

	const [hasCredential, setHasCredential] = useState(false);
	const [boardKey, setBoardKey] = useState("");
	const [page, setPage] = useState({ Projects: true, SingleProject: false });
	const [issue, setIssue] = useState({});

	const [email, setEmail] = useState("");
	const [siteUrl, setSiteUrl] = useState("");
	const [token, setToken] = useState("");

	return (
		<UserContext.Provider value={[issue, setIssue]}>
			<div className={styles.app}>
				{
					hasCredential ?
						<>
							<Navbar currentUser={escape(props.userDisplayName)} setPage={setPage} setHasCredential={setHasCredential} />
							<div className={`${styles.app_boards_container} ${styles.custom_scroll}`}>
								{page.Projects && <Projects setPage={setPage} setBoardKey={setBoardKey} email={email} siteUrl={siteUrl} token={token} />}
								{page.SingleProject && <SingleProject setPage={setPage} boardKey={boardKey} email={email} siteUrl={siteUrl} token={token} />}
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
		</UserContext.Provider>
	);
};

export default BoardManagement;

// {/* <h2>Hello, {escape(props.userDisplayName)}!</h2> */}