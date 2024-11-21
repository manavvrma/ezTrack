import {
  getAllTracks,
  getAllSites,
  updateHistory,
  updateStatus,
} from "./functions.js";
import getPrice from "./fetchPrice.js";
import sendMail from "./sendMail.js";
import EmailTemplate from "./emailTemplate.js";

const runBot = async () => {
  try {
    console.log("Fetching all tracks and sites...");
    const tracks = await getAllTracks();
    const sites = await getAllSites();

    console.log(`Tracks to process: ${tracks.length}`);
    console.log(`Sites fetched: ${sites.length}`);

    tracks.map(async (track) => {
      const { _id, url, site, demandPrice, history, user, type, name, image } =
        track;
      const siteDetails = sites.filter((s) => s.name === site)[0];

      if (!siteDetails) {
        console.log(`Site details not found for site: ${site}`);
        return;
      }

      const { priceLocation, currency } = siteDetails;

      console.log(`Processing track: ${name} (${_id})`);

      try {
        const price = await getPrice(url, priceLocation, site);
        console.log(`Fetched price: ${price}`);

        const newHistory = {
          price,
          date: new Date(), // Adding timestamp for history entries
        };

        const updatedHistory = [...(history || []), newHistory];
        console.log(`Updated history:`, updatedHistory);

        const historyUpdated = await updateHistory(_id, updatedHistory);
        if (!historyUpdated) {
          console.log(`Failed to update history for track: ${_id}`);
          return;
        }

        let currencySymbol = "";
        if (currency === "INR") {
          currencySymbol = "₹";
        } else if (currency === "USD") {
          currencySymbol = "$";
        } else if (currency === "EUR") {
          currencySymbol = "€";
        } else if (currency === "GBP") {
          currencySymbol = "£";
        } else if (currency === "NPR") {
          currencySymbol = "रु";
        } else {
          currencySymbol = currency;
        }

        if (price < demandPrice) {
          const message = EmailTemplate(
            name,
            url,
            price,
            demandPrice,
            image,
            type,
            currencySymbol
          );

          const titleName =
            name.length > 35 ? `${name.substring(0, 35)}...` : name;

          console.log(
            `Price is below demand price! Sending notification for track: ${name}`
          );

          // Send mail to the user
          sendMail(
            user,
            `Hurry up! The ${type} price of ${titleName} is low`,
            message
          );

          const statusUpdated = await updateStatus(_id, true); // If mail is sent
          if (statusUpdated) {
            console.log(`Status updated to 'informed' for track: ${_id}`);
          } else {
            console.log(`Failed to update status for track: ${_id}`);
          }
        } else {
          console.log(
            `Price (${price}) is not below demand price (${demandPrice}) for track: ${name}`
          );
        }
      } catch (error) {
        console.log(`Error processing track: ${name} (${_id})`, error.message);
      }
    });
  } catch (error) {
    console.log("Error running bot:", error.message);
  }
};

export default runBot;
