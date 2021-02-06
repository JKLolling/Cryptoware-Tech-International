const { directive } = require("babel-types");

window.addEventListener('DOMContentLoaded', e => {
    const commentBtn = document.querySelector('.commentBtn');
    const outerContainer = document.querySelector('.productBox')
    let content = outerContainer.innerHTML

    commentBtn.addEventListener('click', async(e) => {
        outerContainer.innerHTML = ''
            // const newDiv = document.createElement('div')
            // newDiv.innerHTML = 'sjhfksja'

        let id = commentBtn.dataset.userid
        const user = await fetch(`/api/users/${id}`)
        const jsonUser = await user.json()
            // console.log(jsonUser)
        jsonUser.forEach(element => {
            const newDiv = document.createElement('div')
            const newDiv2 = document.createElement('div')
            const newBox = document.createElement('div')

            newBox.setAttribute('class', 'borderComment')
            newDiv.setAttribute('class', 'productList_name')
            newDiv2.setAttribute('class', 'productList_description')

            newDiv.innerHTML = element.comment
            newDiv2.innerHTML = element.Product.productName
            outerContainer.appendChild(newDiv)
            outerContainer.appendChild(newDiv2)

        });








    })

    const madeBtn = document.querySelector('.madeBtn')
    madeBtn.addEventListener('click', e => {
        outerContainer.innerHTML = content
    })
})