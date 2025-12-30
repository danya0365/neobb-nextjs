"use client";

import Link from "next/link";
import { useState } from "react";

interface Theme {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const mockThemes: Theme[] = [
  { id: "default", name: "Default", description: "Standard NeoBB theme", isActive: true },
  { id: "ocean", name: "Ocean Blue", description: "Blue ocean theme", isActive: false },
  { id: "forest", name: "Forest Green", description: "Nature green theme", isActive: false },
  { id: "sunset", name: "Sunset Orange", description: "Orange sunset theme", isActive: false },
  { id: "midnight", name: "Midnight Dark", description: "Dark purple theme", isActive: false },
];

export function RetroAdminThemesContent() {
  const [themes, setThemes] = useState(mockThemes);

  const activateTheme = (id: string) => {
    setThemes(prev => prev.map(t => ({
      ...t,
      isActive: t.id === id,
    })));
  };

  return (
    <div className="retro-window">
      <div className="retro-window-title">
        <span>Theme Manager - NeoBB Admin</span>
      </div>
      <div className="retro-window-content">
        <div style={{ marginBottom: "10px" }}>
          <Link href="/admin" className="retro-link">[← Back to Admin]</Link>
          <span style={{ margin: "0 10px" }}>|</span>
          <button className="retro-button">[Create Theme]</button>
        </div>

        <table className="retro-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Theme Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme) => (
              <tr key={theme.id}>
                <td>
                  <strong>{theme.name}</strong>
                </td>
                <td>{theme.description}</td>
                <td style={{ textAlign: "center" }}>
                  {theme.isActive ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>ACTIVE</span>
                  ) : (
                    <span style={{ color: "gray" }}>Inactive</span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {!theme.isActive && (
                    <button
                      className="retro-button"
                      onClick={() => activateTheme(theme.id)}
                      style={{ marginRight: "5px" }}
                    >
                      [Activate]
                    </button>
                  )}
                  <button className="retro-button" style={{ marginRight: "5px" }}>[Edit]</button>
                  <button className="retro-button">[Preview]</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
