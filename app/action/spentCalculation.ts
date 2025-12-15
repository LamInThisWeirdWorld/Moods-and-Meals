// fetch date and price from database. export calculation base on month or week

type ResponseData = {
  name: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

export function sumSpentMonthly(meals: ResponseData[]): number {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    return meals
        .filter((m) => {
            const d = new Date(m.date);
            return d.getFullYear() === year && d.getMonth() + 1 === month;
        })
        .reduce((sum, m) => sum + Number(m.price), 0);


}

export function sumSpentWeekly(meals: ResponseData[]): number {
    const now = new Date();

    const dayOfWeek = now.getDate();
    // Calculate day to Monday
    const diffToMonday = (dayOfWeek + 6) % 7;
    console.log({diffToMonday});

    // Set monday date
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    // Set sunday date
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return( meals
        .filter((m) => {
            const d = new Date(m.date);
            if (d >= monday && d <= sunday) 
            return d >= monday && d <= sunday    
        })
        .reduce((sum, m) => sum + Number(m.price), 0)
    )

}