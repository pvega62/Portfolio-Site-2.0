document.addEventListener('DOMContentLoaded', function () {
    const markdownCards = document.querySelectorAll('.sample-card[data-md]');
    const modal = new bootstrap.Modal(document.getElementById('markdownModal'));
    const modalTitle = document.getElementById('markdownModalLabel');
    const modalBody = document.getElementById('markdownModalBody');

    markdownCards.forEach(card => {
        card.addEventListener('click', function () {
            const markdownFile = this.dataset.md;
            const cardTitle = this.querySelector('.card-title').textContent;

            fetch(markdownFile)
                .then(response => response.text())
                .then(text => {
                    modalTitle.textContent = cardTitle;
                    modalBody.innerHTML = marked.parse(text);
                    modal.show();
                })
                .catch(err => {
                    console.error('Failed to load markdown file:', err);
                    modalTitle.textContent = 'Error';
                    modalBody.innerHTML = '<p>Could not load content.</p>';
                    modal.show();
                });
        });
    });
});
