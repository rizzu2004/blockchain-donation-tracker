document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');
    const blockchainDiv = document.getElementById('blockchain');

    // Function to fetch and display the blockchain
    const loadBlockchain = async () => {
        try {
            const response = await fetch('/donations');
            const chain = await response.json();
            // Pretty print the JSON
            blockchainDiv.textContent = JSON.stringify(chain, null, 2);
        } catch (error) {
            console.error('Failed to load blockchain:', error);
            blockchainDiv.textContent = 'Error loading blockchain.';
        }
    };

    // Function to handle form submission
    donationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent page reload

        const donor = document.getElementById('donor').value;
        const amount = parseInt(document.getElementById('amount').value, 10);
        const purpose = document.getElementById('purpose').value;

        try {
            const response = await fetch('/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ donor, amount, purpose }),
            });

            if (response.ok) {
                // Clear form and reload the blockchain to show the new block
                donationForm.reset();
                loadBlockchain();
            } else {
                alert('Failed to add donation.');
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
        }
    });

    // Load the blockchain when the page first loads
    loadBlockchain();
});