import "./JournalForm.css";
import QuoteCard from "./QuoteCard";
import MoodSelector from "./MoodSelector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createEntry } from "../../api/journalApi";

function JournalForm() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [quote, setQuote] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createEntry({
                title,
                content,
                mood,
                quote
            });

            alert("Journal entry created successfully.");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to create journal entry."
            );
        }
    };

    return (

        <div className="journal-page">

            <div className="journal-container">

                <div className="journal-header">

                    <h2>✍ New Entry</h2>

                    <button
                        className="close-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        ✕
                    </button>

                </div>

                <QuoteCard
                    quote={quote}
                    setQuote={setQuote}
                />

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Title</label>

                        <input
                            type="text"
                            placeholder="Give your day a name..."
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Your Thoughts</label>

                        <textarea
                            rows="8"
                            placeholder="Let it out. No one is watching..."
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            required
                        />

                    </div>

                    <MoodSelector
                        mood={mood}
                        setMood={setMood}
                    />

                    <div className="journal-buttons">

                        <button
                            className="save-btn"
                            type="submit"
                        >
                            Save Entry
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default JournalForm;