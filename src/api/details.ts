export const getDetail = async (id: string) => {
    const url = `http://localhost:3004/details/${id}`;
    const res = await fetch(url);
    return res.json();

}