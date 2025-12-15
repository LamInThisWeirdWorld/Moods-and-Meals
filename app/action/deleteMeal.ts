import { supabase } from "../database-client";

export default async function deleteMeal(id: string) {
    const { data, error } = await supabase
        .from("MealData")
        .delete()
        .eq("id", id)
        .single()

    if (error) {
        return error;
    }  
    
    return;
}