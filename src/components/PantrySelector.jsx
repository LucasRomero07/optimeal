import { useState } from "react";
import { getEmoji, getCategories } from "../data/ingredients";

const TIME_OPTIONS = [
  { label: "Sin límite", value: 0 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
];

const CATEGORIES = getCategories();

export default function PantrySelector({
  pantry,
  setPantry,
  maxCookTime,
  setMaxCookTime,
  onHungry,
  onOpenSettings,
  onOpenHistory,
  blockedIngredients = [],
  favoriteIngredients = [],
}) {
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState(new Set());

  const toggleIngredient = (name) => {
    if (pantry.includes(name)) {
      setPantry(pantry.filter((i) => i !== name));
    } else {
      setPantry([...pantry, name]);
    }
  };

  const toggleCat = (name) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const q = search.toLowerCase();

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) => i.includes(q) && !blockedIngredients.includes(i)),
  })).filter((cat) => cat.items.length > 0);

  const isCatOpen = (name) => q.length > 0 || openCats.has(name);

  return (
    <div className="view pantry-view">
      <header className="header">
        <h1>🥘 OptiMeal</h1>
        <p className="subtitle">Toca los ingredientes que tienes</p>
        <button className="btn-header-icon btn-header-icon--left" onClick={onOpenHistory} title="Historial">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
        </button>
        <button className="btn-header-icon btn-header-icon--right" onClick={onOpenSettings} title="Preferencias">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.3.07-.62.07-.94s-.03-.64-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07 1l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/></svg>
        </button>
      </header>

      <button
        className="btn btn-primary hungry-btn"
        onClick={onHungry}
        disabled={pantry.length === 0}
      >
        ¡Tengo Hambre! ¿Qué cocino?
      </button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar ingredientes..."
        className="input search-input"
      />

      <div className="chip-list">
        {pantry.length === 0 && (
          <p className="empty-msg">Ningún ingrediente seleccionado</p>
        )}
        {pantry.map((item) => (
          <span key={item} className="chip">
            <span>{getEmoji(item)}</span>
            <span>{item}</span>
            <button className="chip-x" onClick={() => toggleIngredient(item)}>
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className="time-filter">
        <span className="time-label">⏱ Tiempo máximo:</span>
        <div className="time-options">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`time-btn ${maxCookTime === opt.value ? "time-btn--on" : ""}`}
              onClick={() => setMaxCookTime(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCategories.map((cat) => {
        const open = isCatOpen(cat.name);
        const selectedCount = cat.items.filter((i) => pantry.includes(i)).length;
        return (
          <div key={cat.name} className="cat-section">
            <button className="cat-title cat-title--btn" onClick={() => toggleCat(cat.name)}>
              <span>{cat.icon} {cat.name}</span>
              <span className="cat-title-right">
                {!open && selectedCount > 0 && (
                  <span className="cat-count">{selectedCount}</span>
                )}
                <svg
                  className={`cat-chevron${open ? " cat-chevron--open" : ""}`}
                  width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                >
                  <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
              </span>
            </button>
            {open && (
              <div className="ingredient-grid">
                {cat.items.map((name) => {
                  const selected = pantry.includes(name);
                  const isFav = favoriteIngredients.includes(name);
                  return (
                    <button
                      key={name}
                      className={`grid-item${selected ? " grid-item--on" : ""}${isFav ? " grid-item--fav" : ""}`}
                      onClick={() => toggleIngredient(name)}
                    >
                      <span className="grid-emoji">{getEmoji(name)}</span>
                      <span>{name}</span>
                      {isFav && <span className="grid-fav-badge">⭐</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {filteredCategories.length === 0 && (
        <p className="empty-msg">No se encontraron ingredientes</p>
      )}
    </div>
  );
}
