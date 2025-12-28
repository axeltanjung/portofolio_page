export async function getGitHubYear(username="axeltanjung") {
  const res = await fetch("https://api.github.com/graphql", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${import.meta.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      query: `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`
    })
  });

  const json = await res.json();
  return json.data.user.contributionsCollection.contributionCalendar.weeks;
}
