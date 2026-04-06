import axios from "axios";

export const getProductsData = async () => {
  try {
    const response = await axios.get(
      "https://gist.githubusercontent.com/di-Suza/59fa232dbac95321663553f9a1896678/raw/0d2413d81b3a7ec15ca7d97ec3bd6ebe18eda973/products.json",
    );
    return response.data;
  } catch (error) {
    console.error("API ERROR ❌", error);
  }
};
