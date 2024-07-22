import { resend } from "../../app.js";


async function forgotPasswordMail(user,verificationLink){
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user,
        subject: "reset your password",
        html: `Please click on this link below to reset you password ${verificationLink}`,
      });
    return {data , error }
}


export {
    forgotPasswordMail
}