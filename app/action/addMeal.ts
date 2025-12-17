import { supabase } from "../database-client";
import type { InputData } from "@/lib/meal"


// type ResponseData = {
//   mealName: string;
//   category: string;
//   price: number;
//   rate: number;
//   date: string;
//   phase: string;
// };

// Function to add a meal to the database
export const addMeal = async (data: InputData) => {
    const { error } = await supabase.from("MealData").insert([
        {
            name: data.name,
            category: data.category,
            price: data.price,
            rate: data.rate,
            date: data.date,
            phase: data.phase,
            mood: data.mood,
            note: data.note,
            place: data.place,
        },
    ]).single();

    if (error) {
        console.error("Error adding meal:", error.message);
        return error.message;
    }


    return null;
}