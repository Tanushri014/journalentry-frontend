import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";

function DashboardHeader({
  selectedMood,
  setSelectedMood,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <section className="dashboard-header">

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd MMM yyyy"
        placeholderText="Filter by date"
        isClearable
        className="date-filter"
      />

      <select
        className="mood-filter"
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
      >
        <option value="">All Moods</option>
        <option value="HAPPY">😊 Happy</option>
        <option value="SAD">😢 Sad</option>
        <option value="EXCITED">🤩 Excited</option>
        <option value="NEUTRAL">😐 Neutral</option>
        <option value="ANGRY">😡 Angry</option>
      </select>

    </section>
  );
}

export default DashboardHeader;