export type ResidentGroup = "Bachelors" | "Bachelorettes" | "Villagers";

import type { Season } from "@/data/types";

export interface Resident {
  name: string;
  group: ResidentGroup;
  favorite: string[];
  likes: string[];
  birthday?: { season: Season; day: number };
  external_doc: string;
}

export const residents: Resident[] = [
  // Bachelors
  {
    name: "Jules",
    group: "Bachelors",
    favorite: ["Herbal Perfume"],
    likes: [
      "Herbs",
      "Perfumes",
      "Salads",
      "Chamomile",
      "Mint",
      "Floral Perfume",
    ],
    birthday: { season: "Autumn", day: 20 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543450",
  },
  {
    name: "Derek",
    group: "Bachelors",
    favorite: [
      "Cream Croquettes",
      "Rhinoceros Beetle",
      "Elephant Beetle",
      "Hercules Beetle",
      "Hot Pot",
    ],
    likes: ["Stag Beetles", "Curries", "Ricebowl Dishes", "Tea Leaves"],
    birthday: { season: "Summer", day: 12 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543500",
  },
  {
    name: "Lloyd",
    group: "Bachelors",
    favorite: ["Gold Medal", "Diamond", "Boullabaisse", "Paella"],
    likes: [
      "Fondues",
      "Bugs",
      "Juices",
      "Magic Blue Flower",
      "Smallheaded Locusts",
    ],
    birthday: { season: "Autumn", day: 3 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543501",
  },
  {
    name: "Gabriel",
    group: "Bachelors",
    favorite: ["Omelet Rice", "Tofu"],
    likes: ["Gratin", "Fruit Dishes", "Ice Cream", "Pizza", "Sweets"],
    birthday: { season: "Winter", day: 28 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543502",
  },
  {
    name: "Samir",
    group: "Bachelors",
    favorite: ["Cooked Rice", "Chocolate-Covered Banana", "Cookies", "Stew"],
    likes: ["Rice", "Rice Dishes", "Grilled Fish", "Stag Beetles"],
    birthday: { season: "Winter", day: 26 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543503",
  },
  {
    name: "Arata",
    group: "Bachelors",
    favorite: ["Unadon", "Warm Milk", "Rainbow Curry"],
    likes: ["Milk", "Sashimi", "Onigiri", "Omelet", "Fishes", "Curries"],
    birthday: { season: "Winter", day: 17 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543504",
  },

  // Bachelorettes
  {
    name: "Sophie",
    group: "Bachelorettes",
    favorite: ["Herb Salad"],
    likes: ["Pickles", "Salads", "Moondrop Flower", "Rice Porridge"],
    birthday: { season: "Spring", day: 16 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543485",
  },
  {
    name: "June",
    group: "Bachelorettes",
    favorite: ["Cherry Tea"],
    likes: ["Accessories", "Teas", "Frogs"],
    birthday: { season: "Winter", day: 12 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543486",
  },
  {
    name: "Freya",
    group: "Bachelorettes",
    favorite: [
      "Pizza",
      "Citrus Perfume",
      "Moonstone",
      "Peridot",
      "Topaz",
      "Sandstone",
      "Any Gem",
    ],
    likes: ["Accessories", "Jewels", "Swallowtail Butterfly", "Warm Milk"],
    birthday: { season: "Autumn", day: 25 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543487",
  },
  {
    name: "Maple",
    group: "Bachelorettes",
    favorite: ["Engadiner Nusstorte", "Cookies", "Pancakes", "Churros"],
    likes: ["Sweets", "Flowers", "Butterflies", "Honey Juice", "Walnut Juice"],
    birthday: { season: "Autumn", day: 14 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543488",
  },
  {
    name: "Kagetsu",
    group: "Bachelorettes",
    favorite: ["Soy Milk Pudding"],
    likes: ["Soy Milk", "Tofu Dishes", "Vegetable Dishes", "Crops"],
    birthday: { season: "Spring", day: 5 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543489",
  },
  {
    name: "Diana",
    group: "Bachelorettes",
    favorite: ["Apple Pie", "Apple Jam", "Apple Juice"],
    likes: [
      "Apples",
      "Teas",
      "Butterflies",
      "Cookies",
      "Pancakes",
      "Ice Cream",
    ],
    birthday: { season: "Autumn", day: 22 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543490",
  },

  // Villagers (page 1)
  {
    name: "Felix",
    group: "Villagers",
    favorite: ["Spicy Curry", "Bouillabaisse", "Rainbow Curry", "Rice Gratin"],
    likes: ["Curries", "Stag Beetles", "Magic Red Grass", "Cheese", "Risotto"],
    birthday: { season: "Summer", day: 1 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543871",
  },
  {
    name: "Erik",
    group: "Villagers",
    favorite: ["Black Tea", "Chamomile Tea", "Any Spring Blend Tea"],
    likes: [
      "Teas",
      "Juices",
      "Salads",
      "Pancakes",
      "Onion Salad",
      "Cafe au Lait",
      "Green Tea",
    ],
    birthday: { season: "Spring", day: 20 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543873",
  },
  {
    name: "Stuart",
    group: "Villagers",
    favorite: ["Mont Blanc Cake", "Pasta", "Spring Tea"],
    likes: ["Noodles", "Teas", "Pickles", "Honey Juice", "Fried Egg"],
    birthday: { season: "Autumn", day: 11 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543874",
  },
  {
    name: "Sonia",
    group: "Villagers",
    favorite: [
      "Strawberry Juice",
      "Tomato Juice",
      "Any fruit juice",
      "Strawberry Pie",
      "Cherry Tea",
    ],
    likes: ["Juices", "Teas", "Wild Herbs", "Poached Egg", "Toy Flower"],
    birthday: { season: "Spring", day: 25 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543875",
  },
  {
    name: "Madeleine",
    group: "Villagers",
    favorite: ["Fruit Sandwich", "Strawberry Pie"],
    likes: ["Pies", "Wild Herbs", "Fruits Dishes", "Strawberry", "Rice Flour"],
    birthday: { season: "Spring", day: 18 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543876",
  },
  {
    name: "Mina",
    group: "Villagers",
    favorite: ["Herb Pasta", "Mushroom Pasta"],
    likes: ["Herbs", "Herbs Dishes", "Wild Herbs", "Cookies", "Pansy"],
    birthday: { season: "Winter", day: 4 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543877",
  },
  {
    name: "Wilbur",
    group: "Villagers",
    favorite: ["Steamed Mushroom"],
    likes: ["Eggplant Dishes", "Fishes", "Beetles", "Cooked Rice"],
    birthday: { season: "Summer", day: 3 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543878",
  },
  {
    name: "Clara",
    group: "Villagers",
    favorite: ["Pickled Broccoli", "Pickled Onion", "Any Pickles"],
    likes: ["Pickles", "Homemade Dishes", "Mushrooms", "Soy Milk", "Chamomile"],
    birthday: { season: "Autumn", day: 29 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543879",
  },
  {
    name: "Kevin",
    group: "Villagers",
    favorite: [
      "Giant Stag Beetle",
      "Smallheaded Locust",
      "Ruby Ladybug",
      "Swallowtail Butterfly",
      "Tree Frog",
      "Opal Cicada",
      "Seven-Spotted Ladybug",
    ],
    likes: [
      "Bugs",
      "Sweets",
      "Curries",
      "Dumplings (Stone, Wood)",
      "Butterfly Sticker",
    ],
    birthday: { season: "Summer", day: 25 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543880",
  },
  {
    name: "Isaac",
    group: "Villagers",
    favorite: ["Jam-Filled Bun", "Sandwich"],
    likes: ["Sandwiches", "Sweets", "Cicadas"],
    birthday: { season: "Autumn", day: 6 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543881",
  },
  {
    name: "Nadine",
    group: "Villagers",
    favorite: ["Milk+", "Floral Perfume", "Milk Rice Porridge", "Herb Soup"],
    likes: ["Soups", "Warm Milk", "Pickles", "Pale Chub"],
    birthday: { season: "Summer", day: 30 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543882",
  },
  {
    name: "Sylvia",
    group: "Villagers",
    favorite: ["Donuts", "Baked Sweet Potato", "Omelet"],
    likes: ["Sweets", "Egg Dishes", "Fishes", "Pasta"],
    birthday: { season: "Autumn", day: 18 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543883",
  },
  {
    name: "Laurie",
    group: "Villagers",
    favorite: ["Sweet Potato Cakes", "Baked Sweet Potato", "Omelet"],
    likes: ["Sweets", "Herbs", "Fireflies", "Popcorn"],
    birthday: { season: "Autumn", day: 18 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543884",
  },
  {
    name: "Harold",
    group: "Villagers",
    favorite: ["Supreme Curry", "Soy Milk Pudding"],
    likes: ["Puddings", "Teas", "Beetles"],
    birthday: { season: "Summer", day: 7 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/547034",
  },
  {
    name: "Sherene",
    group: "Villagers",
    favorite: ["Seaweed Curry"],
    likes: ["Chocolate Dishes", "Marigold", "Wild Herbs"],
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/547035",
  },
  {
    name: "Miguel",
    group: "Villagers",
    favorite: [
      "Croquettes",
      "Black Necklace",
      "Chartreuse Brooch",
      "Black Firefly",
      "French Fries",
    ],
    likes: ["Accessories", "Fireflies", "Magic Red Grass", "Medal", "Bread"],
    birthday: { season: "Summer", day: 21 },
    external_doc:
      "https://game8.co/games/Story-of-Seasons-Grand-Bazaar/archives/543872",
  },
];

// Some avatar filenames differ from their names. Provide overrides here.
export const avatarFileOverrides: Record<string, string> = {};
