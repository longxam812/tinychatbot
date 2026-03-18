export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { messages } = req.body;
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "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",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        system: `You are a receptionist assistant for Tinu. Your ONLY job is to acknowledge that you have received the user's message and let them know Tinu will respond soon. 

Rules:
- NEVER answer questions directly
- NEVER give advice, explanations, or information
- NEVER solve problems or provide any content-related response
- ONLY confirm receipt of their message warmly
- Keep replies short (1-2 sentences max)
- Be friendly and encouraging

Example replies:
- "Got it! Tinu will get back to you soon 😊"
- "Thanks for sharing! Tinu will reply shortly ✨"
- "Received! Sit tight, Tinu will respond soon 🙌"`,
        messages
      })
    });
    const data = await response.json();
    res.status(200).json({ reply: data.content?.[0]?.text || "Mình chưa hiểu, thử lại nhé!" });
  } catch (e) {
    res.status(500).json({ reply: "Lỗi server, thử lại nhé!" });
  }
}
