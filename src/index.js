document.addEventListener("DOMContentLoaded", ()=>{
  const dogBar = document.querySelector('#dog-bar')
  let span;
  let dogButton;
  const dogInfo = document.querySelector('#dog-info')
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(pups => {
    pups.forEach(pup => {
      dogBar.innerHTML += `<span class="dog-button" data-id="${pup.id}">${pup.name}</span>`


    })
  })
  dogBar.addEventListener('click', e => {

    if(e.target.classList.contains('dog-button')){
    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(pup => {
        const dogInfo = document.querySelector('#dog-info')
        // const img = document.createElement('img')
        // const h2 = document.createElement('h2')

        // dogButton.className = 'dog-button'
        // img.src = pup.image
        // h2.innerText = pup.name
        // if (pup.isGoodDog) {
        // dogButton.innerText = 'Good Dog!'
        // } else {
        // dogButton.innerText = 'Bad Dog!'
        // }
        // // console.log(dogButton)
        // dogInfo.append(img)
        // dogInfo.append(h2)
        // dogInfo.append(dogButton)
        dogInfo.innerHTML = `<img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button class="good-boy" data-id="${pup.id}"></button>`
        dogButton = dogInfo.querySelector('.good-boy')
        // console.log(dogButton)
        if (pup.isGoodDog) {
        dogButton.innerText = 'Bad Dog!'
        } else {
        dogButton.innerText = 'Good Dog!'
        }
      })
    }


  })
  //text should change from Good to Bad or Bad to Good and be updated to the database
  //(pessimistically render)
  dogInfo.addEventListener('click', e => {
    if(e.target.classList.contains('good-boy')){
      fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
        .then(res => res.json())
        .then(pup => {
    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        isGoodDog: !pup.isGoodDog
      })
    })
    .then(res => res.json())
    .then(pup => {
      if (pup.isGoodDog) {
      dogButton.innerText = 'Bad Dog!'
      } else {
      dogButton.innerText = 'Good Dog!'
      }
    })
    })
    }

  })
})//DOMContentLoaded
