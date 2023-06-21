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

	const [email, setEmail] = React.useState("imran.khan@brainstation23.com");
    const [siteUrl, setSiteUrl] = React.useState("https://pm23.atlassian.net/");
	const [token, setToken] = React.useState("ATATT3xFfGF0aDp4skiwrMwXow4PP2568y8SVuR2kMM_XFpvUHZCMRaPQtF959RPLW62LXGEgKOyUBUF3k-PWAJIty1pF4QNY4Z1F0dldJ93H3hprQp6j2t5SCyyobEk7jPlwnU1TvzEb90ykrFC8TZ04_lgLvKqVGyrh69TZ06Wap1nO_Z3dog=A747F0FE");

	useEffect(() => {
		// getJiraData();
	}, []);

	return (
		<div className={styles.app}>
			{
				hasCredential ?
				<>
					<div className={`${styles.app_boards_container} ${styles.custom_scroll}`}>
						{page.Projects && <Projects setPage={setPage} setBoardKey={setBoardKey} email={email} siteUrl={siteUrl} token={token} />}
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