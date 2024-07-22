import { resend } from "../../app.js";


async function verificationMail(user, verificationLink) {
	const { data, error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: user,
		subject: "Verify your account",
		html: ` Please click this link below to verify your account ${verificationLink}`,
	});

	return { data, error }
}


export {
	verificationMail
}