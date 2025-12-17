import { supabase } from "../database-client";
import { ResponseData } from "@/lib/meal";

export default async function getMealPage(id: string) {
    const { data, error } = await supabase
        .from("MealData")
        .select(`*,
            WeatherTemp (
                temperature,
                weather
            )
        `)
        .eq("id", id)
        .single();

    if (error) {
        return null;
    }

    return (data ?? null);

}