export const fetcher = async <T>(url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data as T;
  } catch (err) {
    throw new Error("" + err);
  }
};
