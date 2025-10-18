document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#vehicleTable tbody');
    const addForm = document.getElementById('addForm');
    const deleteForm = document.getElementById('deleteForm');

    // Fetch vehicles and populate the table
    async function loadVehicles() {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
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

    // Add vehicle
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

    // Delete vehicle
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
