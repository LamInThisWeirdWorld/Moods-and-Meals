import { supabase } from "../database-client";

type ResponseData = {
  mealName: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

export const addMeal = async (data: ResponseData) => {
    const { error } = await supabase.from("MealData").insert([
        {
            name: data.mealName,
            category: data.category,
            price: data.price,
            rate: data.rate,
            date: data.date,
            phase: data.phase,
        },
    ]).single();

    if (error) {
        console.error("Error adding meal:", error.message);
        return error.message;
    }

    return null;
}