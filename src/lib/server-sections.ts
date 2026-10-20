import type {Component} from "solid-js";
import type {SectionId} from "@/types/content";

let sections: Record<SectionId, Component> | null = null;

/**
 * The server entry registers the home sections so the prerender renders them in place, without the client bundle
 * importing them: in the browser each one loads in its own chunk (components/sections/SectionSlot.tsx).
 */
export const registerServerSections = (components: Record<SectionId, Component>) => {
    sections = components;
};

export const serverSection = (id: SectionId) => sections?.[id] ?? null;
