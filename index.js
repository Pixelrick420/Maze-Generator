let selected = undefined;

function handleAlgorithmClick(algorithm) {
    selected = algorithm.toLowerCase(); 

    const algorithmButtons = document.querySelectorAll('.algorithm .option');
    algorithmButtons.forEach(button => {
        button.classList.remove('selected');
    });

    const clickedButton = document.querySelector(`.algorithm .option[data-algorithm="${selected}"]`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
}

function redirect() {
    if (selected === undefined) {
        alert('Please select an algorithm');
    } else {
        let url = '';
        switch (selected) {
            case 'dfs':
                url = 'dfs.html';
                break;
            case 'prims':
                url = 'prims.html';
                break;
            case 'kruskals':
                url = 'kruskals.html';
                break;
            case 'binarytree':
                url = 'binarytree.html';
                break;
            case 'sidewinder':
                url = 'sidewinder.html';
                break;
            default:
                url = 'workingonit.html';
                break;
        }
        url += `?width=${document.getElementById('width').value}`;
        url += `&height=${document.getElementById('height').value}`;
        url += `&framerate=${document.getElementById('frame').value}`;

        window.location.href = url;
    }
}

document.getElementById('width').addEventListener('input', function() {
    document.getElementById('widthValue').textContent = this.value;
});

document.getElementById('height').addEventListener('input', function() {
    document.getElementById('heightValue').textContent = this.value;
});

document.getElementById('frame').addEventListener('input', function() {
    document.getElementById('framerate').textContent = this.value;
});
