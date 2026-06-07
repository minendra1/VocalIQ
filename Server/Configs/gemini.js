const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"


export const generateGeminiResponse = async ({
    prompt,
    apikey,
    user
}) => {
    try {

        if (!apikey) {
            throw new Error("Gemini API key missing")
        }

        const response = await fetch(`${Gemini_URL}?key=${apikey}`, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })

        })

        if (!response.ok) {

        // Invalid API Key
        if (
          response.status === 400 ||
          response.status === 401
        ) {

          user.geminiStatus =
            "invalid";

          await user.save();
        }

        // Quota Exceeded
        if (
          response.status === 429
        ) {

          user.geminiStatus =
            "quota_exceeded";

          await user.save();
        }

        const err =
          await response.text();

        throw new Error(err);
      }

      // =========================
      // SUCCESS STATUS
      // =========================

      const data = await response.json()

      // Check for API-level errors in response
      if (data.error) {
        throw new Error(`Gemini API Error: ${data.error.message || 'Unknown error'}`)
      }

      const text = data.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;

      if (!text) {
        throw new Error("No text returned from Gemini. Response: " + JSON.stringify(data))
      }

      // Update status only after successful response
      user.geminiStatus = "active"
      await user.save()

      return text.trim()
    } catch (error) {
        console.error("Gemini Fetch Error:", error.message)
        // Re-throw with the actual error message for debugging
        throw error

    }
}