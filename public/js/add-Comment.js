const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log('this is the comment form handler before the if statement');
    const topic_id = parseInt(document.querySelector('#newComment').dataset.id);
    const response = document.querySelector('#newComment').value.trim();

    if (response) {
        const answer = await fetch('/api/commentRoute', {
            method: 'POST',
            body: JSON.stringify({ response, topic_id, }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('this is the commentFormHandler')
        if (answer.ok) {
            document.location.reload();
        } else {
            alert(answer.statusText)
        }
    }
};

document.querySelector('#commentForm').addEventListener('submit', commentFormHandler);