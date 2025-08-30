export type ResidentGroup = 'Bachelors' | 'Bachelorettes' | 'Villagers'

import type { Season } from '@/data/types'

export interface Resident {
  name: string
  group: ResidentGroup
  favorite: string
  likes: string[]
  birthday?: { season: Season; day: number }
}

export const residents: Resident[] = [
  // Bachelors
  { name: 'Jules', group: 'Bachelors', favorite: 'Herb Perfume', likes: ['Herbs', 'Perfumes', 'Salads'], birthday: { season: 'Autumn', day: 20 } },
  { name: 'Derek', group: 'Bachelors', favorite: 'Cream Croquettes', likes: ['Stag Beetles', 'Curries', 'Ricebowl Dishes'], birthday: { season: 'Summer', day: 12 } },
  { name: 'Lloyd', group: 'Bachelors', favorite: 'Gold Medal, Paella', likes: ['Fondues', 'Bugs', 'Juices'], birthday: { season: 'Autumn', day: 3 } },
  { name: 'Gabriel', group: 'Bachelors', favorite: 'Omelet Rice', likes: ['Gratin', 'Fruit Dishes', 'Sweets'], birthday: { season: 'Winter', day: 28 } },
  { name: 'Samir', group: 'Bachelors', favorite: 'Stew', likes: ['Rice', 'Rice Dishes', 'Stag Beetles'], birthday: { season: 'Winter', day: 26 } },
  { name: 'Arata', group: 'Bachelors', favorite: 'Unadon (Eel Ricebowl)', likes: ['Hot Milk', 'Fishes', 'Curries'], birthday: { season: 'Winter', day: 17 } },

  // Bachelorettes
  { name: 'Sophie', group: 'Bachelorettes', favorite: 'Herb Salad', likes: ['Pickles', 'Salads', 'Moondrop Flower'], birthday: { season: 'Spring', day: 16 } },
  { name: 'June', group: 'Bachelorettes', favorite: 'Cherry Tea', likes: ['Accessories', 'Teas', 'Frogs'], birthday: { season: 'Winter', day: 12 } },
  { name: 'Freya', group: 'Bachelorettes', favorite: 'Citrus Perfume', likes: ['Accessories', 'Jewels', 'Hot Milk'], birthday: { season: 'Autumn', day: 25 } },
  { name: 'Maple', group: 'Bachelorettes', favorite: 'Engadiner Nusstorte', likes: ['Sweets', 'Flowers', 'Butterflies'], birthday: { season: 'Autumn', day: 14 } },
  { name: 'Kagetsu', group: 'Bachelorettes', favorite: 'Soy Milk Pudding', likes: ['Soy Milk', 'Tofu Dishes', 'Vegetable Dishes', 'Crops'], birthday: { season: 'Spring', day: 5 } },
  { name: 'Diana', group: 'Bachelorettes', favorite: 'Apple Pie', likes: ['Apples', 'Teas', 'Butterflies'], birthday: { season: 'Autumn', day: 22 } },

  // Villagers (page 1)
  { name: 'Felix', group: 'Villagers', favorite: 'Spicy Curry', likes: ['Curries', 'Stag Beetles', 'Magic Red Grass'], birthday: { season: 'Summer', day: 1 } },
  { name: 'Erik', group: 'Villagers', favorite: 'Spring Color Blend Tea', likes: ['Teas', 'Juices', 'Salads'], birthday: { season: 'Spring', day: 20 } },
  { name: 'Stuart', group: 'Villagers', favorite: 'Mont Blanc Cake', likes: ['Noodles', 'Teas', 'Pickles'], birthday: { season: 'Autumn', day: 11 } },
  { name: 'Sonia', group: 'Villagers', favorite: 'Strawberry Juice, Tomato Juice', likes: ['Juices', 'Teas', 'Wild Herbs'], birthday: { season: 'Spring', day: 25 } },
  { name: 'Madeleine', group: 'Villagers', favorite: 'Fruits Sandwich', likes: ['Pies', 'Wild Herbs', 'Fruits Dishes'], birthday: { season: 'Spring', day: 18 } },
  { name: 'Mina', group: 'Villagers', favorite: 'Herb Pasta', likes: ['Herbs', 'Herbs Dishes', 'Wild Herbs'], birthday: { season: 'Winter', day: 4 } },
  { name: 'Wilbur', group: 'Villagers', favorite: 'Steamed Mushroom', likes: ['Eggplant Dishes', 'Fishes', 'Beetles'], birthday: { season: 'Summer', day: 3 } },
  { name: 'Clara', group: 'Villagers', favorite: 'Broccoli Pickles', likes: ['Pickles', 'Homemade Dishes', 'Mushrooms'], birthday: { season: 'Autumn', day: 29 } },
  { name: 'Kevin', group: 'Villagers', favorite: 'Giant Stag Beetle', likes: ['Bugs', 'Sweets', 'Curries'], birthday: { season: 'Summer', day: 25 } },
  { name: 'Isaac', group: 'Villagers', favorite: 'Jam Bread', likes: ['Sandwiches', 'Sweets', 'Cicadas'], birthday: { season: 'Autumn', day: 6 } },
  { name: 'Nadine', group: 'Villagers', favorite: 'Milk+', likes: ['Soups', 'Hot Milk', 'Pickles'], birthday: { season: 'Summer', day: 30 } },
  { name: 'Sylvia', group: 'Villagers', favorite: 'Donut', likes: ['Sweets', 'Egg Dishes', 'Fishes'], birthday: { season: 'Autumn', day: 18 } },
  { name: 'Laurie', group: 'Villagers', favorite: 'Sweet Potato Dessert', likes: ['Sweets', 'Herbs', 'Fireflies'], birthday: { season: 'Autumn', day: 18 } },
  { name: 'Harold', group: 'Villagers', favorite: 'Ultimate Curry', likes: ['Puddings', 'Teas', 'Beetles'], birthday: { season: 'Summer', day: 7 } },
  { name: 'Sherene', group: 'Villagers', favorite: 'Seaweed Curry', likes: ['Chocolate Dishes', 'Marigold', 'Wild Herbs'] },
  { name: 'Miguel', group: 'Villagers', favorite: 'Croquettes', likes: ['Accessories', 'Fireflies', 'Magic Red Grass'], birthday: { season: 'Summer', day: 21 } },
]

// Some avatar filenames differ from their names. Provide overrides here.
export const avatarFileOverrides: Record<string, string> = {
}


