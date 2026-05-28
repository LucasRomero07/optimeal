import { useState } from "react";
import { getEmoji, getCategories } from "../data/ingredients";
import DIETS from "../data/diets";

export default function ProfileSettings({ profile, setProfile, onClose }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("allergies");
  const [dislikeInput, setDislikeInput] = useState("");

  const q = search.toLowerCase();

  const update = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const toggleList = (field, item) => {
    const list = profile[field] || [];
    if (list.includes(item)) {
      update(field, list.filter((i) => i !== item));
    } else {
      update(field, [...list, item]);
    }
  };

  const addDislikeTag = () => {
    const tag = dislikeInput.trim().toLowerCase();
    if (!tag) return;
    const list = profile.dislikes || [];
    if (!list.includes(tag)) {
      update("dislikes", [...list, tag]);
    }
    setDislikeInput("");
  };

  const removeDislikeTag = (tag) => {
    update("dislikes", (profile.dislikes || []).filter((t) => t !== tag));
  };

  const handleDislikeKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addDislikeTag();
    }
  };

  const categories = getCategories()
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.includes(q)),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="view profile-view">
      <header className="header">
        <button className="btn btn-back" onClick={onClose}>
          ← Volver
        </button>
        <h1>⚙️ Mi Perfil</h1>
        <p className="subtitle">{profile.name}</p>
      </header>

      <div className="diet-selector">
        <span className="time-label">🥗 Dieta:</span>
        <div className="diet-options">
          {DIETS.map((d) => (
            <button
              key={d.id}
              className={`time-btn ${profile.diet === d.id ? "time-btn--on" : ""}`}
              onClick={() => update("diet", d.id)}
            >
              {d.icon} {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`profile-tab ${tab === "allergies" ? "profile-tab--on" : ""}`}
          onClick={() => setTab("allergies")}
        >
          🤧 Alergias
        </button>
        <button
          className={`profile-tab ${tab === "dislikes" ? "profile-tab--on" : ""}`}
          onClick={() => setTab("dislikes")}
        >
          👎 Preferencias
        </button>
      </div>

      {tab === "allergies" ? (
        <>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar alergias..."
            className="search-input"
          />

          <div className="chip-list">
            {(profile.allergies || []).length === 0 && (
              <p className="empty-msg">No tienes alergias registradas</p>
            )}
            {(profile.allergies || []).map((item) => (
              <span key={item} className="chip chip-danger">
                <span>{getEmoji(item)}</span>
                <span>{item}</span>
                <span className="chip-x" onClick={() => toggleList("allergies", item)}>
                  ✕
                </span>
              </span>
            ))}
          </div>

          {categories.map((cat) => (
            <div key={cat.name} className="cat-section">
              <h3 className="cat-title">{cat.icon} {cat.name}</h3>
              <div className="ingredient-grid">
                {cat.items.map((name) => {
                  const active = (profile.allergies || []).includes(name);
                  return (
                    <button
                      key={name}
                      className={`grid-item ${active ? "grid-item--danger" : ""}`}
                      onClick={() => toggleList("allergies", name)}
                    >
                      <span className="grid-emoji">{getEmoji(name)}</span>
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <p className="empty-msg">No se encontraron ingredientes</p>
          )}
        </>
      ) : (
        <>
          <p className="time-label">
            Escribe términos que no quieras ver (ej: pastas, oriental, sopas)
          </p>
          <div className="dislike-input-row">
            <input
              type="text"
              value={dislikeInput}
              onChange={(e) => setDislikeInput(e.target.value)}
              onKeyDown={handleDislikeKey}
              placeholder="Ej: pastas, oriental, sopas..."
              className="search-input"
            />
            <button className="btn btn-primary" onClick={addDislikeTag}>
              Añadir
            </button>
          </div>

          <div className="chip-list">
            {(!profile.dislikes || profile.dislikes.length === 0) && (
              <p className="empty-msg">No has añadido preferencias</p>
            )}
            {(profile.dislikes || []).map((tag) => (
              <span key={tag} className="chip chip-danger">
                <span>👎 {tag}</span>
                <span className="chip-x" onClick={() => removeDislikeTag(tag)}>
                  ✕
                </span>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
