import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateGeminiResponse = async ({
    prompt,
    apikey,
    user
}) => {
    try {
        if (!apikey) {
            throw new Error("Gemini API key missing")
        }

        // Initialize the Generative AI client
        const genAI = new GoogleGenerativeAI(apikey);
        
        // Get the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("No text returned from Gemini")
        }

        // Update status only after successful response
        user.geminiStatus = "active"
        await user.save()

        return text.trim()
    } catch (error) {
        console.error("Gemini API Error:", error.message)
        
        // Check for specific error codes
        if (error.message.includes("401") || error.message.includes("API_KEY_INVALID")) {
            user.geminiStatus = "invalid";
            await user.save();
        } else if (error.message.includes("429")) {
            user.geminiStatus = "quota_exceeded";
            await user.save();
        }
        
        throw error
    }
}