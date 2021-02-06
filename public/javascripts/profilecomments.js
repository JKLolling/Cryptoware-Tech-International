window.addEventListener('DOMContentLoaded', e => {
    const commentBtn = document.querySelector('.commentBtn');
    const outerContainer = document.querySelector('.productBox')
    let content = outerContainer.innerHTML
    const commentID = document.querySelector('.made-product')
    let productContent = commentID.innerHTML
    commentBtn.addEventListener('click', async(e) => {
        outerContainer.innerHTML = ''

        commentID.innerHTML = ' 💬 Comments'

        let id = commentBtn.dataset.userid
        const user = await fetch(`/api/users/${id}`)
        const jsonUser = await user.json()

        jsonUser.forEach(element => {
            const newDiv = document.createElement('div')
            const newDiv2 = document.createElement('div')
            const newBox = document.createElement('div')
            const newBoxPro = document.createElement('div')


            newBox.setAttribute('class', 'borderComment')
            newBoxPro.setAttribute('class', 'borderCommentPro')


            newDiv.setAttribute('class', 'productList_name')
            newDiv2.setAttribute('class', 'productList_description')
            newBox.appendChild(newDiv)
            newBoxPro.appendChild(newDiv2)


            newDiv.innerHTML = `   💬 ${element.comment}`
            newDiv2.innerHTML = `Product name: ${element.Product.productName}`
            outerContainer.appendChild(newBoxPro)
            outerContainer.appendChild(newBox)

        });








    })

    const madeBtn = document.querySelector('.madeBtn')
    madeBtn.addEventListener('click', e => {
        outerContainer.innerHTML = content
        commentID.innerHTML = productContent
    })
})