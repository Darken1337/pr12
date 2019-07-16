jQuery(document).ready(($) => {


  const animateInputs = function(){
    const getStartedInputs = document.querySelectorAll('.input input');
    console.log(getStartedInputs);

    getStartedInputs.forEach(element => {
      element.addEventListener('focus', (e) => {
        console.log(e);

        element.nextElementSibling.style.color = '#77b755'
      });
      element.addEventListener('blur', () => {
        element.nextElementSibling.style.color = '#707782'
      });

    })
  }
  
  animateInputs();
  
})