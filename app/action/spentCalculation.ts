// fetch date and price from database. export calculation base on month or week

type ResponseData = {
  name: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

export function sumSpent(meals: ResponseData[]): number {
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