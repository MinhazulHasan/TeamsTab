/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBoardManagementProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: any;
}

export interface JiraIssue {
	issueId: string;
	issueTitle: string;
	issue: object[];
}