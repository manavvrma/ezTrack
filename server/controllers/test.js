import Site from "../models/SiteModel.js";
import Joi from "joi";
import { getPNI } from "../utils/getPrice.js";

// Get a specific Track by id
export const testURL = async (req, res, next) => {
  // Validate the URL
  const { value: url, error } = Joi.string().required().validate(req.body.url);
  if (error) return res.status(400).json({ error: error.details });

  // Extract domain from URL
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^:\/\n\?\=]+)/i;
  const match = url.match(regex);

  if (!match || !match[1]) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  const domain = match[1];
  console.log("Extracted domain:", domain);

  try {
    // Search for the site in the database
    console.log("Searching for site with name:", domain);
    const site = await Site.findOne({ name: domain });

    if (!site) {
      console.log("No site found for domain:", domain);
      return res.status(404).json({ message: "Site doesn't exist" });
    }

    console.log("Found site:", site);

    // Get price, name, and image from the URL
    const { name, price, image } = await getPNI(url, site);

    console.log("Extracted details:", { name, price, image });

    if (!price || !name) {
      return res
        .status(400)
        .json({ message: "Invalid URL or item not available" });
    }

    const resObject = {
      type: site.type,
      site: site.name,
      price,
      name,
      image,
      currency: site.currency,
    };

    console.log("Sending response:", resObject);

    res.status(200).json(resObject);
  } catch (error) {
    console.error("Error in testURL:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
