import { supabase } from "../database-client";

export default async function deleteMeal(id: string) {
    const { data: images, error: fetchImageError } = await supabase
            .from('MealImages')
            .select('image_url')
            .eq('meal_id', id);
    
    if (fetchImageError) throw fetchImageError;

    
    if (images && images.length > 0) {
        const paths = images.map((img) => img.image_url);

        const { error: storageError } = await supabase.storage
        .from('meal-images')
        .remove(paths);

        console.log(paths);

        if (storageError) throw storageError;
    }    

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