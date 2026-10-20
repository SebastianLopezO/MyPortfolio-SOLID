import type {RoleId} from "@/content/roles";
import type {Fact} from "@/types/assistant";

const K1 = 1.2;
const B = 0.75;
const ROLE_BOOST = 1.25;

export interface SearchIndex {
    facts: Fact[];
    frequencies: Map<string, number>[];
    idf: Map<string, number>;
    averageLength: number;
}

export interface Hit {
    fact: Fact;
    score: number;
}

export const createIndex = (facts: Fact[]): SearchIndex => {
    const frequencies = facts.map((fact) => {
        const counts = new Map<string, number>();
        for (const term of fact.terms) counts.set(term, (counts.get(term) ?? 0) + 1);
        return counts;
    });
    const documents = new Map<string, number>();
    for (const counts of frequencies) for (const term of counts.keys()) documents.set(term, (documents.get(term) ?? 0) + 1);
    const idf = new Map(
        [...documents].map(([term, count]) => [term, Math.log(1 + (facts.length - count + 0.5) / (count + 0.5))]),
    );
    const averageLength = facts.reduce((sum, fact) => sum + fact.terms.length, 0) / Math.max(facts.length, 1);
    return {facts, frequencies, idf, averageLength};
};

export const search = (index: SearchIndex, query: string[], roles: (RoleId | null)[] = [], limit = 3): Hit[] => {
    const unique = [...new Set(query)].filter((term) => index.idf.has(term));
    if (unique.length === 0) return [];
    const boosted = roles.filter((role): role is RoleId => role !== null);

    const hits = index.facts.map((fact, position) => {
        const counts = index.frequencies[position];
        const length = fact.terms.length / index.averageLength;
        let score = 0;
        for (const term of unique) {
            const frequency = counts.get(term) ?? 0;
            if (frequency === 0) continue;
            score += (index.idf.get(term) ?? 0) * ((frequency * (K1 + 1)) / (frequency + K1 * (1 - B + B * length)));
        }
        if (score > 0 && boosted.some((role) => fact.roles.includes(role))) score *= ROLE_BOOST;
        return {fact, score};
    });

    const ranked = hits.filter((hit) => hit.score > 0).sort((a, b) => b.score - a.score);
    const best = ranked[0]?.score ?? 0;
    return ranked.filter((hit) => hit.score >= best * 0.5).slice(0, limit);
};
