import { supabase } from "../database-client";

export const fetchDisplayData = async () => {
    try {
        const { data, error } = await supabase.from("MealData").select("date, phase, mood, price, category").order("date", { ascending: true});

        if (error) {
            throw error;
        }

        return (data ?? []);

    } catch (err) {
        console.error("Unexpected error fetching meal list:", err);
        return;
    }
}