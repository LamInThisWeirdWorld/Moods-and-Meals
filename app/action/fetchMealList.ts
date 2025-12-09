import { supabase } from "../database-client";
import DataTable from "@/components/data-table";

type ResponseData = {
  name: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

export const fetchMealList = async () => {
    try {
        const { data, error } = await supabase.from("MealData").select("*").order("created_at", { ascending: true});

        if (error) {
            throw error;
        }

        return (data ?? []);

    } catch (err) {
        console.error("Unexpected error fetching meal list:", err);
        return;
    }
}



