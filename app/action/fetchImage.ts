import { supabase } from "../database-client";

export const fetchImage = async (mealId: string) => {
    const { data: images, error } = await supabase
        .from("MealImages")
        .select("image_url")
        .eq("meal_id", mealId);

    if (error) throw error;

    return images;
}