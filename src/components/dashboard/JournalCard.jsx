import "./Dashboard.css";

import { deleteEntry } from "../../api/journalApi";

function JournalCard({

    entry,

    entries,

    setEntries

}) {
const handleDelete = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to permanently delete this journal entry?\n\nThis action cannot be undone."
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteEntry(id);

        // Remove the deleted entry from the UI
        setEntries(
            entries.filter((entry) => entry.id !== id)
        );

        alert("Journal entry deleted permanently.");

    } catch (error) {

        console.error(error);

        alert("Failed to delete entry.");
    }
};


    

    

    return (

        <div className="journal-card">

            <div className="journal-top">

                <div className="journal-meta">

                    <span className="journal-date">

                        {

                            new Date(entry.date)

                                .toLocaleDateString(

                                    "en-IN",

                                    {

                                        weekday: "long",

                                        year: "numeric",

                                        month: "long",

                                        day: "numeric"

                                    }

                                )

                        }

                    </span>

                    <span

                        className={`mood-badge ${entry.mood.toLowerCase()}`}

                    >

                        {entry.mood}

                    </span>

                </div>

                <button

                    className="delete-btn"

                    onClick={()=>handleDelete(entry.id)}

                >

                    🗑

                </button>

            </div>

            <h2 className="journal-title">

                {entry.title}

            </h2>

            {

                entry.quote &&

                (

                    <blockquote className="journal-quote">

                        "{entry.quote}"

                    </blockquote>

                )

            }

            <p className="journal-content">

                {entry.content}

            </p>

        </div>

    );

}

export default JournalCard;