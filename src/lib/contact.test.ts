import {profile} from "@/content/shared/profile";
import {mailtoUrl, whatsappUrl} from "@/lib/contact";

const message = {name: "Ana Gómez", email: "ana@example.com", message: "¿Hablamos? Tasa 5% & más\nSegunda línea"};

describe("contact links", () => {
    it("drafts an email with the subject, the message and CRLF line breaks", () => {
        const url = new URL(mailtoUrl("From your portfolio", message));
        expect(url.protocol).toBe("mailto:");
        expect(url.pathname).toBe(profile.email);
        expect(url.searchParams.get("subject")).toBe("From your portfolio · Ana Gómez");
        expect(url.searchParams.get("body")).toBe("¿Hablamos? Tasa 5% & más\r\nSegunda línea\r\n\r\nAna Gómez\r\nana@example.com");
    });

    it("types the WhatsApp message without sending it", () => {
        const url = new URL(whatsappUrl("Hi Sebastián", message));
        expect(`${url.origin}${url.pathname}`).toBe(`https://wa.me/${profile.phone.whatsapp}`);
        expect(url.searchParams.get("text")).toBe("Hi Sebastián\n\nAna Gómez\nana@example.com\n\n¿Hablamos? Tasa 5% & más\nSegunda línea");
    });
});
