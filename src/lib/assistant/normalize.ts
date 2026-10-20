import {SYNONYMS} from "@/lib/assistant/synonyms";

// Phrases become single tokens before splitting, so a question's intent survives the stopwords and the language.
const PHRASES: [RegExp, string][] = [
    [/\b(este|esta|this)\s+(asistente|assistant|chat|bot)\b/g, " assistantself "],
    [/\b(como\s+funcionas|quien\s+eres|que\s+eres|how\s+do\s+you\s+work|who\s+are\s+you|what\s+are\s+you)\b/g, " assistantself "],
    [/\b((este|el)\s+(sitio|portafolio)|esta\s+(pagina|web)|(this|the)\s+(site|website|portfolio)|this\s+page)\b/g, " thissite "],
    [/\b(quien\s+es|who\s+is)\b/g, " aboutperson "],
    [/\b(hablame|cuentame)\s+(de|sobre)\s+(el|sebastian|su\s+perfil)\b/g, " aboutperson "],
    [/\b(tell\s+me\s+about|introduce)\s+(him|sebastian|his\s+profile)\b/g, " aboutperson "],
    [/\bpor\s+que\b/g, " why "],
    [/\b((forma|manera)\s+de\s+trabajar|como\s+trabaja|how\s+(does\s+)?he\s+works?|work(ing)?\s+style)\b/g, " mindset "],
    [/\b(como|cuando)\s+(empezo|comenzo|inicio)\b/g, " trajectory "],
    [/\bhow\s+did\s+he\s+(start|begin|get\s+started)\b/g, " trajectory "],
    [/\b(inteligencia\s+artificial|artificial\s+intelligence)\b/g, " ai "],
    [/\b(hacking\s+etico|ethical\s+hacking)\b/g, " hacking "],
    [/\bmuv[\s-]?u\b/g, " muvu "],
    [/\bhigh\s+school\b/g, " highschool "],
    [/\blanding\s+pages?\b/g, " landing "],
    [/\bc#/g, " csharp "],
    [/\bc\+\+/g, " cpp "],
    [/\bci\s*\/\s*cd\b/g, " cicd "],
    [/\b(node|next|vue)\.?js\b/g, " $1js "],
    [/\bpower\s+bi\b/g, " powerbi "],
    [/\bspring\s+boot\b/g, " springboot "],
    [/\bgithub\s+actions\b/g, " githubactions "],
    [/\bopen\s+source\b/g, " opensource "],
    [/\bhojas?\s+de\s+vida\b/g, " cv "],
    [/\bbases?\s+de\s+datos\b/g, " database "],
    [/\b(full|back|front)[\s-]?end\b/g, " $1end "],
    [/\bfull[\s-]?stack\b/g, " fullstack "],
    [/\bdev\s?ops\b/g, " devops "],
    [/\bsmart\s?pot\b/g, " smartpot "],
    [/\bgo\s?poli\b/g, " gopoli "],
    [/\bpepper\s?crm\b/g, " peppercrm "],
    [/\bmachine\s+learning\b/g, " ml "],
    [/\bhow\s+much\b/g, " howmuch "],
    [/\bhow\s+many\b/g, " howmany "],
    [/\bcuant[oa]s?\b/g, " howmany "],
];

const STOPWORDS = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "can", "could", "did", "do", "does", "for", "from", "had", "has", "have",
    "he", "her", "him", "his", "i", "in", "is", "it", "its", "me", "of", "on", "or", "she", "so", "that", "the", "their",
    "them", "there", "this", "to", "was", "what", "which", "who", "why", "will", "with", "would", "you", "your", "about", "any",
    "al", "algo", "algun", "alguna", "como", "con", "cual", "cuales", "de", "del", "el", "ella", "en", "es", "esta", "este",
    "ha", "hay", "la", "las", "le", "lo", "los", "me", "mi", "para", "por", "que", "quien", "se", "sobre", "su", "sus", "tiene",
    "tu", "un", "una", "uno", "y", "o", "ya", "sebastian", "lopez", "osorno", "hecho", "done", "know", "sabe",
]);

export const normalize = (text: string) => {
    let value = text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    for (const [pattern, replacement] of PHRASES) value = value.replace(pattern, replacement);
    return value;
};

export const stem = (word: string) => {
    if (word.length <= 3 || word.endsWith("js")) return word;
    if (word.endsWith("ciones")) return word.slice(0, -2);
    if (word.endsWith("ies") && word.length > 4) return `${word.slice(0, -3)}y`;
    if (word.endsWith("s") && !word.endsWith("ss") && !word.endsWith("us")) return word.slice(0, -1);
    return word;
};

const canonical = (word: string) => SYNONYMS[word] ?? SYNONYMS[stem(word)] ?? stem(word);

const words = (text: string) => normalize(text).split(/[^a-z0-9]+/).filter(Boolean);

export const tokenize = (text: string) => words(text).map(canonical);

export const terms = (text: string) =>
    words(text)
        .filter((word) => word.length > 1 && !STOPWORDS.has(word))
        .map(canonical);
