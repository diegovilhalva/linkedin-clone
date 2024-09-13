import { mailTrapClient, sender } from "../lib/mailtrap.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"

export const sendWelcomeEmail = async (email, name, profileUrl) => {
    const recepient = [{ email }]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recepient,
            subject: "Bem vind@ ao Unlinked",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: "welcome"
        })

        console.log("Email enviado com sucesso",response)
    } catch (error) {
        throw new Error(error.message)
    }
}