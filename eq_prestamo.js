let dataTable;
let dataTableIsInitialized = false;
window.addEventListener("load", async () => {
    console.log("El código JavaScript se está ejecutando");
    await initDataTable();
});



const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#equipo_pres").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const response = await fetch("equipo_pres.json"); 
        const data = await response.json(); 

        let content = ``;
        data[2].data.forEach((row, index) => { 
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${row.equipo}</td>
                    <td>${row.fecha_salida}</td>
                    <td>${row.marca}</td>
                    <td>${row.modelo}</td>
                    <td>${row.no_serie}</td>
                    <td>${row.no_inventario}</td>
                    <td>${row.ubicacion_actual}</td>
                    <td>${row.quien_recibio}</td>
                   
                    <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                        <span style="margin-right: 10px;"></span>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
        });

        document.getElementById("id_prestamo").innerHTML = content; 
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});
