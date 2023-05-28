import {HEADER_MSG_VIDEO} from "./constants";

export const isVideo = (text) => {
    if(text.includes(HEADER_MSG_VIDEO)) return true;
    return false;
}
export const getURLVideo = (text) => {
    if(text.includes(HEADER_MSG_VIDEO)) {
        return text.substring(text.indexOf('=') + 1, text.length);
    }
    return '';
}
export function isJSON(str) {
    try {
        const searchStrings = ["{", "}", "[", "]", "text", "imgs"];
        for (const searchStringsKey of searchStrings) {
            if (!str.includes(searchStringsKey)) return false;
        }
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}