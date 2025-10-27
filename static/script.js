document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#vehicleTable tbody');
    const addForm = document.getElementById('addForm');
    const deleteForm = document.getElementById('deleteForm');
    const searchInput = document.getElementById('searchInput');
    const headers = document.querySelectorAll('#vehicleTable th');
    const originaldata = []; // store original data for filtering ect.

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
        let sortState = 0; // 0 = normal, 1 = ascending, 2 = descending

    header.addEventListener('click', () => {
        const key = header.dataset.sort;
        sortState = (sortState + 1) % 3; // cycle between 

        let sortedData = [...vehiclesData]; // make a copy to avoid changing original

        if (sortState === 1) {
            // ascending
            sortedData.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
        } else if (sortState === 2) {
            // descending
            sortedData.sort((a, b) => (a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0));
        } else {
            // normal 
            sortedData = [...vehiclesData];
        }
        
        displayVehicles(sortedData);
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

    // update vehicle.
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updVehicle = {
            registration: document.getElementById('updRegistration').value,
            make: document.getElementById('updMake').value,
            model: document.getElementById('updModel').value,
            year: document.getElementById('updYear').value
        };
        await fetch('/api/vehicles', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updVehicle)
        })
        updateForm.reset();
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
