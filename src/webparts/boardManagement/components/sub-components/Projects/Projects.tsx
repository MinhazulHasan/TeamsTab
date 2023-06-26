/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
import * as React from 'react';
import './Projects.scss';
import axios from 'axios';
import { ToastMessage } from '../../../../../services/toast';
import Loader from '../../../assets/Loader/Loader';
// import { Version3Client } from 'jira.js';

const Projects = (props: any) => {

    const [projects, setProjects] = React.useState([]);
    // Show single project component
    const viewSingleProjectPage = (key: string) => {
        props.setBoardKey(key);
        props.setPage({ Projects: false, SingleProject: true });
    };
    // Get all projects from JIRA
    const getJiraProjects = React.useCallback(async () => {
        try {
            // const client = new Version3Client({
            //     host: props.siteUrl,
            //     authentication: {
            //         basic: {
            //             email: props.email,
            //             apiToken: props.apiToken,
            //         },
            //     },
            // });
            // const projects = await client.projects.getAllProjects();
            // setProjects(projects);
            const data = JSON.stringify({
                "email": props.email,
                "url": props.siteUrl,
                "token": props.token
            });

            const config = {
                method: 'POST',
                url: 'https://proxy-skip-app-production.up.railway.app/get-all-project',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios.request(config);
            if (res.data.length !== 0)  setProjects(res.data);
            else    ToastMessage.toastWithConfirmation("error", "Projects Not Found", "Please Create a Project in JIRA or Re-Generate your JIRA Token");
        }
        catch (error) {
            ToastMessage.toastWithConfirmation("error", "Something went wrong", error);
        }

    }, []);

    React.useEffect(() => {
        getJiraProjects();
    }, [])

    return ((projects.length === 0) ? <Loader /> :
        <div className="cards">
            {
                projects.map((project: any) =>
                    <div className="card" onClick={() => viewSingleProjectPage(project?.key)}>
                        <span className="close"></span>
                        <span className="arrow"></span>
                        <article>
                            <h2>{project?.name}</h2>
                            <div className="title">{project?.projectTypeKey}</div>
                            <div className="pic"><img src={project?.avatarUrls["48x48"]} /></div>
                            <div className="desc">{project?.name}</div>
                        </article>
                        <div className="actions">
                            <button className="btn">
                                <span>View Project</span>
                                <img className="icon" src="https://rafaelavlucas.github.io/assets/icons/misc/trade.svg" />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Projects;