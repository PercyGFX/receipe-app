export type CategoryType = {
  idCategory: string;
  strCategory: string;
};

export type ReceipeType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string
};

export type SingleReceipeType = {
  strMeal: string;
  strInstructions: string;
  strYoutube: string;
  strMealThumb: string;
};

export type FavouriteType = {
  _id: string;
  receipeId: string;
  thumbnail: string;
  title: string;
  category: string
};




