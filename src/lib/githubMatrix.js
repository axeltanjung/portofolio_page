export async function getGitHubMatrix() {
  const res = await fetch("https://api.github.com/users/axeltanjung/events/public", {
    headers: { "User-Agent": "axel-console" }
  });

  if (!res.ok) return [];

  const events = await res.json();
  const pushes = events.filter(e => e.type === "PushEvent");

  const matrix = Array(14).fill(0);

  pushes.forEach(e => {
    const day = Math.floor((Date.now() - new Date(e.created_at)) / 86400000);
    if (day >= 0 && day < 14) matrix[13 - day] += 1;
  });

  return matrix;
}
