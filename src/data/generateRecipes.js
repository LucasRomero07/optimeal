import { getEmoji } from "./ingredients.js";

const CATS = {
  protein: ["pollo", "ternera", "cerdo", "pavo", "atún", "gambas", "huevo", "jamón", "chorizo", "bacon", "tofu", "carne picada", "jamón serrano"],
  veggie: ["calabacín", "berenjena", "espinacas", "brócoli", "coliflor", "champiñones", "judías verdes", "coles de bruselas", "pimiento", "pimiento verde", "pimiento rojo", "zanahoria", "cebolla", "cebolla morada", "puerro", "patata", "batata", "aguacate", "lechuga", "tomate", "tomates cherry", "apio", "pepino", "calabaza", "remolacha", "nabo", "boniato", "setas", "pimiento del piquillo"],
  carb: ["arroz", "pasta", "macarrones", "spaghetti", "fideos", "pan", "couscous", "quinoa", "pan de molde", "baguette", "pan integral"],
  legume: ["lentejas", "frijoles", "guisantes", "garbanzos"],
  dairy: ["queso", "mozzarella", "queso rallado", "queso cheddar", "queso gouda", "queso emmental", "queso fresco", "queso de cabra", "ricotta", "leche", "crema", "nata", "yogur", "mantequilla", "queso crema"],
  condiment: ["aceite", "sal", "vinagre", "salsa de soja", "mayonesa", "kétchup", "mostaza", "miel", "limón", "ajo", "jengibre", "comino", "pimentón", "curry", "pesto", "orégano", "perejil", "albahaca", "romero", "tomillo", "laurel", "cilantro", "canela", "nuez moscada", "azafrán", "levadura", "cacao"],
  sauce: ["salsa de tomate", "tomate frito", "caldo de pollo", "caldo de verduras", "crema de leche"],
  fruit: ["mango", "piña", "pera", "manzana", "plátano", "fresas", "arándanos", "uvas"],
};

const emojiFor = (names) => getEmoji(names[0]);

function makeDescription(steps) {
  return steps.join("\n");
}

let idCounter = 0;
const nextId = () => ++idCounter;

function basicSteps(title, main, cookMin, cookMax) {
  return [
    `1. Prepara todos los ingredientes: ${Array.isArray(main) ? main.join(", ") : main}.`,
    `2. Cocina según la receta tradicional de ${title}.`,
    `3. Cocina durante ${cookMin}-${cookMax} minutos removiendo ocasionalmente.`,
    "4. Salpimienta al gusto.",
    `5. Sirve caliente y disfruta.`,
  ];
}

// ---------- Recipe templates ----------

const templates = [];

// --- 1. {protein} a la plancha (12) ---
for (const p of CATS.protein) {
  if (p === "huevo") continue;
  templates.push({
    title: `${p.charAt(0).toUpperCase() + p.slice(1)} a la Plancha`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+Plancha"),
    description: makeDescription([
      `1. Sazona el ${p} con sal, pimienta y ajo picado.`,
      `2. Calienta una sartén con un chorro de aceite.`,
      `3. Cocina el ${p} 5-6 min por cada lado hasta que esté dorado.`,
      "4. Deja reposar 2 minutos antes de servir.",
      "5. Acompaña con una guarnición de verduras o ensalada."
    ]),
    essentials: [p, "aceite"],
    substitutes: { aceite: ["aceite de oliva", "mantequilla"] },
    cookTime: 25
  });
}

// --- 2. Tortilla de {veggie} (21) ---
for (const v of CATS.veggie) {
  if (["lechuga", "aguacate", "tomates cherry"].includes(v)) continue;
  templates.push({
    title: `Tortilla de ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Tortilla+" + encodeURIComponent(v),
    description: makeDescription([
      `1. Lava y corta el ${v} en trozos pequeños.`,
      `2. Sofríelo en una sartén con aceite hasta que esté tierno.`,
      "3. Bate 2-3 huevos con sal y pimienta.",
      `4. Mezcla el ${v} con los huevos batidos.`,
      "5. Cuaja la tortilla por ambos lados en la sartén.",
      "6. Sirve caliente o a temperatura ambiente."
    ]),
    essentials: ["huevo", v, "aceite"],
    substitutes: { aceite: ["aceite de oliva", "mantequilla"] },
    cookTime: 20
  });
}

// --- 3. Revuelto de {veggie} (21) ---
for (const v of CATS.veggie) {
  if (["lechuga", "aguacate", "tomates cherry"].includes(v)) continue;
  templates.push({
    title: `Revuelto de ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Revuelto+" + encodeURIComponent(v),
    description: makeDescription([
      `1. Lava y corta el ${v} en trozos pequeños.`,
      `2. Sofríelo en una sartén con aceite y ajo picado.`,
      "3. Bate 2-3 huevos con sal y pimienta.",
      `4. Vierte los huevos sobre el ${v} salteado.`,
      "5. Remueve a fuego medio hasta que cuaje a tu gusto.",
      "6. Sirve con pan tostado."
    ]),
    essentials: ["huevo", v, "aceite"],
    substitutes: { aceite: ["aceite de oliva", "mantequilla"] },
    cookTime: 15
  });
}

// --- 4. Crema de {veggie} (18) ---
for (const v of CATS.veggie) {
  if (["lechuga", "aguacate", "tomates cherry", "pimiento", "pimiento verde", "pimiento rojo", "coles de bruselas"].includes(v)) continue;
  templates.push({
    title: `Crema de ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Crema+" + encodeURIComponent(v),
    description: makeDescription([
      `1. Pela y trocea el ${v} y una patata.`,
      "2. Sofríe media cebolla picada en una olla.",
      `3. Añade el ${v} y la patata, cubre con caldo.`,
      "4. Cocina 20 min hasta que estén tiernos.",
      "5. Tritura todo hasta obtener una crema fina.",
      "6. Sirve con un chorro de aceite y picatostes."
    ]),
    essentials: [v, "cebolla"],
    substitutes: { cebolla: ["puerro"] },
    cookTime: 30
  });
}

// --- 5. Salteado de {v1} con {v2} (muchos) ---
for (let i = 0; i < CATS.veggie.length; i++) {
  for (let j = i + 1; j < CATS.veggie.length; j++) {
    const v1 = CATS.veggie[i];
    const v2 = CATS.veggie[j];
    const bad = ["lechuga", "aguacate", "tomates cherry"];
    if (bad.includes(v1) || bad.includes(v2)) continue;
    templates.push({
      title: `Salteado de ${v1.charAt(0).toUpperCase() + v1.slice(1)} con ${v2}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Salteado+" + encodeURIComponent(v1 + "+" + v2),
      description: makeDescription([
        `1. Corta ${v1} y ${v2} en tiras o dados.`,
        "2. Calienta aceite en un wok o sartén grande.",
        `3. Saltea ${v1} primero por 3 min, luego añade ${v2}.`,
        "4. Añade salsa de soja, sal y pimienta.",
        "5. Saltea 5 min a fuego fuerte.",
        "6. Sirve solo o como acompañamiento."
      ]),
      essentials: [v1, v2, "aceite"],
      substitutes: { aceite: ["aceite de oliva"] },
      cookTime: 15
    });
  }
}

// --- 6. Ensalada de {v1} con {v2} (muchos) ---
for (let i = 0; i < CATS.veggie.length; i++) {
  for (let j = i + 1; j < CATS.veggie.length; j++) {
    const v1 = CATS.veggie[i];
    const v2 = CATS.veggie[j];
    const good = ["lechuga", "tomate", "cebolla", "zanahoria", "pimiento", "espinacas", "maíz", "aguacate", "tomates cherry", "cebolla morada", "pimiento verde", "pimiento rojo"];
    if (!good.includes(v1) || !good.includes(v2)) continue;
    templates.push({
      title: `Ensalada de ${v1.charAt(0).toUpperCase() + v1.slice(1)} con ${v2}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Ensalada+" + encodeURIComponent(v1 + "+" + v2),
      description: makeDescription([
        `1. Lava bien ${v1} y ${v2}.`,
        `2. Corta ${v1} y ${v2} en trozos.`,
        "3. Mezcla todo en un bol grande.",
        "4. Aliña con aceite, vinagre y sal.",
        "5. Opcional: añade atún o huevo duro.",
        "6. Sirve fresca."
      ]),
      essentials: [v1, v2],
      substitutes: {},
      cookTime: 10
    });
  }
}

// --- 7. Arroz con {protein} (12) ---
for (const p of CATS.protein) {
  templates.push({
    title: `Arroz con ${p.charAt(0).toUpperCase() + p.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Arroz+" + encodeURIComponent(p),
    description: makeDescription([
      `1. Cocina el arroz en agua hirviendo con sal (12-15 min).`,
      "2. Escurre y reserva.",
      `3. Saltea ${p} en una sartén con aceite y ajo.`,
      "4. Mezcla el arroz con la proteína.",
      "5. Salpimienta y sirve caliente."
    ]),
    essentials: ["arroz", p],
    substitutes: { arroz: ["pasta", "couscous", "quinoa"] },
    cookTime: 25
  });
}

// --- 8. Pasta con {protein} (11) ---
for (const p of CATS.protein) {
  if (["huevo", "tofu", "chorizo", "bacon"].includes(p)) continue;
  templates.push({
    title: `Pasta con ${p.charAt(0).toUpperCase() + p.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Pasta+" + encodeURIComponent(p),
    description: makeDescription([
      "1. Cocina la pasta en agua hirviendo con sal.",
      "2. Escurre y reserva un poco de agua.",
      `3. Saltea ${p} en una sartén con ajo y aceite.`,
      `4. Añade tomate frito y mezcla con la pasta.`,
      "5. Sirve con queso rallado."
    ]),
    essentials: ["pasta", p, "tomate"],
    substitutes: { pasta: ["macarrones", "spaghetti", "fideos"], tomate: ["salsa de tomate", "tomate frito"] },
    cookTime: 25
  });
}

// --- 9. Sopa de {v1} y {v2} (muchos) ---
for (let i = 0; i < CATS.veggie.length; i++) {
  for (let j = i + 1; j < CATS.veggie.length; j++) {
    const v1 = CATS.veggie[i];
    const v2 = CATS.veggie[j];
    const good = ["zanahoria", "patata", "cebolla", "puerro", "calabacín", "apio"];
    if (!good.includes(v1) || !good.includes(v2)) continue;
    templates.push({
      title: `Sopa de ${v1.charAt(0).toUpperCase() + v1.slice(1)} y ${v2}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Sopa+" + encodeURIComponent(v1 + "+" + v2),
      description: makeDescription([
        `1. Pela y trocea ${v1} y ${v2}.`,
        "2. Sofríe la cebolla picada en una olla.",
        `3. Añade ${v1} y ${v2}, cubre con caldo.`,
        "4. Cocina 30 min a fuego medio.",
        "5. Salpimienta y sirve caliente.",
      ]),
      essentials: [v1, v2, "cebolla"],
      substitutes: { cebolla: ["puerro"] },
      cookTime: 40
    });
  }
}

// --- 10. {veggie} al horno (15) ---
for (const v of CATS.veggie) {
  if (["lechuga", "aguacate", "tomates cherry", "espinacas"].includes(v)) continue;
  templates.push({
    title: `${v.charAt(0).toUpperCase() + v.slice(1)} al Horno`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(v + "+Horno"),
    description: makeDescription([
      `1. Precalienta el horno a 200°C.`,
      `2. Lava y corta ${v} en trozos.`,
      "3. Coloca en una bandeja con aceite, sal y especias.",
      `4. Hornea 25-30 min hasta que ${v} esté tierno.`,
      "5. Sirve caliente como guarnición o plato principal."
    ]),
    essentials: [v, "aceite"],
    substitutes: { aceite: ["aceite de oliva"] },
    cookTime: 35
  });
}

// --- 11. {legume} estofado (3) ---
for (const l of CATS.legume) {
  templates.push({
    title: `${l.charAt(0).toUpperCase() + l.slice(1)} Estofadas`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(l),
    description: makeDescription([
      "1. Sofríe cebolla, ajo y zanahoria picados.",
      `2. Añade ${l} y cubre con agua o caldo.`,
      "3. Agrega una hoja de laurel, pimentón y sal.",
      `4. Cocina a fuego medio hasta que ${l} estén tiernos.`,
      "5. Añade patata troceada y cocina 15 min más.",
      "6. Sirve caliente."
    ]),
    essentials: [l, "cebolla", "zanahoria"],
    substitutes: { cebolla: ["puerro"], zanahoria: ["pimiento"] },
    cookTime: 50
  });
}

// --- 12. {v} salteado con {protein} (muchos) ---
for (const v of CATS.veggie) {
  for (const p of CATS.protein) {
    if (["lechuga", "aguacate", "tomates cherry"].includes(v)) continue;
    if (p === "huevo") continue;
    templates.push({
      title: `${v.charAt(0).toUpperCase() + v.slice(1)} Salteado con ${p}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(v + "+" + p),
      description: makeDescription([
        `1. Corta ${v} en tiras y ${p} en dados.`,
        "2. Calienta aceite en una sartén.",
        `3. Saltea ${p} primero, luego añade ${v}.`,
        "4. Añade salsa de soja, sal y pimienta.",
        "5. Saltea 5 min a fuego fuerte.",
        "6. Sirve con arroz o solo."
      ]),
      essentials: [v, p, "aceite"],
      substitutes: { aceite: ["aceite de oliva"] },
      cookTime: 20
    });
  }
}

// --- 13. Wrap de {protein} con {veggie} (muchos) ---
for (const v of ["lechuga", "espinacas", "tomate"]) {
  for (const p of ["pollo", "atún", "pavo", "ternera", "cerdo"]) {
    templates.push({
      title: `Wrap de ${p.charAt(0).toUpperCase() + p.slice(1)} con ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Wrap+" + encodeURIComponent(p + "+" + v),
      description: makeDescription([
        `1. Cocina ${p} a la plancha y córtalo en tiras.`,
        "2. Calienta una tortilla de maíz.",
        "3. Unta mayonesa o queso crema.",
        `4. Añade ${v} y ${p}.`,
        "5. Enrolla firmemente y corta por la mitad.",
        "6. Sirve inmediatamente."
      ]),
      essentials: [p, "tortilla de maíz", v],
      substitutes: { "tortilla de maíz": ["pan", "pan de molde", "baguette"] },
      cookTime: 15
    });
  }
}

// --- 14. {protein} empanado (7) ---
for (const p of ["pollo", "pavo", "ternera", "cerdo"]) {
  templates.push({
    title: `${p.charAt(0).toUpperCase() + p.slice(1)} Empanado`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+Empanado"),
    description: makeDescription([
      `1. Corta ${p} en filetes finos.`,
      "2. Sazona con sal y pimienta.",
      "3. Pasa por harina, huevo batido y pan rallado.",
      "4. Fríe en aceite caliente 3-4 min cada lado.",
      "5. Escurre sobre papel absorbente.",
      "6. Sirve con limón o ensalada."
    ]),
    essentials: [p, "huevo", "pan rallado", "aceite"],
    substitutes: { "pan rallado": ["pan"], aceite: ["aceite de oliva"] },
    cookTime: 25
  });
}

// --- 15. {v} relleno de {protein} (muchos) ---
for (const v of ["berenjena", "calabacín", "pimiento"]) {
  for (const p of CATS.protein) {
    if (["huevo", "tofu", "chorizo", "bacon"].includes(p)) continue;
    templates.push({
      title: `${v.charAt(0).toUpperCase() + v.slice(1)} Rellena de ${p}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(v + "+" + p),
      description: makeDescription([
        `1. Parte ${v} por la mitad y vacíala.`,
        "2. Sofríe la pulpa con cebolla y ajo.",
        `3. Añade ${p} y cocina hasta dorar.`,
        `4. Rellena ${v} con la mezcla.`,
        "5. Cubre con queso rallado.",
        "6. Hornea 20 min a 200°C."
      ]),
      essentials: [v, p, "queso"],
      substitutes: { queso: ["queso rallado", "mozzarella"] },
      cookTime: 45
    });
  }
}

// --- 16. Hamburguesa de {protein} (6) ---
for (const p of ["carne picada", "ternera picada", "pollo picado", "soja texturizada"]) {
  templates.push({
    title: `Hamburguesa de ${p.charAt(0).toUpperCase() + p.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Hamburguesa+" + encodeURIComponent(p),
    description: makeDescription([
      `1. Mezcla ${p} con ajo, sal y pimienta.`,
      "2. Forma una hamburguesa.",
      "3. Cocina en una sartén 4-5 min cada lado.",
      "4. Tuesta el pan ligeramente.",
      "5. Monta con lechuga, tomate y cebolla.",
      "6. Añade kétchup o mayonesa."
    ]),
    essentials: [p, "pan"],
    substitutes: { pan: ["pan de molde", "baguette"] },
    cookTime: 20
  });
}

// --- 17. Sándwich de {protein} con {veggie} (muchos) ---
for (const p of ["jamón", "pollo", "atún", "pavo", "queso"]) {
  for (const v of ["lechuga", "tomate", "espinacas"]) {
    templates.push({
      title: `Sándwich de ${p.charAt(0).toUpperCase() + p.slice(1)} con ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Sandwich+" + encodeURIComponent(p + "+" + v),
      description: makeDescription([
        "1. Toma dos rebanadas de pan.",
        `2. Coloca ${p} y ${v} entre ellas.`,
        "3. Añade mayonesa o mostaza.",
        "4. Calienta una sartén a fuego medio.",
        "5. Tuesta el sándwich 3 min cada lado.",
        "6. Corta por la mitad y sirve."
      ]),
      essentials: ["pan", p, v],
      substitutes: { pan: ["pan de molde", "baguette", "pan integral"] },
      cookTime: 10
    });
  }
}

// --- 18. Couscous con {v} (muchos) ---
for (const v of ["zanahoria", "calabacín", "pimiento", "cebolla", "tomate"]) {
  templates.push({
    title: `Cuscús con ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Cuscus+" + encodeURIComponent(v),
    description: makeDescription([
      "1. Hidrata el cuscús en agua caliente 5 min.",
      `2. Corta ${v} en dados pequeños.`,
      `3. Sofríe ${v} con ajo y aceite.`,
      "4. Mezcla el cuscús con las verduras.",
      "5. Añade aceite, sal, limón y perejil.",
      "6. Sirve caliente o frío."
    ]),
    essentials: ["couscous", v],
    substitutes: { couscous: ["arroz", "quinoa"] },
    cookTime: 20
  });
}

// --- 19. Quinoa con {v} (muchos) ---
for (const v of ["tomate", "cebolla", "pimiento", "espinacas", "zanahoria"]) {
  templates.push({
    title: `Quinoa con ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Quinoa+" + encodeURIComponent(v),
    description: makeDescription([
      "1. Cocina la quinoa en agua 15 min.",
      "2. Escurre y deja enfriar.",
      `3. Corta ${v} en dados.`,
      "4. Mezcla la quinoa con la verdura.",
      "5. Aliña con aceite, limón y sal.",
      "6. Sirve fría como ensalada."
    ]),
    essentials: ["quinoa", v],
    substitutes: { quinoa: ["couscous", "arroz"] },
    cookTime: 25
  });
}

// --- 20. {protein} salteado con {v} y salsa de soja (muchos) ---
for (const p of ["pollo", "ternera", "cerdo", "gambas"]) {
  for (const v of ["pimiento", "cebolla", "zanahoria", "brócoli", "calabacín"]) {
    templates.push({
      title: `${p.charAt(0).toUpperCase() + p.slice(1)} Salteado con ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+" + v),
      description: makeDescription([
        `1. Corta ${p} en tiras y ${v} en trozos.`,
        "2. Calienta aceite en un wok.",
        `3. Saltea ${p} primero.`,
        `4. Añade ${v} y saltea 3 min.`,
        "5. Agrega salsa de soja y salpimienta.",
        "6. Sirve caliente con arroz."
      ]),
      essentials: [p, v, "salsa de soja", "aceite"],
      substitutes: { aceite: ["aceite de oliva"] },
      cookTime: 20
    });
  }
}

// --- 21. Tostada de {topping} (8) ---
const toppings = [
  { name: "tomate y aceite", items: ["tomate", "aceite"] },
  { name: "aguacate", items: ["aguacate"] },
  { name: "atún y mayonesa", items: ["atún", "mayonesa"] },
  { name: "jamón y queso", items: ["jamón", "queso"] },
  { name: "pollo y lechuga", items: ["pollo", "lechuga"] },
  { name: "queso y tomate", items: ["queso", "tomate"] },
  { name: "aguacate y huevo", items: ["aguacate", "huevo"] },
  { name: "pavo y queso", items: ["pavo", "queso"] },
];
for (const t of toppings) {
  templates.push({
    title: `Tostada de ${t.name.charAt(0).toUpperCase() + t.name.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Tostada+" + encodeURIComponent(t.name),
    description: makeDescription([
      "1. Tuesta dos rebanadas de pan.",
      `2. Prepara ${t.name}.`,
      "3. Unta o coloca los ingredientes sobre el pan.",
      "4. Salpimienta al gusto.",
      "5. Añade un chorro de aceite si deseas.",
      "6. Sirve inmediatamente."
    ]),
    essentials: ["pan", ...t.items],
    substitutes: { pan: ["pan de molde", "pan integral", "baguette"] },
    cookTime: 10
  });
}

// --- 22. Quesadilla de {filling} (10) ---
const fillings = [
  { name: "queso", items: ["queso"] },
  { name: "queso y jamón", items: ["queso", "jamón"] },
  { name: "queso y pollo", items: ["queso", "pollo"] },
  { name: "queso y champiñones", items: ["queso", "champiñones"] },
  { name: "queso y espinacas", items: ["queso", "espinacas"] },
  { name: "queso y atún", items: ["queso", "atún"] },
  { name: "queso y aguacate", items: ["queso", "aguacate"] },
  { name: "queso y cebolla", items: ["queso", "cebolla"] },
  { name: "queso y pimiento", items: ["queso", "pimiento"] },
  { name: "queso y chorizo", items: ["queso", "chorizo"] },
];
for (const f of fillings) {
  templates.push({
    title: `Quesadilla de ${f.name}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Quesadilla+" + encodeURIComponent(f.name),
    description: makeDescription([
      "1. Coloca una tortilla de maíz en una sartén.",
      `2. Cubre con ${f.name} generosamente.`,
      "3. Tapa con otra tortilla.",
      "4. Cocina a fuego medio 3 min cada lado.",
      "5. Corta en triángulos.",
      "6. Sirve caliente."
    ]),
    essentials: ["tortilla de maíz", ...f.items],
    substitutes: { "tortilla de maíz": ["pan", "pan de molde"] },
    cookTime: 10
  });
}

// --- 23. Pizza de {t1} y {t2} (muchos) ---
const pizzaToppings = ["queso", "mozzarella", "jamón", "champiñones", "pimiento", "cebolla", "tomate", "aceitunas", "chorizo", "atún", "pollo"];
for (let i = 0; i < pizzaToppings.length; i++) {
  for (let j = i + 1; j < pizzaToppings.length; j++) {
    const t1 = pizzaToppings[i];
    const t2 = pizzaToppings[j];
    templates.push({
      title: `Pizza de ${t1.charAt(0).toUpperCase() + t1.slice(1)} y ${t2}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Pizza+" + encodeURIComponent(t1 + "+" + t2),
      description: makeDescription([
        "1. Mezcla harina, agua, aceite y sal para la masa.",
        "2. Amasa y deja reposar 30 min.",
        "3. Estira la masa en forma redonda.",
        "4. Cubre con salsa de tomate.",
        `5. Añade ${t1} y ${t2}.`,
        "6. Hornea a 220°C durante 15 min."
      ]),
      essentials: ["harina", "tomate", t1, t2],
      substitutes: { harina: ["pan"], tomate: ["salsa de tomate", "tomate frito"] },
      cookTime: 50
    });
  }
}

// --- 24. Bol de {carb} con {protein} y {v} (muchos) ---
const bolVeggies = ["espinacas", "lechuga", "tomate", "aguacate", "cebolla", "zanahoria", "pimiento"];
const bolProteins = ["pollo", "atún", "huevo", "gambas", "pavo", "ternera"];
for (const c of ["arroz", "couscous", "quinoa"]) {
  for (const p of bolProteins) {
    for (const v of bolVeggies) {
      templates.push({
        title: `Bol de ${c.charAt(0).toUpperCase() + c.slice(1)} con ${p} y ${v}`,
        image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Bol+" + encodeURIComponent(c + "+" + p),
        description: makeDescription([
          `1. Cocina ${c} según las instrucciones.`,
          `2. Cocina ${p} a la plancha y córtalo en tiras.`,
          `3. Lava y corta ${v} en trozos.`,
          "4. Coloca el carbohidrato de base en un bol.",
          "5. Añade la proteína y la verdura por encima.",
          "6. Aliña con aceite, limón y sal al gusto."
        ]),
        essentials: [c, p, v],
        substitutes: {},
        cookTime: 25
      });
    }
  }
}

// --- 25. {protein} guisado con {v} (muchos) ---
for (const p of ["pollo", "ternera", "cerdo", "pavo"]) {
  for (const v of ["cebolla", "zanahoria", "patata", "pimiento", "champiñones"]) {
    templates.push({
      title: `${p.charAt(0).toUpperCase() + p.slice(1)} Guisado con ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+Guisado"),
      description: makeDescription([
        `1. Corta ${p} en dados y salpimiéntalo.`,
        `2. Sofríe cebolla y ajo picados en una olla.`,
        `3. Añade ${p} y dóralo por todos lados.`,
        `4. Agrega ${v} troceado y cubre con caldo.`,
        "5. Cocina a fuego lento 30 min hasta que esté tierno.",
        "6. Sirve caliente solo o con arroz."
      ]),
      essentials: [p, v, "cebolla"],
      substitutes: { cebolla: ["puerro"] },
      cookTime: 45
    });
  }
}

// --- 26. {protein} al curry (8) ---
for (const p of ["pollo", "ternera", "gambas", "tofu"]) {
  templates.push({
    title: `${p.charAt(0).toUpperCase() + p.slice(1)} al Curry`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+Curry"),
    description: makeDescription([
      `1. Corta ${p} en dados.`,
      "2. Sofríe cebolla y ajo picados.",
      `3. Añade ${p} y dóralo.`,
      "4. Incorpora crema de leche y curry en polvo.",
      "5. Cocina 15 min a fuego suave.",
      "6. Sirve con arroz."
    ]),
    essentials: [p, "crema", "arroz"],
    substitutes: { crema: ["nata", "yogur"], arroz: ["couscous", "quinoa"] },
    cookTime: 30
  });
}

// --- 27. {carb} gratinado con queso (9) ---
for (const c of ["macarrones", "pasta", "spaghetti", "arroz", "patata", "coliflor", "brócoli", "calabacín", "espinacas"]) {
  templates.push({
    title: `${c.charAt(0).toUpperCase() + c.slice(1)} Gratinado con Queso`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Gratinado+" + encodeURIComponent(c),
    description: makeDescription([
      `1. Cocina ${c} en agua hirviendo con sal.`,
      "2. Escurre y coloca en una fuente para horno.",
      "3. Prepara una salsa bechamel con mantequilla, harina y leche.",
      "4. Cubre con la bechamel y queso rallado.",
      "5. Gratina en el horno 15 min a 200°C.",
      "6. Sirve caliente."
    ]),
    essentials: [c, "leche", "queso"],
    substitutes: { leche: ["crema", "nata"], queso: ["queso rallado", "mozzarella"] },
    cookTime: 35
  });
}

// --- 28. {veggie1} y {veggie2} gratinados (muchos) ---
const gratVeggies = ["calabacín", "berenjena", "patata", "batata", "cebolla", "tomate"];
for (let i = 0; i < gratVeggies.length; i++) {
  for (let j = i + 1; j < gratVeggies.length; j++) {
    const v1 = gratVeggies[i];
    const v2 = gratVeggies[j];
    templates.push({
      title: `${v1.charAt(0).toUpperCase() + v1.slice(1)} y ${v2} Gratinados`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Gratinado+" + encodeURIComponent(v1 + "+" + v2),
      description: makeDescription([
        `1. Corta ${v1} y ${v2} en rodajas finas.`,
        "2. Coloca en capas en una fuente para horno.",
        "3. Añade sal, pimienta y un chorro de aceite.",
        "4. Cubre con queso rallado.",
        "5. Hornea 25 min a 200°C.",
        "6. Sirve caliente como acompañamiento."
      ]),
      essentials: [v1, v2, "queso"],
      substitutes: { queso: ["queso rallado", "mozzarella"] },
      cookTime: 35
    });
  }
}

// --- 29. Pinchos de {protein} con {v} (muchos) ---
for (const p of ["pollo", "ternera", "cerdo", "gambas"]) {
  for (const v of ["pimiento", "cebolla", "calabacín", "champiñones"]) {
    templates.push({
      title: `Pinchos de ${p.charAt(0).toUpperCase() + p.slice(1)} con ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Pinchos+" + encodeURIComponent(p + "+" + v),
      description: makeDescription([
        `1. Corta ${p} y ${v} en trozos.`,
        "2. Ensarta alternando en palos de brocheta.",
        "3. Aliña con aceite, sal y especias.",
        "4. Cocina a la plancha 10 min, girando.",
        "5. Sirve caliente con limón."
      ]),
      essentials: [p, v, "aceite"],
      substitutes: { aceite: ["aceite de oliva"] },
      cookTime: 20
    });
  }
}

// --- 30. {v} salteado con {protein} y {carb} (muchos) ---
for (const v of ["pimiento", "cebolla", "zanahoria", "calabacín", "brócoli"]) {
  for (const p of ["pollo", "ternera", "cerdo", "gambas"]) {
    for (const c of ["arroz", "fideos"]) {
      templates.push({
        title: `${v.charAt(0).toUpperCase() + v.slice(1)} Salteado con ${p} y ${c}`,
        image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(v + "+" + p + "+" + c),
        description: makeDescription([
          `1. Cocina ${c} según instrucciones y reserva.`,
          `2. Corta ${v} en tiras y ${p} en dados.`,
          "3. Calienta aceite en un wok.",
          `4. Saltea ${p} primero, luego ${v}.`,
          `5. Añade ${c} y salsa de soja, saltea 2 min.`,
          "6. Sirve caliente."
        ]),
        essentials: [v, p, c, "salsa de soja"],
        substitutes: {},
        cookTime: 25
      });
    }
  }
}

// --- 31. {legume} con {carb} (muchos) ---
for (const l of CATS.legume) {
  for (const c of ["arroz", "pasta", "couscous"]) {
    templates.push({
      title: `${l.charAt(0).toUpperCase() + l.slice(1)} con ${c.charAt(0).toUpperCase() + c.slice(1)}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(l + "+" + c),
      description: makeDescription([
        `1. Cocina ${l} hasta que estén tiernos.`,
        `2. Cocina ${c} según instrucciones.`,
        "3. Sofríe cebolla y ajo picados.",
        `4. Mezcla ${l} con ${c} y el sofrito.`,
        "5. Salpimienta y sirve caliente."
      ]),
      essentials: [l, c, "cebolla"],
      substitutes: { cebolla: ["puerro"] },
      cookTime: 35
    });
  }
}

// --- 32. {v} asado con {protein} (muchos) ---
for (const v of ["patata", "batata", "calabaza", "zanahoria", "cebolla", "pimiento"]) {
  for (const p of ["pollo", "ternera", "cerdo", "pavo"]) {
    templates.push({
      title: `${v.charAt(0).toUpperCase() + v.slice(1)} Asado con ${p}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(v + "+" + p),
      description: makeDescription([
        "1. Precalienta el horno a 200°C.",
        `2. Corta ${v} y ${p} en trozos.`,
        "3. Coloca todo en una bandeja con aceite, sal y romero.",
        "4. Hornea 35-40 min removiendo a mitad.",
        "5. Sirve caliente."
      ]),
      essentials: [v, p, "aceite"],
      substitutes: { aceite: ["aceite de oliva"] },
      cookTime: 45
    });
  }
}

// --- 33. Budín de {v} (12) ---
for (const v of ["espinacas", "calabacín", "zanahoria", "brócoli", "coliflor", "patata", "batata", "berenjena", "champiñones", "cebolla", "calabaza", "puerro"]) {
  templates.push({
    title: `Budín de ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Budin+" + encodeURIComponent(v),
    description: makeDescription([
      `1. Cocina ${v} al vapor y haz puré.`,
      "2. Mezcla con huevos batidos, leche y queso rallado.",
      "3. Vierte en un molde engrasado.",
      "4. Hornea 30 min a 180°C.",
      "5. Deja enfriar 5 min y desmolda.",
      "6. Sirve caliente o frío."
    ]),
    essentials: [v, "huevo", "leche"],
    substitutes: { leche: ["crema", "nata"] },
    cookTime: 45
  });
}

// --- 34. {protein} rebozado (9) ---
for (const p of ["pollo", "ternera", "cerdo", "pavo", "berenjena", "calabacín", "champiñones", "coliflor", "cebolla"]) {
  templates.push({
    title: `${p.charAt(0).toUpperCase() + p.slice(1)} Rebozado`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+Rebozado"),
    description: makeDescription([
      `1. Corta ${p} en rodajas finas.`,
      "2. Sazona con sal y pimienta.",
      "3. Pasa por harina, huevo batido y pan rallado.",
      "4. Fríe en aceite caliente 3 min cada lado.",
      "5. Escurre sobre papel absorbente.",
      "6. Sirve caliente con limón."
    ]),
    essentials: [p, "huevo", "pan rallado", "aceite"],
    substitutes: { "pan rallado": ["pan"], aceite: ["aceite de oliva"] },
    cookTime: 20
  });
}

// --- 35. Ensalada de {carb} con {protein} (muchos) ---
for (const c of ["pasta", "arroz", "couscous", "quinoa"]) {
  for (const p of ["atún", "pollo", "huevo", "jamón", "gambas"]) {
    for (const v of ["tomate", "maíz", "cebolla", "pimiento", "aceitunas"]) {
      templates.push({
        title: `Ensalada de ${c.charAt(0).toUpperCase() + c.slice(1)} con ${p} y ${v}`,
        image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Ensalada+" + encodeURIComponent(c + "+" + p),
        description: makeDescription([
          `1. Cocina ${c} y deja enfriar.`,
          `2. Mezcla ${c} con ${p} desmenuzado y ${v} picado.`,
          "3. Aliña con aceite, vinagre y sal.",
          "4. Opcional: mayonesa o yogur.",
          "5. Sirve fría."
        ]),
        essentials: [c, p, v],
        substitutes: {},
        cookTime: 20
      });
    }
  }
}

// --- 36. {protein} con salsa de {v} (muchos) ---
for (const p of ["pollo", "ternera", "cerdo", "pavo"]) {
  for (const v of ["champiñones", "cebolla", "pimiento", "tomate", "espinacas"]) {
    templates.push({
      title: `${p.charAt(0).toUpperCase() + p.slice(1)} con Salsa de ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(p + "+Salsa+" + v),
      description: makeDescription([
        `1. Cocina ${p} en una sartén con aceite.`,
        `2. Sofríe ${v} picado con ajo y cebolla.`,
        "3. Añade crema de leche y tritura para la salsa.",
        `4. Vierte la salsa de ${v} sobre ${p}.`,
        "5. Cocina 5 min más a fuego suave.",
        "6. Sirve con arroz o patatas."
      ]),
      essentials: [p, v, "crema", "cebolla"],
      substitutes: { crema: ["nata", "leche"], cebolla: ["puerro"] },
      cookTime: 35
    });
  }
}

// --- 37. {v1} relleno de {v2} y queso (muchos) ---
for (const v1 of ["berenjena", "calabacín", "pimiento", "pimiento del piquillo"]) {
  for (const v2 of ["espinacas", "champiñones", "cebolla", "puerro"]) {
    templates.push({
      title: `${v1.charAt(0).toUpperCase() + v1.slice(1)} Rellena de ${v2} y Queso`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=" + encodeURIComponent(v1 + "+" + v2),
      description: makeDescription([
        `1. Parte ${v1} por la mitad y vacíala.`,
        `2. Sofríe ${v2} picado con ajo.`,
        "3. Mezcla con queso rallado.",
        `4. Rellena ${v1} con la mezcla.`,
        "5. Hornea 20 min a 200°C.",
        "6. Sirve caliente."
      ]),
      essentials: [v1, v2, "queso"],
      substitutes: { queso: ["queso rallado", "mozzarella", "queso fresco"] },
      cookTime: 35
    });
  }
}

// --- 38. Frittata de {v} (muchos) ---
for (const v of CATS.veggie) {
  if (["lechuga", "aguacate", "tomates cherry", "pepino"].includes(v)) continue;
  templates.push({
    title: `Frittata de ${v.charAt(0).toUpperCase() + v.slice(1)}`,
    image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Frittata+" + encodeURIComponent(v),
    description: makeDescription([
      `1. Saltea ${v} en una sartén con aceite.`,
      "2. Bate 4 huevos con sal, pimienta y queso rallado.",
      `3. Vierte los huevos sobre ${v}.`,
      "4. Cocina a fuego bajo 10 min.",
      "5. Gratina 5 min en el horno.",
      "6. Sirve en cuñas."
    ]),
    essentials: ["huevo", v, "queso"],
    substitutes: { queso: ["queso rallado", "mozzarella"] },
    cookTime: 25
  });
}

// --- 39. Rollitos de {v} rellenos de {protein} (muchos) ---
for (const v of ["berenjena", "calabacín"]) {
  for (const p of ["pollo", "ternera", "queso", "atún", "jamón"]) {
    templates.push({
      title: `Rollitos de ${v.charAt(0).toUpperCase() + v.slice(1)} Rellenos de ${p}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Rollitos+" + encodeURIComponent(v + "+" + p),
      description: makeDescription([
        `1. Corta ${v} en láminas finas a lo largo.`,
        "2. Saltéalas 2 min en una sartén.",
        `3. Prepara ${p} como relleno.`,
        `4. Coloca ${p} sobre cada lámina y enrolla.`,
        "5. Cubre con salsa de tomate y queso.",
        "6. Hornea 15 min a 200°C."
      ]),
      essentials: [v, p, "tomate"],
      substitutes: { tomate: ["salsa de tomate", "tomate frito"] },
      cookTime: 30
    });
  }
}

// --- 40. Sopa de {legume} con {v} (muchos) ---
for (const l of CATS.legume) {
  for (const v of ["zanahoria", "patata", "cebolla", "apio", "puerro", "calabaza"]) {
    templates.push({
      title: `Sopa de ${l.charAt(0).toUpperCase() + l.slice(1)} con ${v}`,
      image: "https://placehold.co/400x300/D2691E/FFFDD0?text=Sopa+" + encodeURIComponent(l + "+" + v),
      description: makeDescription([
        `1. Sofríe ${v} picado con cebolla y ajo.`,
        `2. Añade ${l} y cubre con caldo.`,
        "3. Cocina 30 min hasta que esté tierno.",
        "4. Salpimienta y añade comino o pimentón.",
        "5. Sirve caliente con pan."
      ]),
      essentials: [l, v, "cebolla"],
      substitutes: { cebolla: ["puerro"] },
      cookTime: 40
    });
  }
}

export default function generateRecipes() {
  const recipes = templates.map((t, idx) => ({
    id: idx + 1,
    title: t.title,
    emoji: emojiFor(t.essentials),
    image: t.image,
    description: t.description,
    essentials: t.essentials,
    substitutes: t.substitutes,
    cookTime: t.cookTime,
  }));
  return recipes;
}
