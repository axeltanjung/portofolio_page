export async function getGitHubPulse() {
  const res = await fetch("https://api.github.com/users/axeltanjung/events/public", {
    headers: { "User-Agent": "axel-console" }
  });

  if (!res.ok) return null;

  const events = await res.json();

  const commits = events.filter(e => e.type === "PushEvent");
  const prs = events.filter(e => e.type === "PullRequestEvent");

  return {
    latestCommit: commits[0]?.repo.name || "—",
    commitCount24h: commits.length,
    prMergedToday: prs.filter(p => p.payload.action === "closed").length,
    activeRepos: [...new Set(commits.map(c => c.repo.name))].length,
    heartbeat: commits.length > 0
  };
}
