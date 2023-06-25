/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

class PnpService {
	public siteUrl: string;
	public sp: any;
	public siteRelativeUrl: string;
	public currentUserId: number;
	public currentUserDetails: any;

	public constructor(context: any) {
		// this.siteUrl = context.pageContext.web.absoluteUrl;

		this.siteUrl = 'https://brainstationo365.sharepoint.com/sites/TestByMinhaz';

		this.siteRelativeUrl = context.pageContext.web.serverRelativeUrl;
		this.sp = spfi(this.siteUrl).using(SPFx(context));
	}

	// public async sumbitQuestionWithAnswers(questionListObj: any, answerListObj: any) {
	// 	try {
	// 		await this.sp.web.lists.getByTitle("QuestionAnswer").items.add(questionListObj);
	// 		answerListObj.forEach(async (element: any) => {
	// 			await this.sp.web.lists.getByTitle("AnswerDetailsAndResponse").items.add(element);
	// 		});
	// 		return true;
	// 	}
	// 	catch (e) {
	// 		console.log(e);
	// 		return false;
	// 	}
	// }


}

export default PnpService;
