import type {Lang} from "@/types/content";

export const notFoundCopy: Record<Lang, { title: string; description: string; home: string }> = {
    en: {
        title: "Page not found",
        description: "The page you are looking for does not exist or was moved.",
        home: "Go to the portfolio",
    },
    es: {
        title: "Página no encontrada",
        description: "La página que buscas no existe o fue movida.",
        home: "Ir al portafolio",
    },
};
