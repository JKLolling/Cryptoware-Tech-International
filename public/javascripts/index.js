document.addEventListener('DOMContentLoaded', event => {
    const showMoreContentBtns = document.getElementsByClassName('productList_moreButton')
    for (let i = 0; i < showMoreContentBtns.length; i++) {
        const days = ['Today', 'Yesterday', 'Last Week', 'Last Month']
        showMoreContentBtns[i].addEventListener('click', async event => {
            try {
                const content = await fetch(`/api/products/${days[i]}`)
                const json = await content.json()

                const ul = event.target.previousElementSibling
                for (let i = 0; i < json.length; i++) {
                    const product = json[i]
                    const newATag = document.createElement('a')
                    const newli = document.createElement('li')
                    const newImg = document.createElement('img')
                    const divOuter = document.createElement('div')
                    const nameDiv = document.createElement('div')
                    const descriptionDiv = document.createElement('div')

                    newATag.setAttribute('href', `/products/${product.id}`)
                    newImg.setAttribute('src', `${product.defaultImg}`)
                    newImg.setAttribute('alt', 'product image')
                    nameDiv.setAttribute('class', 'productList_name')
                    descriptionDiv.setAttribute('class', 'productList_description')

                    nameDiv.innerText = product.productName
                    descriptionDiv.innerText = product.description

                    newATag.appendChild(newli)
                    newli.appendChild(newImg)
                    newli.appendChild(divOuter)
                    divOuter.appendChild(nameDiv)
                    divOuter.appendChild(descriptionDiv)

                    ul.appendChild(newATag)
                }
                event.target.remove()
            } catch (err) {
                console.error(error)
            }
        })
    }

    const searchBar = document.getElementById('search_bar')
    searchBar.addEventListener('keyup', async (event) => {

        try {
            const keyword = searchBar.value

            if (keyword === '') {
                return
            }

            const products = await fetch(`/api/products/keyword=${keyword}`)
            const jsonProducts = await products.json()

            console.log(jsonProducts)

        } catch (error) {
            console.log(error)
        }
    })
})
