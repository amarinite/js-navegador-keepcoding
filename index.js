const dineroTotal = document.querySelector(".ahorro-euros");
const movimientos = document.querySelector(".movimientos");
const formulario = document.querySelector("form");
const cantidad = document.getElementById("cantidad");
const concepto = document.getElementById("concepto");
const ingresosTotal = document.getElementById("ingresos-total");
const gastosTotal = document.getElementById("gastos-total");

let listaMovimientos = [];

function nuevaTransaccion(e) {
  e.preventDefault();

  const transaccion = {
    cantidad: Number(cantidad.value),
    concepto: concepto.value,
  };
  listaMovimientos.push(transaccion);

  pintarTransaccion(transaccion, listaMovimientos);

  actualizarDatos();
  cantidad.value = "";
  concepto.value = "";
}

function pintarTransaccion(transaccion, listaMovimientos) {
  const transaccionEl = document.createElement("li");

  transaccionEl.classList.add("movimiento");
  transaccionEl.classList.add(transaccion.cantidad > 0 ? "ingreso" : "gasto");

  transaccionEl.innerHTML = `<p>${transaccion.concepto}</p>
  <p>${transaccion.cantidad > 0 ? "+" : "-"}${Math.abs(
    transaccion.cantidad
  )}</p>`;

  movimientos.appendChild(transaccionEl);

  transaccionEl.addEventListener("click", function () {
    movimientos.removeChild(this);
    listaMovimientos.splice(listaMovimientos.indexOf(transaccion), 1);
    actualizarDatos();
  });
}

function actualizarDatos() {
  const totalTransacciones = listaMovimientos.map(
    (transaccion) => transaccion.cantidad
  );
  const totalAhorro = totalTransacciones
    .reduce((acc, transaccion) => acc + transaccion, 0)
    .toFixed(2);
  const totalIngresos = totalTransacciones
    .filter((transaccion) => transaccion > 0)
    .reduce((acc, transaccion) => acc + transaccion, 0)
    .toFixed(2);
  const totalGastos = totalTransacciones
    .filter((transaccion) => transaccion < 0)
    .reduce((acc, transaccion) => acc + transaccion, 0)
    .toFixed(2);

  dineroTotal.innerText = `${totalAhorro}€`;
  ingresosTotal.innerText = `${totalIngresos}€`;
  gastosTotal.innerText = `${totalGastos}€`;
}

formulario.addEventListener("submit", nuevaTransaccion);
