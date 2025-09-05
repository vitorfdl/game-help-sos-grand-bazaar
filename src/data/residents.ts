export type ResidentGroup = "Bachelors" | "Bachelorettes" | "Villagers";

import type { Season } from "@/data/types";

export interface Resident {
  name: string;
  group: ResidentGroup;
  favorite: string[];
  likes: string[];
  birthday?: { season: Season; day: number };
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
  },
  {
    name: "Derek",
    group: "Bachelors",
    favorite: [
      "Cream Croquettes",
      "Rhinoceros Beetle",
      "Elephant Beetle",
      "Hercules Beetle",
    ],
    likes: ["Stag Beetles", "Curries", "Ricebowl Dishes", "Tea Leaves"],
    birthday: { season: "Summer", day: 12 },
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
  },
  {
    name: "Gabriel",
    group: "Bachelors",
    favorite: ["Omelet Rice", "Sashimi", "Tofu"],
    likes: ["Gratin", "Fruit Dishes", "Ice Cream", "Pizza", "Sweets"],
    birthday: { season: "Winter", day: 28 },
  },
  {
    name: "Samir",
    group: "Bachelors",
    favorite: ["Cooked Rice", "Chocolate-Covered Banana", "Cookies", "Stew"],
    likes: ["Rice", "Rice Dishes", "Grilled Fish", "Stag Beetles"],
    birthday: { season: "Winter", day: 26 },
  },
  {
    name: "Arata",
    group: "Bachelors",
    favorite: ["Unadon", "Warm Milk", "Rainbow Curry"],
    likes: ["Milk", "Sashimi", "Onigiri", "Omelet", "Fishes", "Curries"],
    birthday: { season: "Winter", day: 17 },
  },

  // Bachelorettes
  {
    name: "Sophie",
    group: "Bachelorettes",
    favorite: ["Herb Salad"],
    likes: ["Pickles", "Salads", "Moondrop Flower", "Rice Porridge"],
    birthday: { season: "Spring", day: 16 },
  },
  {
    name: "June",
    group: "Bachelorettes",
    favorite: ["Cherry Tea"],
    likes: ["Accessories", "Teas", "Frogs"],
    birthday: { season: "Winter", day: 12 },
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
  },
  {
    name: "Maple",
    group: "Bachelorettes",
    favorite: ["Engadiner Nusstorte", "Cookies", "Pancakes", "Churros"],
    likes: ["Sweets", "Flowers", "Butterflies", "Honey Juice", "Walnut Juice"],
    birthday: { season: "Autumn", day: 14 },
  },
  {
    name: "Kagetsu",
    group: "Bachelorettes",
    favorite: ["Soy Milk Pudding"],
    likes: ["Soy Milk", "Tofu Dishes", "Vegetable Dishes", "Crops"],
    birthday: { season: "Spring", day: 5 },
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
  },

  // Villagers (page 1)
  {
    name: "Felix",
    group: "Villagers",
    favorite: ["Spicy Curry", "Bouillabaisse", "Rainbow Curry", "Rice Gratin"],
    likes: ["Curries", "Stag Beetles", "Magic Red Grass", "Cheese", "Risotto"],
    birthday: { season: "Summer", day: 1 },
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
  },
  {
    name: "Stuart",
    group: "Villagers",
    favorite: ["Mont Blanc Cake", "Pasta", "Spring Tea"],
    likes: ["Noodles", "Teas", "Pickles", "Honey Juice", "Fried Egg"],
    birthday: { season: "Autumn", day: 11 },
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
  },
  {
    name: "Madeleine",
    group: "Villagers",
    favorite: ["Fruit Sandwich", "Strawberry Pie"],
    likes: ["Pies", "Wild Herbs", "Fruits Dishes", "Strawberry", "Rice Flour"],
    birthday: { season: "Spring", day: 18 },
  },
  {
    name: "Mina",
    group: "Villagers",
    favorite: ["Herb Pasta", "Mushroom Pasta"],
    likes: ["Herbs", "Herbs Dishes", "Wild Herbs", "Cookies", "Pansy"],
    birthday: { season: "Winter", day: 4 },
  },
  {
    name: "Wilbur",
    group: "Villagers",
    favorite: ["Steamed Mushroom"],
    likes: ["Eggplant Dishes", "Fishes", "Beetles", "Cooked Rice"],
    birthday: { season: "Summer", day: 3 },
  },
  {
    name: "Clara",
    group: "Villagers",
    favorite: ["Pickled Broccoli", "Pickled Onion", "Any Pickles"],
    likes: ["Pickles", "Homemade Dishes", "Mushrooms", "Soy Milk", "Chamomile"],
    birthday: { season: "Autumn", day: 29 },
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
  },
  {
    name: "Isaac",
    group: "Villagers",
    favorite: ["Jam-Filled Bun", "Sandwich"],
    likes: ["Sandwiches", "Sweets", "Cicadas"],
    birthday: { season: "Autumn", day: 6 },
  },
  {
    name: "Nadine",
    group: "Villagers",
    favorite: ["Milk+", "Floral Perfume", "Milk Rice Porridge", "Herb Soup"],
    likes: ["Soups", "Warm Milk", "Pickles", "Pale Chub"],
    birthday: { season: "Summer", day: 30 },
  },
  {
    name: "Sylvia",
    group: "Villagers",
    favorite: ["Donuts", "Baked Sweet Potato", "Omelet"],
    likes: ["Sweets", "Egg Dishes", "Fishes", "Pasta"],
    birthday: { season: "Autumn", day: 18 },
  },
  {
    name: "Laurie",
    group: "Villagers",
    favorite: ["Sweet Potato Cakes", "Baked Sweet Potato", "Omelet"],
    likes: ["Sweets", "Herbs", "Fireflies", "Popcorn"],
    birthday: { season: "Autumn", day: 18 },
  },
  {
    name: "Harold",
    group: "Villagers",
    favorite: ["Supreme Curry", "Soy Milk Pudding"],
    likes: ["Puddings", "Teas", "Beetles"],
    birthday: { season: "Summer", day: 7 },
  },
  {
    name: "Sherene",
    group: "Villagers",
    favorite: ["Seaweed Curry"],
    likes: ["Chocolate Dishes", "Marigold", "Wild Herbs"],
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
  },
];

// Some avatar filenames differ from their names. Provide overrides here.
export const avatarFileOverrides: Record<string, string> = {};
