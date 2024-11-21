// import axios from "axios";
// import * as cheerio from "cheerio";

// export const fetchCheerio = async (
//   URL,
//   priceLocation,
//   nameLocation,
//   imageLocation,
//   type
// ) => {
//   try {
//     const { data } = await axios.get(URL, {
//       headers: {
//         Accept: "application/json",
//         "User-Agent": "axios 0.21.1",
//       },
//     });

//     const $ = cheerio.load(data);
//     let image;

//     let name = $(nameLocation)
//       .text()
//       .trim()
//       .replace(/(<([^>]+)>)/gi, "");

//     let price = $(priceLocation)
//       .text()
//       .replace(/([$,₹£A-Za-z])/g, "")
//       .trim();

//     if (type === "product") {
//       image = $(imageLocation).attr("src");
//     }

//     return { price, name, image };
//   } catch (error) {
//     throw error;
//   }
// };

import axios from "axios";
import * as cheerio from "cheerio";

export const fetchCheerio = async (
  URL,
  priceLocation,
  nameLocation,
  imageLocation,
  type
) => {
  try {
    const { data } = await axios.get(URL, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    let image;

    let name = $(nameLocation)
      .text()
      .trim()
      .replace(/(<([^>]+)>)/gi, "");
    let price = $(priceLocation)
      .text()
      .replace(/([$,₹£A-Za-z])/g, "")
      .trim();

    if (type === "product") {
      image = $(imageLocation).attr("src") || ""; // Default to empty string if no src attribute
    }

    return { price, name, image };
  } catch (error) {
    console.error("Error fetching data:", error.message); // Log the error message for better debugging
    throw error;
  }
};
