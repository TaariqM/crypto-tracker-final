/**
 * Array that holds the values that the crypto coins can be sorted by.
 * This array is created to make sorting of the crypto coins easier,
 * as the options in the drop down menu are not exactly the same as whats in the array of objects.
 * For example, 'Current Price' in the drop down menu is not equal to 'price'
 */
const dropDownOptions = ["price", "market", "volume", "change"];

/**
 * Function that will filter the coins with the specific search text that was inputted in the search bar
 *
 * @param {string} searchText
 * @returns the coinData array that is filtered if there is text in the search box, otherwise returns nothing
 */
export const filter = (searchText, unfilteredArray) => {
  if (!searchText) {
    return;
  }

  const filterCoins = unfilteredArray.filter((coin) => {
    return coin.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return filterCoins;
};

/**
 * Function that will sort the coins in descending order, depending on what dropdown menu option is selected
 *
 * @param {string} selectedOption
 * @returns the coinMarketCapData array that is sorted if there is a dropdown menu option selected, otherwise returns nothing
 */
export const sortCoins = (selectedOption, unsortedArray) => {
  if (!selectedOption) {
    return;
  }

  const sortedCoins = [...unsortedArray]; // make a copy of the coins that may or may not be filtered by the search input text
  let menuOption = ""; // this variable will store what menu option will be used to sort the coinData array

  // for loop that checks if any of the string items in the 'dropDownOptions' array, is within the 'selectedOption' string
  // this will tell me what string in the 'dropDownOptions' array I should use, to sort the crypto coins
  for (let dropDownOption of dropDownOptions) {
    if (selectedOption.toLowerCase().includes(dropDownOption)) {
      menuOption = dropDownOption;
      break;
    }
  }

  // Based on what the dropdown menu option is, the crypto coins will be sorted in descending order using the sort function -> sort((a,b) => (b - a))
  switch (menuOption) {
    case "price":
      sortedCoins.sort((a, b) => {
        return Number(b.price) - Number(a.price);
      });
      break;
    case "market":
      sortedCoins.sort((a, b) => {
        return Number(b.marketCap) - Number(a.marketCap);
      });
      break;
    case "volume":
      sortedCoins.sort((a, b) => {
        return Number(b.volume_24) - Number(a.volume_24);
      });
      break;
    case "change":
      sortedCoins.sort((a, b) => {
        return Number(b.change_24) - Number(a.change_24);
      });
      break;
    default:
      return;
  }

  return sortedCoins;
};
