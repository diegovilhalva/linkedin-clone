import { mailTrapClient, sender } from "../lib/mailtrap.js"
import { createCommentNotificationEmailTemplate, createConnectionAcceptedEmailTemplate, createWelcomeEmailTemplate } from "./emailTemplates.js"

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

        console.log("Email enviado com sucesso", response)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const sendCommentNotificationEmail = async (recipientEmail, recepientName, commenterName, postUrl, commentContent) => {
    const recipient = [{ email:recipientEmail }]

    try {
        const response = mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Novo comentário em sua publicação",
            html: createCommentNotificationEmailTemplate(recepientName, commenterName, postUrl, commentContent),
            category:"comment_notification"
        })
    } catch (error) {
        throw new Error(error.message)
        
    }

}

export const sendConnectionAcceptedEmail = async (senderEmail,senderName,recipientName,profileUrl) => {
    const recipient = [{email:senderEmail}]
    try {
		const response = await mailTrapClient.send({
			from: sender,
			to: recipient,
			subject: `${recipientName} aceitou sua solicitação de conexão`,
			html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
			category: "connection_accepted",
		});
	} catch (error) {
        
    }
}