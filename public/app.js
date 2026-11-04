const resources = {
  facultades: { base: "/api/facultades", name: "Facultad", display: (item) => item.name },
  programas: { base: "/api/programas", name: "Programa", display: (item) => item.nombre ?? item.name },
};

const collections = { facultades: [], programas: [] };
const dialog = document.querySelector("#form-dialog");
const form = document.querySelector("#item-form");
const input = document.querySelector("#item-name");
let currentType = "facultades";
let editingId = null;
let noticeTimer;

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) throw new Error(result.message || "No se pudo completar la solicitud.");
  return result;
}

function showNotice(message, isError = false) {
  const notice = document.querySelector("#notice");
  notice.textContent = message;
  notice.classList.toggle("error", isError);
  notice.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { notice.hidden = true; }, 4500);
}

async function load(type) {
  const list = document.querySelector(`#${type}-list`);
  list.innerHTML = '<p class="empty">Cargando información…</p>';
  try {
    const result = await request(`${resources[type].base}/show`);
    collections[type] = Array.isArray(result.data) ? result.data : [];
    render(type);
  } catch (error) {
    list.innerHTML = '<p class="empty">No fue posible cargar la información.</p>';
    showNotice(`${error.message} Verifica que el servidor y la base de datos estén disponibles.`, true);
  }
}

function render(type) {
  const list = document.querySelector(`#${type}-list`);
  const items = collections[type];
  if (!items.length) {
    list.innerHTML = '<div class="empty">Aún no hay registros. Puedes agregar el primero con el botón de arriba.</div>';
    return;
  }
  list.replaceChildren(...items.map((item, index) => {
    const card = document.createElement("article");
    card.className = "card";
    const info = document.createElement("div");
    const number = document.createElement("small");
    number.textContent = `OFERTA ACADÉMICA · ${String(index + 1).padStart(2, "0")}`;
    const title = document.createElement("h3");
    title.textContent = resources[type].display(item) || "Sin nombre";
    info.append(number, title);
    const actions = document.createElement("div");
    actions.className = "card-actions";
    const edit = document.createElement("button");
    edit.className = "icon-button";
    edit.textContent = "Editar";
    edit.setAttribute("aria-label", `Editar ${title.textContent}`);
    edit.addEventListener("click", () => openForm(type, item));
    const remove = document.createElement("button");
    remove.className = "icon-button delete";
    remove.textContent = "Eliminar";
    remove.setAttribute("aria-label", `Eliminar ${title.textContent}`);
    remove.addEventListener("click", () => deleteItem(type, item));
    actions.append(edit, remove);
    card.append(info, actions);
    return card;
  }));
}

function openForm(type, item = null) {
  currentType = type;
  editingId = item?.id ?? null;
  const title = `${editingId ? "Editar" : "Nueva"} ${resources[type].name.toLowerCase()}`;
  document.querySelector("#form-title").textContent = title;
  document.querySelector("#form-kicker").textContent = editingId ? "ACTUALIZAR INFORMACIÓN" : "AGREGAR A LA OFERTA";
  input.value = item ? resources[type].display(item) : "";
  dialog.showModal();
  input.focus();
}

async function deleteItem(type, item) {
  const name = resources[type].display(item);
  if (!window.confirm(`¿Seguro que quieres eliminar “${name}”?`)) return;
  try {
    const result = await request(`${resources[type].base}/delete/${item.id}`, { method: "DELETE" });
    await load(type);
    showNotice(result.message || `${resources[type].name} eliminada correctamente.`);
  } catch (error) {
    showNotice(error.message, true);
  }
}

document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab, .section").forEach((element) => element.classList.remove("active"));
  tab.classList.add("active");
  document.querySelector(`#${tab.dataset.tab}`).classList.add("active");
}));
document.querySelectorAll("[data-create]").forEach((button) => button.addEventListener("click", () => openForm(button.dataset.create)));
document.querySelectorAll(".close").forEach((button) => button.addEventListener("click", () => dialog.close()));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (value.length < 3 || value.length > 150) {
    input.setCustomValidity("El nombre debe tener entre 3 y 150 caracteres.");
    input.reportValidity();
    return;
  }
  input.setCustomValidity("");
  const isEdit = editingId !== null;
  const url = isEdit ? `${resources[currentType].base}/update/${editingId}` : `${resources[currentType].base}/store`;
  try {
    const result = await request(url, { method: isEdit ? "PUT" : "POST", body: JSON.stringify({ name: value }) });
    dialog.close();
    await load(currentType);
    showNotice(result.message || `${resources[currentType].name} guardada correctamente.`);
  } catch (error) {
    showNotice(error.message, true);
  }
});

load("facultades");
load("programas");
