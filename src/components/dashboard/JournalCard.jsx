import "./Dashboard.css";

import { deleteEntry } from "../../api/journalApi";

function JournalCard({

    entry,

    entries,

    setEntries

}) {

    const handleDelete = async () => {

        try {

            await deleteEntry(entry.id);

            setEntries(

                entries.filter(

                    journal => journal.id !== entry.id

                )

            );

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete journal entry.");

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

                    onClick={handleDelete}

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