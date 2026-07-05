function MoodSelector({ mood, setMood }) {

    const moods = [

        {
            label: "😊 Happy",
            value: "HAPPY"
        },

        {
            label: "😢 Sad",
            value: "SAD"
        },

        {
            label: "🤩 Excited",
            value: "EXCITED"
        },

        {
            label: "😐 Neutral",
            value: "NEUTRAL"
        },

        {
            label: "😡 Angry",
            value: "ANGRY"
        }

    ];

    return (

        <div className="mood-section">

            <label>
                HOW ARE YOU FEELING?
            </label>

            <div className="mood-buttons">

                {moods.map((item) => (

                    <button
                        type="button"
                        key={item.value}
                        className={
                            mood === item.value
                                ? "mood-btn active"
                                : "mood-btn"
                        }
                        onClick={() => setMood(item.value)}
                    >
                        {item.label}
                    </button>

                ))}

            </div>

        </div>

    );
}

export default MoodSelector;