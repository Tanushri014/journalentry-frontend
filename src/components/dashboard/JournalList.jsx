import JournalCard from "./JournalCard";
import "./Dashboard.css";

function JournalList({ entries, setEntries }) {

    return (

        <section className="journal-list">

            <h4>

                {entries.length} ENTRIES

            </h4>

            {

                entries.length === 0 ?

                    (

                        <p>

                            No journal entries found.

                        </p>

                    )

                    :

                    (

                        entries.map((entry) => (

                            <JournalCard

                                key={entry.id}

                                entry={entry}

                                entries={entries}

                                setEntries={setEntries}

                            />

                        ))

                    )

            }

        </section>

    );

}

export default JournalList;