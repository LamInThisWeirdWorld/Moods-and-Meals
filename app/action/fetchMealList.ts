import { supabase } from "../database-client";
import DataTable from "@/components/data-table";
// import type { ResponseData } from "@/lib/meal"

// type ResponseData = {
//   name: string;
//   category: string;
//   price: number;
//   rate: number;
//   date: string;
//   phase: string;
// };

export const fetchMealList = async () => {
    try {
        const { data, error } = await supabase.from("MealData").select("*").order("date", { ascending: true});

        if (error) {
            throw error;
        }

        return (data ?? []);

    } catch (err) {
        console.error("Unexpected error fetching meal list:", err);
        return;
    }
}



