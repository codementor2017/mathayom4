/* ============================================
   TEACHER PROGRESS TRACKER · JavaScript
   ============================================ */

// ===== LESSON DATA (all 40 lessons) =====
const LESSONS = [
  // Semester 1
  { sem: 1, num: 1, title: "Introduction to Computational Thinking", objective: "Can explain the 4 pillars at project scale and identify a domain." },
  { sem: 1, num: 2, title: "Decomposition in Real-World Projects", objective: "Can decompose a project into at least 3 levels." },
  { sem: 1, num: 3, title: "Pattern Recognition & Abstraction", objective: "Can create architecture, data flow, and user flow models." },
  { sem: 1, num: 4, title: "Algorithm Design for Complete Systems", objective: "Can write pseudocode for the full system." },
  { sem: 1, num: 5, title: "Observing and Identifying Real Problems", objective: "Can identify problems and root causes using 5 Whys." },
  { sem: 1, num: 6, title: "Conducting User Needs Assessment", objective: "Can conduct a user assessment and create personas." },
  { sem: 1, num: 7, title: "Writing Problem Statements and Goals", objective: "Can write a clear, measurable problem statement." },
  { sem: 1, num: 8, title: "Exploring Domains", objective: "Can describe domain challenges and connect their project." },
  { sem: 1, num: 9, title: "Project Lifecycle and Development Phases", objective: "Can map their project to the lifecycle." },
  { sem: 1, num: 10, title: "Timeline, Milestones, and Task Breakdown", objective: "Can create a realistic timeline with milestones." },
  { sem: 1, num: 11, title: "Roles, Responsibilities, and Teamwork", objective: "Can define roles and create a team charter." },
  { sem: 1, num: 12, title: "Risk Assessment and Documentation", objective: "Can identify risks and create a mitigation plan." },
  { sem: 1, num: 13, title: "Functional and Non-Functional Requirements", objective: "Can write and prioritize requirements." },
  { sem: 1, num: 14, title: "System Architecture and Component Design", objective: "Can design a system architecture." },
  { sem: 1, num: 15, title: "Data Flow Diagrams and Process Modeling", objective: "Can create DFDs at multiple levels." },
  { sem: 1, num: 16, title: "Choosing Tools and Technologies", objective: "Can choose appropriate tools for their project." },
  { sem: 1, num: 17, title: "Building the First Prototype", objective: "Can build a basic prototype with core functionality." },
  { sem: 1, num: 18, title: "Basic User Interface Design", objective: "Can design and test a UI." },
  { sem: 1, num: 19, title: "Connecting Components", objective: "Can connect UI, logic, and data." },
  { sem: 1, num: 20, title: "Semester 1 Review and Milestone", objective: "Can present progress and set goals." },
  // Semester 2
  { sem: 2, num: 1, title: "Introduction to Data Modeling", objective: "Can create a data model with tables and fields." },
  { sem: 2, num: 2, title: "Database Tables and Relationships", objective: "Can create an ER diagram with relationships." },
  { sem: 2, num: 3, title: "Writing Basic Queries", objective: "Can write basic SQL queries." },
  { sem: 2, num: 4, title: "Connecting Programs to Databases", objective: "Can connect a program to a database." },
  { sem: 2, num: 5, title: "Designing Interactive User Interfaces", objective: "Can design interactive features with feedback." },
  { sem: 2, num: 6, title: "Building Input Forms and Search Features", objective: "Can build functional forms and search." },
  { sem: 2, num: 7, title: "Recommendation and Feedback Systems", objective: "Can build recommendation and feedback features." },
  { sem: 2, num: 8, title: "Accessibility and Error Handling", objective: "Can add accessibility and error handling." },
  { sem: 2, num: 9, title: "Automation Logic: Sensors to Actions", objective: "Can build a basic automation module." },
  { sem: 2, num: 10, title: "IoT Integration for Real-World Projects", objective: "Can integrate IoT into their project." },
  { sem: 2, num: 11, title: "Real-Time Data Collection and Response", objective: "Can collect and respond to real-time data." },
  { sem: 2, num: 12, title: "Energy and Agriculture Automation", objective: "Can build domain-specific automation." },
  { sem: 2, num: 13, title: "Creating a Test Plan", objective: "Can create and execute a test plan." },
  { sem: 2, num: 14, title: "Usability Testing with Real Users", objective: "Can conduct a usability test." },
  { sem: 2, num: 15, title: "Collecting and Analyzing User Feedback", objective: "Can analyze feedback and prioritize improvements." },
  { sem: 2, num: 16, title: "Iterating and Improving the Project", objective: "Can iterate and document improvements." },
  { sem: 2, num: 17, title: "Social and Environmental Impact", objective: "Can assess social and environmental impact." },
  { sem: 2, num: 18, title: "Data Privacy and Responsible Innovation", objective: "Can identify privacy risks and apply principles." },
  { sem: 2, num: 19, title: "Preparing the Project Portfolio", objective: "Can prepare a portfolio and demonstration." },
  { sem: 2, num: 20, title: "Final Project Presentation and Reflection", objective: "Can present final project and reflect." }
];

// ===== STATUS OPTIONS =====
const STATUSES = [
  { key: "met", label: "Met", icon: "✅", cls: "status-met", title: "Objective met" },
  { key: "progress", label: "In Progress", icon: "🔄", cls: "status-progress", title: "In progress" },
  { key: "notstarted", label: "Not Started", icon: "—", cls: "status-notstarted", title: "Not started" },
  { key: "support", label: "Needs Support", icon: "⚠️", cls: "status-support", title: "Needs support" }
];

// ===== STATE =====
let groups = [];
let progress = {};       // { groupName: { "s1-1": "met", ... } }
let teacherNotes = "";
let currentSemesterFilter = "all";

// ===== LOAD FROM LOCAL STORAGE =====
function loadState() {
  try {
    const saved = localStorage.getItem("g10tracker");
    if (saved) {
      const data = JSON.parse(saved);
      groups = data.groups || [];
      progress = data.progress || {};
      teacherNotes = data.teacherNotes || "";
      document.getElementById("teacherNotes").value = teacherNotes;
    }
  } catch (e) {
    console.warn("Could not load saved data:", e);
  }

  if (groups.length === 0) {
    // Default groups
    groups = ["Group 1", "Group 2", "Group 3", "Group 4"];
    groups.forEach(g => {
      progress[g] = {};
      LESSONS.forEach(l => {
        progress[g][`s${l.sem}-${l.num}`] = "notstarted";
      });
    });
  }
}

// ===== SAVE TO LOCAL STORAGE =====
function saveState() {
  teacherNotes = document.getElementById("teacherNotes").value;
  const data = { groups, progress, teacherNotes };
  localStorage.setItem("g10tracker", JSON.stringify(data));
  flashMessage("Progress saved ✅");
}

function flashMessage(msg) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: #2f7a4c; color: #fff;
    padding: 0.8rem 1.4rem; border-radius: 30px;
    font-size: 0.9rem; font-weight: 600;
    box-shadow: 0 8px 20px -8px rgba(0,0,0,0.4);
    z-index: 9999; opacity: 0; transition: opacity 0.3s ease;
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.style.opacity = "1");
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  }, 1800);
}

// ===== RENDER GROUPS =====
function renderGroupChips() {
  const container = document.getElementById("groupChips");
  container.innerHTML = "";
  groups.forEach(g => {
    const chip = document.createElement("span");
    chip.className = "group-chip";
    chip.innerHTML = `
      <i class="fas fa-users"></i> ${g}
      <button class="remove-group" data-group="${g}" title="Remove group">
        <i class="fas fa-times"></i>
      </button>
    `;
    container.appendChild(chip);
  });

  container.querySelectorAll(".remove-group").forEach(btn => {
    btn.addEventListener("click", e => {
      const g = e.currentTarget.dataset.group;
      if (confirm(`Remove "${g}" and all its progress?`)) {
        groups = groups.filter(x => x !== g);
        delete progress[g];
        renderAll();
      }
    });
  });
}

// ===== RENDER TABLE =====
function renderTable() {
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");

  // Header
  head.innerHTML = `
    <tr>
      <th style="min-width:200px;">Lesson / Objective</th>
      ${groups.map(g => `<th class="lesson-col">${g}</th>`).join("")}
    </tr>
  `;

  // Body
  body.innerHTML = "";
  let currentSem = null;

  LESSONS.forEach(l => {
    // Semester divider
    if (l.sem !== currentSem) {
      currentSem = l.sem;
      if (currentSem === 1) {
        const divRow = document.createElement("tr");
        divRow.className = "semester-divider";
        divRow.innerHTML = `<td colspan="${groups.length + 1}">
          🌱 SEMESTER 1 — Foundation, Planning, Design & Prototype
        </td>`;
        body.appendChild(divRow);
      } else {
        const divRow = document.createElement("tr");
        divRow.className = "semester-divider";
        divRow.innerHTML = `<td colspan="${groups.length + 1}">
          💧 SEMESTER 2 — Database, Interaction, Automation & Presentation
        </td>`;
        body.appendChild(divRow);
      }
    }

    const row = document.createElement("tr");
    row.dataset.lessonKey = `s${l.sem}-${l.num}`;
    row.dataset.sem = l.sem;

    // Lesson cell
    const lessonCell = document.createElement("td");
    lessonCell.className = "objective-cell";
    lessonCell.innerHTML = `
      <strong>Lesson ${l.num}: ${l.title}</strong>
      ${l.objective}
    `;
    row.appendChild(lessonCell);

    // Group status cells
    groups.forEach(g => {
      const status = progress[g]?.[`s${l.sem}-${l.num}`] || "notstarted";
      const cell = document.createElement("td");
      cell.className = "status-cell";
      cell.dataset.group = g;
      cell.dataset.lessonKey = `s${l.sem}-${l.num}`;
      cell.innerHTML = renderStatusBadge(status);
      cell.title = "Click to cycle status";
      cell.addEventListener("click", () => cycleStatus(g, `s${l.sem}-${l.num}`, cell));
      row.appendChild(cell);
    });

    body.appendChild(row);
  });

  applySemesterFilter();
}

function renderStatusBadge(status) {
  const s = STATUSES.find(x => x.key === status) || STATUSES[2];
  return `<span class="status-badge ${s.cls}" title="${s.title}">${s.icon}</span>`;
}

// ===== CYCLE STATUS =====
function cycleStatus(group, lessonKey, cell) {
  const current = progress[group]?.[lessonKey] || "notstarted";
  const idx = STATUSES.findIndex(s => s.key === current);
  const next = STATUSES[(idx + 1) % STATUSES.length];

  if (!progress[group]) progress[group] = {};
  progress[group][lessonKey] = next.key;

  cell.innerHTML = renderStatusBadge(next.key);
  updateStats();
  autoSave();
}

// ===== SEMESTER FILTER =====
function applySemesterFilter() {
  document.querySelectorAll("#tableBody tr[data-sem]").forEach(row => {
    const sem = row.dataset.sem;
    if (currentSemesterFilter === "all" || sem === currentSemesterFilter) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // Hide/show divider rows based on filter
  document.querySelectorAll("#tableBody tr.semester-divider").forEach(row => {
    const nextRow = row.nextElementSibling;
    if (!nextRow) return;
    const sem = nextRow.dataset.sem;
    if (currentSemesterFilter === "all" || sem === currentSemesterFilter) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// ===== STATS =====
function updateStats() {
  let met = 0, prog = 0, notStarted = 0, support = 0;
  let total = 0;

  groups.forEach(g => {
    LESSONS.forEach(l => {
      total++;
      const s = progress[g]?.[`s${l.sem}-${l.num}`] || "notstarted";
      if (s === "met") met++;
      else if (s === "progress") prog++;
      else if (s === "support") support++;
      else notStarted++;
    });
  });

  document.getElementById("totalCompleted").textContent = met;
  document.getElementById("totalInProgress").textContent = prog;
  document.getElementById("totalNotStarted").textContent = notStarted;

  const pct = total > 0 ? Math.round((met / total) * 100) : 0;
  document.getElementById("overallProgress").textContent = pct + "%";
}

// ===== RENDER ALL =====
function renderAll() {
  renderGroupChips();
  renderTable();
  updateStats();
}

// ===== AUTO SAVE (debounced) =====
let autoSaveTimer = null;
function autoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(saveState, 800);
}

// ===== EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderAll();

  // Add group
  document.getElementById("addGroupBtn").addEventListener("click", () => {
    const name = prompt("Enter group name (e.g. Group 5):");
    if (name && name.trim()) {
      const trimmed = name.trim();
      if (groups.includes(trimmed)) {
        alert("That group already exists.");
        return;
      }
      groups.push(trimmed);
      progress[trimmed] = {};
      LESSONS.forEach(l => {
        progress[trimmed][`s${l.sem}-${l.num}`] = "notstarted";
      });
      renderAll();
      autoSave();
    }
  });

  // Semester filter
  document.getElementById("semesterFilter").addEventListener("change", e => {
    currentSemesterFilter = e.target.value;
    applySemesterFilter();
  });

  // Save button
  document.getElementById("saveBtn").addEventListener("click", () => {
    saveState();
  });

  // Print button
  document.getElementById("printBtn").addEventListener("click", () => {
    saveState();
    window.print();
  });

  // Reset button
  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      localStorage.removeItem("g10tracker");
      location.reload();
    }
  });

  // Notes auto-save
  document.getElementById("teacherNotes").addEventListener("input", () => {
    teacherNotes = document.getElementById("teacherNotes").value;
    autoSave();
  });

  // Class + teacher name inputs
  document.getElementById("className").addEventListener("input", autoSave);
  document.getElementById("teacherName").addEventListener("input", autoSave);

  // Save on window unload
  window.addEventListener("beforeunload", saveState);
});