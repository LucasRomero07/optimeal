import { useState } from "react";

export default function LoginScreen({ profile, setProfile, onStart }) {
  const [name, setName] = useState(profile.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setProfile({ ...profile, name: name.trim() });
    onStart();
  };

  return (
    <div className="view login-view">
      <header className="header">
        <h1>🥘 OptiMeal</h1>
        <p className="subtitle">¿Qué cocino hoy con lo que tengo?</p>
      </header>

      <div className="login-card">
        <p className="login-welcome">
          Bienvenido a OptiMeal. Para personalizar tus recomendaciones, dinos quién eres.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre..."
            className="input search-input"
            autoFocus
          />
          <button
            type="submit"
            className="btn btn-primary hungry-btn"
            disabled={!name.trim()}
          >
            Empezar
          </button>
        </form>
      </div>
    </div>
  );
}
