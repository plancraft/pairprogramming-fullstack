import * as React from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type AppState = {
  todos: Todo[];
  isLoadingTodos: boolean;
  todosError: string | null;
};

export class App extends React.Component {
  state: AppState = {
    todos: [],
    isLoadingTodos: true,
    todosError: null,
  };

  componentDidMount() {
    this.fetchTodos();
  }

  private fetchTodos() {
    fetch("http://localhost:3001/api/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Laden der ToDos");
        }

        return response.json() as Promise<Todo[]>;
      })
      .then((todos) => {
        this.setState({
          todos,
          isLoadingTodos: false,
        });
      })
      .catch(() => {
        this.setState({
          todosError: "ToDos konnten nicht geladen werden",
          isLoadingTodos: false,
        });
      });
  }

  render() {
    const { todos, isLoadingTodos, todosError } = this.state;
    const openTodosCount = todos.filter((todo) => !todo.completed).length;

    return (
      <div className="page-shell">
        <div className="main-page">
          <div className="hero">
            <p className="hero-date">Montag, 16.02.2026</p>
            <h1 className="hero-title">Guten Morgen, Sophie!</h1>
            <div className="action-suggestions">
              <p className="action-suggestions-label">Vorschlage fur dich:</p>
              <div className="action-button-row">
                <button type="button" className="action-button">
                  <span className="material-symbols-outlined action-icon">
                    add_circle
                  </span>
                  Neues Projekt starten
                </button>
                <button type="button" className="action-button">
                  <span className="material-symbols-outlined action-icon">
                    history
                  </span>
                  Letzte Rechnung fortsetzen
                </button>
                <button type="button" className="action-button">
                  <span className="material-symbols-outlined action-icon">
                    folder_open
                  </span>
                  Kundenakte offnen
                </button>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="content-card-header">
              <h2 className="content-title">Zuletzt bearbeitete Projekte</h2>
              <span className="badge-new">NEU</span>
            </div>

            <div className="project-row">
              <div className="project-main">
                <p className="project-name">Carls AbschlagsRechnungsProject</p>
                <div className="project-meta">
                  <span className="meta-pill">Kein Kunde</span>
                  <span className="meta-pill">Kein Status</span>
                </div>
              </div>
              <span className="project-expand material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </div>

            <div className="timeline-entry">
              <p className="timeline-day">Heute · 07:59</p>
              <p className="timeline-user">Carl Klukkert</p>
              <p className="timeline-action">Aktualisiert dschulia</p>
            </div>

            <div className="project-row muted-row">
              <div className="project-main">
                <p className="project-name">Lagerbestand 2026</p>
                <div className="project-meta">
                  <span className="meta-pill">Muster GmbH</span>
                  <span className="meta-pill">In Bearbeitung</span>
                </div>
              </div>
              <span className="project-expand material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </div>

            <div className="timeline-entry">
              <p className="timeline-day">Gestern · 16:17</p>
              <p className="timeline-user">Stefan Maier</p>
              <p className="timeline-action">Neue Positionen hinzugefugt</p>
            </div>

            <div className="project-row muted-row">
              <div className="project-main">
                <p className="project-name">Q1 Angebotsubersicht</p>
                <div className="project-meta">
                  <span className="meta-pill">Nordic Partner</span>
                  <span className="meta-pill">Review offen</span>
                </div>
              </div>
              <span className="project-expand material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </div>

            <div className="timeline-entry">
              <p className="timeline-day">Freitag · 11:42</p>
              <p className="timeline-user">Julia Klein</p>
              <p className="timeline-action">Version zur Freigabe markiert</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="content-card small-card">
              <div className="content-card-header">
                <h2 className="content-title">ToDo</h2>
                <span className="badge-new">{openTodosCount} offen</span>
              </div>

              {isLoadingTodos ? (
                <p className="todo-sub">ToDos werden geladen...</p>
              ) : null}
              {todosError ? <p className="todo-sub">{todosError}</p> : null}

              {!isLoadingTodos && !todosError
                ? todos.map((todo) => (
                    <div className="todo-row" key={todo.id}>
                      <div
                        className={`todo-check ${todo.completed ? "completed" : ""}`}
                      />
                      <div className="todo-main">
                        <p className="todo-title">{todo.title}</p>
                        <p className="todo-sub">
                          {todo.completed ? "Abgeschlossen" : "Offen"} · ID{" "}
                          {todo.id}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <div className="content-card small-card">
              <div className="content-card-header">
                <h2 className="content-title">Offene Aufgaben</h2>
              </div>

              <div className="task-row">
                <p className="task-title">8 Positionen ohne Preiszuordnung</p>
                <span className="task-tag warning">Hoch</span>
              </div>
              <div className="task-row">
                <p className="task-title">Kundenfeedback Q1 einarbeiten</p>
                <span className="task-tag">Mittel</span>
              </div>
              <div className="task-row">
                <p className="task-title">Freigabe von Angebot 2247</p>
                <span className="task-tag low">Niedrig</span>
              </div>
            </div>

            <div className="content-card small-card">
              <div className="content-card-header">
                <h2 className="content-title">Team Aktivitat</h2>
              </div>

              <div className="activity-row">
                <p className="activity-user">Carl Klukkert</p>
                <p className="activity-text">hat ein neues Projekt angelegt</p>
                <p className="activity-time">Heute · 07:21</p>
              </div>

              <div className="activity-row">
                <p className="activity-user">Dschulia Brenner</p>
                <p className="activity-text">
                  hat den Status auf In Review gesetzt
                </p>
                <p className="activity-time">Heute · 06:58</p>
              </div>

              <div className="activity-row">
                <p className="activity-user">Stefan Maier</p>
                <p className="activity-text">hat 3 Dokumente hochgeladen</p>
                <p className="activity-time">Gestern · 17:08</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="content-card-header">
              <h2 className="content-title">Favoriten</h2>
            </div>

            <div className="favorite-grid">
              <div className="favorite-item">
                <p className="favorite-name">Monatsreporting 2026</p>
                <p className="favorite-sub">Zuletzt geoffnet vor 2 Stunden</p>
              </div>
              <div className="favorite-item">
                <p className="favorite-name">Rohstoffpreise Export</p>
                <p className="favorite-sub">Zuletzt geoffnet gestern</p>
              </div>
              <div className="favorite-item">
                <p className="favorite-name">Vertrieb Onboarding</p>
                <p className="favorite-sub">Zuletzt geoffnet Freitag</p>
              </div>
              <div className="favorite-item">
                <p className="favorite-name">Abschlusse Q4</p>
                <p className="favorite-sub">Zuletzt geoffnet 13.02.2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
