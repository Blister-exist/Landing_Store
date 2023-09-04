let burger = document.getElementById('burger');
let burgerField = document.querySelector('.burger__field');

openBurger = function(){
    burgerField.classList.toggle('visible__field');
}

burger.addEventListener('click', openBurger);