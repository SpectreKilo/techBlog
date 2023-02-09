const logout = async () => {
    const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/');
    console.log('logout.js fetch is here')

};

document.querySelector('.logout').addEventListener('click', logout);