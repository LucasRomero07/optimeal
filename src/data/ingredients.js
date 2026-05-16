const INGREDIENT_EMOJIS = {
  aceite: "🫒", "aceite de oliva": "🫒", ajo: "🧄", albahaca: "🌿",
  arroz: "🍚", atún: "🐟", aguacate: "🥑", bacon: "🥓", batata: "🍠",
  berenjena: "🍆", brócoli: "🥦", calabacín: "🥒", "caldo de pollo": "🍗",
  "caldo de verduras": "🥕", "carne picada": "🥩", cebolla: "🧅",
  "cebolla morada": "🧅", cerdo: "🐷", champiñones: "🍄", chorizo: "🌭",
  cilantro: "🌿", coliflor: "🥦", "coles de bruselas": "🥬", comino: "🌿",
  couscous: "🍚", crema: "🥛", "crema de leche": "🥛", curry: "🍛",
  espárragos: "🥦", espinacas: "🥬", fideos: "🍜", frijoles: "🫘",
  gambas: "🦐", guisantes: "🫛", harina: "🌾", huevo: "🥚", jamón: "🍖",
  "jamón serrano": "🍖", jengibre: "🧄", "judías verdes": "🫘", kétchup: "🍅",
  laurel: "🌿", lechuga: "🥬", leche: "🥛", lentejas: "🫘", limón: "🍋",
  macarrones: "🍝", maíz: "🌽", mantequilla: "🧈", mayonesa: "🥫",
  miel: "🍯", mozzarella: "🧀", mostaza: "🫙", nata: "🥛", orégano: "🌿",
  pan: "🍞", "pan de molde": "🍞", "pan integral": "🍞", baguette: "🥖",
  "pan rallado": "🍞", pasta: "🍝", patata: "🥔", pavo: "🦃", perejil: "🌿",
  pesto: "🌿", pimentón: "🌶️", pimiento: "🫑", "pimiento verde": "🫑",
  "pimiento rojo": "🫑", pollo: "🍗", "pollo picado": "🍗", "pierna de pollo": "🍗",
  "muslo de pollo": "🍗", puerro: "🥬", queso: "🧀", "queso rallado": "🧀",
  "queso cheddar": "🧀", "queso gouda": "🧀", "queso emmental": "🧀",
  "queso fresco": "🧀", "queso de cabra": "🧀", "queso crema": "🧀",
  quinoa: "🌾", repollo: "🥬", ricotta: "🧀", romero: "🌿", sal: "🧂",
  "salsa de soja": "🫘", "salsa de tomate": "🍅", "soja texturizada": "🫘",
  spaghetti: "🍝", "ternera picada": "🥩", ternera: "🥩", tomate: "🍅",
  "tomate frito": "🍅", "tomates cherry": "🍅", tomillo: "🌿", tofu: "🧈",
  "tortilla de maíz": "🫓", vinagre: "🍶", yogur: "🥛", zanahoria: "🥕",
  apio: "🥬", pepino: "🥒", aceitunas: "🫒", piñones: "🥜", nueces: "🥜",
  pasas: "🫘", calabaza: "🎃", remolacha: "🫑", nabo: "🥬", boniato: "🍠",
  setas: "🍄", mango: "🥭", piña: "🍍", pera: "🍐", manzana: "🍎",
  plátano: "🍌", fresas: "🍓", arándanos: "🫐", uvas: "🍇", canela: "🫘",
  "nuez moscada": "🫘", azafrán: "🫘", levadura: "🫘", mermelada: "🫘",
  cacao: "🍫", garbanzos: "🫘", "pimiento del piquillo": "🫑",
};

const CATEGORIES = [
  {
    name: "Proteínas",
    icon: "🥩",
    items: ["pollo", "ternera", "cerdo", "pavo", "carne picada", "ternera picada", "pollo picado", "pierna de pollo", "muslo de pollo", "atún", "gambas", "huevo", "jamón", "jamón serrano", "chorizo", "bacon", "tofu", "soja texturizada"],
  },
  {
    name: "Verduras",
    icon: "🥬",
    items: ["ajo", "cebolla", "cebolla morada", "puerro", "tomate", "tomates cherry", "lechuga", "espinacas", "repollo", "coles de bruselas", "apio", "pepino", "pimiento", "pimiento verde", "pimiento rojo", "pimiento del piquillo", "zanahoria", "calabacín", "berenjena", "calabaza", "patata", "batata", "boniato", "brócoli", "coliflor", "champiñones", "setas", "espárragos", "judías verdes", "maíz", "remolacha", "nabo"],
  },
  {
    name: "Frutas",
    icon: "🍎",
    items: ["aguacate", "limón", "mango", "piña", "pera", "manzana", "plátano", "fresas", "arándanos", "uvas", "aceitunas"],
  },
  {
    name: "Carbohidratos",
    icon: "🍞",
    items: ["arroz", "pasta", "macarrones", "spaghetti", "fideos", "pan", "pan de molde", "pan integral", "baguette", "pan rallado", "couscous", "quinoa", "harina", "tortilla de maíz"],
  },
  {
    name: "Legumbres",
    icon: "🫘",
    items: ["lentejas", "frijoles", "garbanzos", "guisantes"],
  },
  {
    name: "Lácteos",
    icon: "🥛",
    items: ["leche", "crema", "crema de leche", "nata", "yogur", "mantequilla", "queso", "queso rallado", "mozzarella", "queso cheddar", "queso gouda", "queso emmental", "queso fresco", "queso de cabra", "queso crema", "ricotta"],
  },
  {
    name: "Condimentos",
    icon: "🧂",
    items: ["aceite", "aceite de oliva", "sal", "vinagre", "salsa de soja", "mayonesa", "kétchup", "mostaza", "miel", "salsa de tomate", "tomate frito", "caldo de pollo", "caldo de verduras", "pesto", "mermelada"],
  },
  {
    name: "Especias",
    icon: "🌿",
    items: ["orégano", "perejil", "albahaca", "cilantro", "romero", "tomillo", "laurel", "comino", "pimentón", "curry", "jengibre", "canela", "nuez moscada", "azafrán", "cacao", "levadura", "piñones", "nueces", "pasas"],
  },
];

export function getEmoji(name) {
  return INGREDIENT_EMOJIS[name.toLowerCase().trim()] || "🍽️";
}

export function getCategories() {
  return CATEGORIES.map((cat) => ({
    ...cat,
    items: [...cat.items].sort(),
  }));
}

const ALL_INGREDIENTS = Object.keys(INGREDIENT_EMOJIS).sort();

export default ALL_INGREDIENTS;
