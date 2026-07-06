import { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import JournalList from "../components/dashboard/JournalList";

import {
    getAllEntries,
    filterByMood,
    filterByDate
} from "../api/journalApi";

function DashboardPage() {

    const [entries, setEntries] = useState([]);

    const [selectedMood, setSelectedMood] = useState("");

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {

        loadEntries();

    }, []);

    useEffect(() => {

        applyFilters();

    }, [selectedMood, selectedDate]);

    const loadEntries = async () => {

        try {

            const data = await getAllEntries();

            setEntries(data);

        } catch (error) {

            console.error(error);

        }

    };

    const applyFilters = async () => {

        try {

            if (selectedMood !== "") {

                const data =
                    await filterByMood(selectedMood);

                setEntries(data);

                return;
            }

            if (selectedDate) {

    const formattedDate = selectedDate
        .toISOString()
        .split("T")[0];

    const data = await filterByDate(formattedDate);

    setEntries(data);

    return;
}

            loadEntries();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <DashboardNavbar />

            <DashboardHeader

                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}

                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}

            />

            <JournalList

                entries={entries}
                setEntries={setEntries}

            />

        </>

    );

}

export default DashboardPage;