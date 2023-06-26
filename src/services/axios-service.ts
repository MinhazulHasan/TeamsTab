import axios from "axios";
import { ToastMessage } from "./toast";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
class AxiosService {

    private email: string = localStorage.getItem("email");
    private siteUrl: string = localStorage.getItem("siteUrl");
    private token: string = localStorage.getItem("token");

    public async getJiraProjects() {
        try {
            const data = JSON.stringify({
                "email": this.email,
                "url": this.siteUrl,
                "token": this.token
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
            if (res.data.length !== 0)  return res.data;
            else {
                ToastMessage.toastWithConfirmation("error", "Projects Not Found", "Please Create a Project in JIRA or Re-Generate your JIRA Token");
                return 0;
            }
        }
        catch (error) {
            ToastMessage.toastWithConfirmation("error", "Something went wrong", error);
        }
    }

    public async getJiraIssuesByProjectKey(projectKey: string) {
        try {
            const data = JSON.stringify({
                "key": projectKey,
                "email": this.email,
                "url": this.siteUrl,
                "token": this.token
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

            if (res.data.length !== 0)  return res.data;
            else {
                ToastMessage.toastWithConfirmation("error", "Issues Not Found", "No issue exist in the project");
                return 0;
            }
        }
        catch (error) {
            ToastMessage.toastWithConfirmation("error", "Something went wrong", error);
        }
    }


    public async updateIssueSummary(value: string, issueId: string) {
        try {
            const data = JSON.stringify({
                "email": this.email,
                "url": this.siteUrl,
                "token": this.token,
                "summary": value,
                "id": issueId
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/update-issue',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
			await axios.request(config);
            return true;
        }
        catch (error) {
            ToastMessage.toastWithConfirmation("error", "Something went wrong", error);
            return false;
        }
    }


    public async updateIssueDescription(value: string, issueId: string) {
        try {
            const data = JSON.stringify({
                "email": this.email,
                "url": this.siteUrl,
                "token": this.token,
                "description": value,
                "id": issueId
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/update-issue',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
			await axios.request(config);
            return true;
        }
        catch (error) {
            ToastMessage.toastWithConfirmation('error', 'Card Description Update Failed!', error);
            return false;
        }
    }

    public async getAssigners(boardKey: string) {
        try {
            const data = JSON.stringify({
                "email": this.email,
                "url": this.siteUrl,
                "token": this.token,
                "key": boardKey,
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/get-assigner',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const res = await axios.request(config);
            return res.data;

        } catch (err) {
            console.log(err)
        }
    }


    public async setIssueAssigner(issueKey: string, assigneTo: string) {
        try {
            const data = JSON.stringify({
                "email": this.email,
                "url": this.siteUrl,
                "token": this.token,
                "key": issueKey,
                "assignee": assigneTo
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://proxy-skip-app-production.up.railway.app/set-assigner',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const res = await axios.request(config);
            return res.data;

        } catch (err) {
            console.log(err);
            ToastMessage.toastWithConfirmation('error', 'Member Assign Failed!', err);
        }
    }





}

export default AxiosService;
