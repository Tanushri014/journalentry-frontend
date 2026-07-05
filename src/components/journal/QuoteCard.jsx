function QuoteCard({ quote, setQuote }) {

    const handleGenerateQuote = async () => {
        try {
            const response = await getQuote();
            setQuote(response.quote);
        } catch (error) {
            console.error(error);
            alert("Unable to generate quote.");
        }
    };

    return (
        <div className="quote-section">

            <p className="quote-heading">
                ✨ Need a little inspiration?
            </p>

            <button
                className="quote-btn"
                type="button"
                onClick={handleGenerateQuote}
            >
                Generate Quote
            </button>

            {quote && (
                <div className="quote-result">

                    <textarea
                        value={quote}
                        readOnly
                    />

                    <button
                        type="button"
                        className="copy-btn"
                        onClick={() =>
                            navigator.clipboard.writeText(quote)
                        }
                    >
                        📋 Copy Quote
                    </button>

                </div>
            )}

        </div>
    );
}

export default QuoteCard;