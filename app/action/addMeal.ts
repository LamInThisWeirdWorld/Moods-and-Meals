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
    const { data: meal, error: mealError } = await supabase.from("MealData").insert([
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
    ])
    .select("id")
    .single();

    if (mealError) {
        console.error("Error adding meal:", mealError.message);
        return mealError.message;
    }

    const { error: weatherError } = await supabase.from("WeatherTemp").insert({
        id: meal.id,
        temperature: data.temperature,
        weather: data.weather,
    })
    .single();

    if (weatherError) {
        console.error("Error adding meal:", weatherError.message);
        return weatherError.message;
    }
    


    return null;
}