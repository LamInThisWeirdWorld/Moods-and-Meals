import { supabase } from "../database-client";
import type { InputData } from "@/lib/meal"
import { uploadImages } from "./uploadImages";


// type ResponseData = {
//   mealName: string;
//   category: string;
//   price: number;
//   rate: number;
//   date: string;
//   phase: string;
// };

// Function to add a meal to the database
export const addMeal = async (data: InputData, images: File[]) => {
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

    const mealId = meal.id

    const { error: weatherError } = await supabase.from("WeatherTemp").insert({
        id: mealId,
        temperature: data.temperature,
        weather: data.weather,
    })
    .single();

    if (weatherError) {
        console.error("Error adding meal:", weatherError.message);
        return weatherError.message;
    }

    // upload images to storage using images and mealId to create path
    const imagePaths = await uploadImages(images, mealId);

    // for each image, get its mealId and image path
    const rows = imagePaths.map((path) => ({
        meal_id: mealId,
        image_url: supabase.storage
            .from("meal-images")
            .getPublicUrl(path).data.publicUrl,
    }));

    // insert those data to the MealImages table
    await supabase.from("MealImages").insert(rows);
    

    return null;
}