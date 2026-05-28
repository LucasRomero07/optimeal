const DIETS = [
  { id: "omnivore", label: "Omnívoro", icon: "🍖" },
  { id: "vegetarian", label: "Vegetariano", icon: "🥬" },
  { id: "vegan", label: "Vegano", icon: "🌱" },
  { id: "gluten-free", label: "Sin Gluten", icon: "🌾" },
  { id: "lactose-free", label: "Sin Lactosa", icon: "🥛" },
];

const FORBIDDEN_BY_DIET = {
  vegetarian: ["pollo", "ternera", "cerdo", "pavo", "atún", "gambas", "jamón", "chorizo", "bacon", "carne picada", "ternera picada", "pollo picado", "pierna de pollo", "muslo de pollo", "jamón serrano", "caldo de pollo"],
  vegan: ["pollo", "ternera", "cerdo", "pavo", "atún", "gambas", "jamón", "chorizo", "bacon", "carne picada", "ternera picada", "pollo picado", "pierna de pollo", "muslo de pollo", "jamón serrano", "huevo", "leche", "queso", "mozzarella", "queso rallado", "queso cheddar", "queso gouda", "queso emmental", "queso fresco", "queso de cabra", "queso crema", "ricotta", "mantequilla", "yogur", "crema", "nata", "crema de leche", "miel", "caldo de pollo"],
  "gluten-free": ["harina", "pan", "pan de molde", "baguette", "pan integral", "pan rallado", "pasta", "macarrones", "spaghetti", "fideos", "couscous", "tortilla de maíz"],
  "lactose-free": ["leche", "queso", "mozzarella", "queso rallado", "queso cheddar", "queso gouda", "queso emmental", "queso fresco", "queso de cabra", "queso crema", "ricotta", "mantequilla", "yogur", "crema", "nata", "crema de leche"],
};

export function isAllowedByDiet(ingredient, dietId) {
  if (!dietId || dietId === "omnivore") return true;
  const forbidden = FORBIDDEN_BY_DIET[dietId] || [];
  return !forbidden.includes(ingredient.toLowerCase().trim());
}

export default DIETS;
