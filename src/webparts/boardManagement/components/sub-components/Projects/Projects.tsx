/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
import * as React from 'react';
import './Projects.scss';
import projects from './dummy';

const Projects = (props: any) => {

    const viewProjectBtn = (id: number) => {
        props.setBoardId(id);
        props.setPage({ Projects: false, SingleProject: true });
    };

    return (
        <div className="cards">
            {
                projects &&
                projects.values?.map(project =>
                    <div className="card">
                        <span className="close"></span>
                        <span className="arrow"></span>
                        <article>
                            <h2>{project?.name}</h2>
                            <div className="title">{project?.type}</div>
                            <div className="pic"><img src={project?.location?.avatarURI} /></div>
                            <div className="desc">{project?.location?.displayName}</div>
                        </article>
                        <div className="actions">
                            {/* <button className="btn"><span>like</span><img className="icon" src="https://rafaelavlucas.github.io/assets/icons/misc/heart.svg" /></button> */}
                            <button className="btn" onClick={() => viewProjectBtn(project.id)}>
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