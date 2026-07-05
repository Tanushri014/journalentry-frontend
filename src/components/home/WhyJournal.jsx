import "./WhyJournal.css";

const features = [
  {
    icon: "🌙",
    title: "Quiet your mind",
    description:
      "Writing before bed clears the mental noise of the day. Journaling helps reduce anxiety and allows you to sleep with a calmer mind.",
  },
  {
    icon: "📈",
    title: "Track your growth",
    description:
      "Looking back at your past entries reveals your progress, habits, moods, and personal achievements over time.",
  },
  {
    icon: "❤",
    title: "Know yourself better",
    description:
      "Daily reflection improves self-awareness, emotional intelligence, and helps you make more thoughtful decisions.",
  },
  {
    icon: "🛡",
    title: "Entirely private",
    description:
      "Your journal belongs only to you. Your entries stay secure and protected, giving you a safe place to be yourself.",
  },
];

function WhyJournal() {
  return (
    <section  id="features" className="why-journal">

      <div className="section-header">

        <span className="section-tag">
          WHY JOURNAL?
        </span>

        <h2>
          Writing is the oldest form of self-knowledge.
        </h2>

      </div>

      <div className="feature-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="icon-box">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyJournal;