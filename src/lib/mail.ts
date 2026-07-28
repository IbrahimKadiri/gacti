const MAIL_API_URL = "https://project-sn163.vercel.app/api/contact"; // A CHANGER 

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