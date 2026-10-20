import type {Content} from "@/types/content";

export const contact: Content["contact"] = {
    title: "Get In Touch",
    subtitle: {
        general: "Tell me about the role or the problem you want to solve",
        backend: "Tell me which systems you need to connect or which service you need built",
        crm: "Tell me which CRM process you want to automate or integrate",
        data: "Tell me what data you have and what question you want it to answer",
        devops: "Tell me what you need to deploy, watch or automate",
        fullstack: "Tell me which web product you want to build or improve",
    },
    connect: "Reach me directly",
    description: "I reply by email or WhatsApp. If it is about a role, a link to the job post helps me answer with what matters to you.",
    labels: {location: "Location", phone: "Phone", email: "Email", linkedin: "LinkedIn"},
    form: {
        name: "Full name",
        email: "Email",
        message: "Message",
        send: "Send via WhatsApp",
        sendEmail: "Send by email",
        note: "The message opens in WhatsApp or in your mail app, ready to send; nothing is stored on this site.",
    },
    placeholders: {
        name: "Your full name",
        email: "you@company.com",
        message: "Tell me about the role, project or question…",
    },
    whatsappIntro: "Hi Sebastián, I'm writing from your portfolio.",
    emailSubject: "From your portfolio",
    copyEmail: {
        label: "Copy email address",
        done: "Email address copied",
        failed: "Could not copy it; select the address instead"
    },
};
