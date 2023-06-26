/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";
import { ToastMessage } from "./toast";
import { SpData } from "./sp-data";

class PnpService {
	public siteUrl: string;
	public sp: any;
	public siteRelativeUrl: string;
	public currentUserId: number;
	public currentUserDetails: any;

	public constructor(context: any) {
		// this.siteUrl = context.pageContext.web.absoluteUrl;
		this.siteUrl = SpData.SiteURL;
		this.siteRelativeUrl = context.pageContext.web.serverRelativeUrl;
		this.sp = spfi(this.siteUrl).using(SPFx(context));
	}

	public async setOrUpdateDevTimeLog(jiraIssueObj: { Title: string; BoardID: number; IssueID: number; DevTimeLog: number; }) {
		try {
			const exist = await this.sp.web.lists.getByTitle(SpData.JiraIssueList).items
				.filter(`Title eq '${jiraIssueObj.Title}' and BoardID eq ${jiraIssueObj.BoardID} and IssueID eq ${jiraIssueObj.IssueID}`).top(1)();
            if(exist.length > 0) {
                await this.sp.web.lists.getByTitle(SpData.JiraIssueList).items.getById(exist[0].Id).update({ DevTimeLog: jiraIssueObj.DevTimeLog });
				ToastMessage.toastWithoutConfirmation('success', 'Successful', 'Dev TimeLog Update...');
			}
            else {
                await this.sp.web.lists.getByTitle(SpData.JiraIssueList).items.add(jiraIssueObj);
				ToastMessage.toastWithoutConfirmation('success', 'Successful', 'Dev TimeLog Set...');
            }
			return true;
		}
		catch (e) {
			console.log(e);
			return false;
		}
	}

	public async getDevTimeLog(jiraIssueObj: { Title: string; BoardID: number; IssueID: number; }) {
		try {
			const exist = await this.sp.web.lists.getByTitle(SpData.JiraIssueList).items
				.filter(`Title eq '${jiraIssueObj.Title}' and BoardID eq ${jiraIssueObj.BoardID} and IssueID eq ${jiraIssueObj.IssueID}`).top(1)();
            if(exist.length > 0)
				return exist[0].DevTimeLog;
			else
				return 0;
		}
		catch (e) {
			console.log(e);
			return false;
		}
	}


}

export default PnpService;
