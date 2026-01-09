export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).send("id is required");
    return;
  }

  const spotifyImageUrl = `https://i.scdn.co/image/${id}`;

  const response = await fetch(spotifyImageUrl);

  if (!response.ok) {
    res.status(404).send("Image not found");
    return;
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(buffer);
}
