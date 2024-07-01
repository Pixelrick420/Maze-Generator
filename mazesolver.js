var clickedButton = undefined;
function solve(){
    if(generated){
        if(clickedButton != undefined){
            window.location.href = 'workingonit.html';
        }
        else{
            alert('Select an algorithm');
        }
        
    }
    else{
        alert("Wait for the maze to be generated")
    }
}

function handleAlgorithmClick(algorithm) {
    selected = algorithm.toLowerCase(); 

    const algorithmButtons = document.querySelectorAll('.algorithm .option');
    algorithmButtons.forEach(button => {
        button.classList.remove('selected');
    });

    clickedButton = document.querySelector(`.algorithm .option[data-algorithm="${selected}"]`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
}