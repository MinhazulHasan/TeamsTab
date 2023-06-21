/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
import * as React from 'react';
import './Projects.scss';
// import projects from './dummy';
import axios from 'axios';

const Projects = (props: any) => {

    const [projects, setProjects] = React.useState<any>();

    const viewProjectBtn = (key: string) => {
        props.setBoardKey(key);
        props.setPage({ Projects: false, SingleProject: true });
    };

    const getJiraProjects = React.useCallback(async () => {
        try {
            // const email = localStorage.getItem("email");
            // const siteUrl = localStorage.getItem("siteUrl");
            // const token = localStorage.getItem("token");

            const data = JSON.stringify({
                "email": "imran.khan@brainstation23.com",
                "url": "https://pm23.atlassian.net/",
                "token": "ATATT3xFfGF0RbLyeeO5NwyZmpcLmIlSPfhV5ZnLfGYPB5M1lQ4niXFelllcHG1J7mrxsJJn2ctXTNSiWpI0gd6tJQPuBGwvpDjyQrfpCi0g6RsjQlcRqzsDcEcojrM5IOJPxTnGKjTRsDXc8Rpp88yavyKlOGI58e0e8kz261TQ5h0Fv7SSHCU=8E46BD24"
            });

            const config = {
                method: 'POST',
                url: 'https://proxy-skip-app-production.up.railway.app/get-all-project',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res =  await axios.request(config);
            setProjects(res.data);
        }
        catch (error) {
            console.log("Error = ", error);
        }

    }, []);

    React.useEffect(() => {
        getJiraProjects();
    }, [])

    return (
        <div className="cards">
            {
                projects &&
                projects.map((project: any) =>
                    <div className="card">
                        <span className="close"></span>
                        <span className="arrow"></span>
                        <article>
                            <h2>{project?.name}</h2>
                            <div className="title">{project?.projectTypeKey}</div>
                            <div className="pic"><img src={project?.avatarUrls["48x48"]} /></div>
                            <div className="desc">{project?.name}</div>
                        </article>
                        <div className="actions">
                            {/* <button className="btn"><span>like</span><img className="icon" src="https://rafaelavlucas.github.io/assets/icons/misc/heart.svg" /></button> */}
                            <button className="btn" onClick={() => viewProjectBtn(project?.key)}>
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