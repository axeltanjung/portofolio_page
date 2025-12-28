const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UC15XGrphnVdPuDPnQ0U8dag"; // ← your channel id

export async function getYoutubeVideos(limit = 6) {
  const url =
    `https://www.googleapis.com/youtube/v3/search?` +
    `key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${limit}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const json = await res.json();

  return json.items
    .filter(v => v.id.videoId)
    .map(v => ({
      id: v.id.videoId,
      title: v.snippet.title,
      thumb: v.snippet.thumbnails.high.url,
      date: new Date(v.snippet.publishedAt).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})
    }));
}
