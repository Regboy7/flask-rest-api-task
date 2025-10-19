document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#vehicleTable tbody');
    const addForm = document.getElementById('addForm');
    const deleteForm = document.getElementById('deleteForm');
    const searchInput = document.getElementById('searchInput');
    const headers = document.querySelectorAll('#vehicleTable th');

    let vehiclesData = []; // store full dataset for search and sort use

    // fetch vehicles and display.
    async function loadVehicles() {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
        vehiclesData = data; // keep a copy for filtering/sorting
        displayVehicles(data);
    }

    // display filtered/sorted vehicles.
    function displayVehicles(data) {
        tableBody.innerHTML = '';
        data.forEach(v => {
            const row = `<tr>
                <td>${v.registration}</td>
                <td>${v.make}</td>
                <td>${v.model}</td>
                <td>${v.year}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    // search filter.
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = vehiclesData.filter(v =>
            v.registration.toLowerCase().includes(query) ||
            v.make.toLowerCase().includes(query) ||
            v.model.toLowerCase().includes(query)
        );
        displayVehicles(filtered);
    });

    // sorting when clicking table headers.
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const key = header.dataset.sort;
            vehiclesData.sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            });
            displayVehicles(vehiclesData);
        });
    });

    // add vehicle.
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newVehicle = {
            registration: document.getElementById('registration').value,
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value
        };
        await fetch('/api/vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVehicle)
        });
        addForm.reset();
        loadVehicles();
    });

    // delete vehicle.
    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const reg = document.getElementById('deleteRegistration').value;
        await fetch('/api/vehicles', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registration: reg })
        });
        deleteForm.reset();
        loadVehicles();
    });

    loadVehicles();
});
