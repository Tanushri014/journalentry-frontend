import api from "./api";

/**
 * Create Journal Entry
 */
export const createEntry = async (journalEntry) => {

    const response = await api.post(
        "/journal",
        journalEntry
    );

    return response.data;
};

/**
 * Get All Journal Entries
 */
export const getAllEntries = async () => {

    const response = await api.get("/journal");

    return response.data;
};

/**
 * Get One Journal Entry
 */
export const getEntryById = async (id) => {

    const response = await api.get(
        `/journal/${id}`
    );

    return response.data;
};

/**
 * Update Journal Entry
 */
export const updateEntry = async (
    id,
    journalEntry
) => {

    const response = await api.put(
        `/journal/${id}`,
        journalEntry
    );

    return response.data;
};

/**
 * Delete Journal Entry
 */
export const deleteEntry = async (id) => {

    const response = await api.delete(
        `/journal/${id}`
    );

    return response.data;
};

/**
 * Get Quote
 */
export const getQuote = async () => {

    const response = await api.get(
        "/journal/quote"
    );

    return response.data;
};

/**
 * Filter By Date
 */
export const filterByDate = async (date) => {

    const response = await api.get(
        "/journal/search",
        {
            params: {
                date
            }
        }
    );

    return response.data;
};

/**
 * Filter By Mood
 */
export const filterByMood = async (mood) => {

    const response = await api.get(
        "/journal/mood",
        {
            params: {
                mood
            }
        }
    );

    return response.data;
};