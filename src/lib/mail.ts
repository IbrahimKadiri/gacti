const MAIL_API_URL = "https://gacti-mail.vercel.app/api/send-email";

export async function sendMail(payload: unknown) {
  const response = await fetch(MAIL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi du message");
  }

  return response.json();
}