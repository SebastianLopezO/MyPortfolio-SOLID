import type {Content} from "@/types/content";

export const contact: Content["contact"] = {
    title: "Contáctame",
    subtitle: {
        general: "Cuéntame del cargo o del problema que quieres resolver",
        backend: "Cuéntame qué sistemas necesitas conectar o qué servicio necesitas construir",
        crm: "Cuéntame qué proceso del CRM quieres automatizar o integrar",
        data: "Cuéntame qué datos tienes y qué pregunta quieres responder con ellos",
        devops: "Cuéntame qué necesitas desplegar, vigilar o automatizar",
        fullstack: "Cuéntame qué producto web quieres construir o mejorar",
    },
    connect: "Escríbeme directamente",
    description: "Respondo por correo o por WhatsApp. Si es por una vacante, el enlace a la oferta me ayuda a responder con lo que te importa.",
    labels: {location: "Ubicación", phone: "Teléfono", email: "Correo", linkedin: "LinkedIn"},
    form: {
        name: "Nombre completo",
        email: "Correo electrónico",
        message: "Mensaje",
        send: "Enviar por WhatsApp",
        sendEmail: "Enviar por correo",
        note: "El mensaje se abre en WhatsApp o en tu app de correo, listo para enviar; este sitio no guarda ningún dato.",
    },
    placeholders: {
        name: "Tu nombre completo",
        email: "tu@empresa.com",
        message: "Cuéntame sobre la vacante, el proyecto o tu consulta…",
    },
    whatsappIntro: "Hola Sebastián, te escribo desde tu portafolio.",
    emailSubject: "Desde tu portafolio",
    copyEmail: {
        label: "Copiar la dirección de correo",
        done: "Dirección de correo copiada",
        failed: "No se pudo copiar; selecciona la dirección"
    },
};
