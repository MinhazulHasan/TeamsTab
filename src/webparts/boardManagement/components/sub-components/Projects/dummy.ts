const projects = {
    maxResults: 50,
    startAt: 0,
    total: 3,
    isLast: true,
    values: [
      {
        id: 1,
        self: "https://ari-us.atlassian.net/rest/agile/1.0/board/1",
        name: "IP board",
        type: "scrum",
        location: {
          projectId: 10000,
          displayName: "Initial Placeholder (IP)",
          projectName: "Initial Placeholder",
          projectKey: "IP",
          projectTypeKey: "software",
          avatarURI: "https://ari-us.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=small",
          name: "Initial Placeholder (IP)"
        }
      },
      {
        id: 2,
        self: "https://ari-us.atlassian.net/rest/agile/1.0/board/2",
        name: "RTS board",
        type: "simple",
        location: {
          projectId: 10001,
          displayName: "RFP Tool Sharepoint (RTS)",
          projectName: "RFP Tool Sharepoint",
          projectKey: "RTS",
          projectTypeKey: "software",
          avatarURI: "https://ari-us.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10421?size=small",
          name: "RFP Tool Sharepoint (RTS)"
        }
      },
      {
        id: 3,
        self: "https://ari-us.atlassian.net/rest/agile/1.0/board/3",
        name: "JiraInTeams",
        type: "simple",
        location: {
          projectId: 10002,
          displayName: "Jira Teams Application (JIRATEAMS)",
          projectName: "Jira Teams Application",
          projectKey: "JIRATEAMS",
          projectTypeKey: "software",
          avatarURI: "https://ari-us.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10409?size=small",
          name: "Jira Teams Application (JIRATEAMS)"
        }
      }
    ]
  }

export default projects;