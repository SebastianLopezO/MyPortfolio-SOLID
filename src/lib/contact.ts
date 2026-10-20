import {profile} from "@/content/shared/profile";

export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}

/** A WhatsApp chat with the message already typed; the visitor still presses send. */
export const whatsappUrl = (intro: string, {name, email, message}: ContactMessage) =>
    `https://wa.me/${profile.phone.whatsapp}?text=${encodeURIComponent(`${intro}\n\n${name}\n${email}\n\n${message}`)}`;

/** A draft in the visitor's mail app. RFC 6068 asks for CRLF line breaks in the body. */
export const mailtoUrl = (subject: string, {name, email, message}: ContactMessage) => {
    const body = `${message}\n\n${name}\n${email}`.replace(/\r?\n/g, "\r\n");
    return `mailto:${profile.email}?subject=${encodeURIComponent(`${subject} · ${name}`)}&body=${encodeURIComponent(body)}`;
};
