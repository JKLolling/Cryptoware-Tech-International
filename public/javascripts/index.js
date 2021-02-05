document.addEventListener('DOMContentLoaded', event => {
    const addMoreContentBtns = () => {
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
    }

    addMoreContentBtns()

    const debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback.apply(null, args);
            }, wait);
        };
    }

    const searchBar = document.getElementById('search_bar')
    const outerContainer = document.getElementsByClassName('productList_Outermost_Container')[0]
    const originalProducts = outerContainer.innerHTML
    searchBar.addEventListener('keyup', debounce(async event => {
        try {
            const keyword = searchBar.value

            if (keyword === '') {
                console.log
                outerContainer.innerHTML = originalProducts
                addMoreContentBtns()
                return
            }
            outerContainer.innerHTML = ''

            const products = await fetch(`/api/products/keyword=${keyword}`)
            const jsonProducts = await products.json()


            const middleContainer = document.createElement('div')
            const innerContainer = document.createElement('div')
            const dayOfListing = document.createElement('div')
            const ul = document.createElement('ul')

            middleContainer.classList.add('productList_OuterContainer')
            innerContainer.classList.add('product_InnerContainer')
            dayOfListing.classList.add('productList_dayOfListing')
            ul.classList.add('productList_products')

            innerContainer.appendChild(dayOfListing)
            innerContainer.appendChild(ul)
            middleContainer.appendChild(innerContainer)
            outerContainer.appendChild(middleContainer)

            dayOfListing.innerText = 'Search Results:'
            if (jsonProducts.length === 0) {
                dayOfListing.innerText = ''
                innerContainer.innerText = `Sorry, we couldn't find any products matching "${keyword}"`
                return
            }
            for (let i = 0; i < jsonProducts.length; i++) {
                const product = jsonProducts[i]

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


        } catch (err) {
            console.log(err)
        }

    }, 500))

    // const outerContainer = document.getElementsByClassName('productList_Outermost_Container')[0]
    // const middleContainer = document.createElement('div')
    // const innerContainer = document.createElement('div')
    // const ul = document.createElement('ul')

    // middleContainer.classList.add('productList_OuterContainer')
    // innerContainer.classList.add('product_InnerContainer')
    // ul.classList.add('productList_products')

    // for (let i = 0; i < jsonProducts.length; i++) {
    //     const product = jsonProducts[i]

    //     const newATag = document.createElement('a')
    //     const newli = document.createElement('li')
    //     const newImg = document.createElement('img')
    //     const divOuter = document.createElement('div')
    //     const nameDiv = document.createElement('div')
    //     const descriptionDiv = document.createElement('div')

    //     newATag.setAttribute('href', `/products/${product.id}`)
    //     newImg.setAttribute('src', `${product.defaultImg}`)
    //     newImg.setAttribute('alt', 'product image')
    //     nameDiv.setAttribute('class', 'productList_name')
    //     descriptionDiv.setAttribute('class', 'productList_description')

    //     nameDiv.innerText = product.productName
    //     descriptionDiv.innerText = product.description

    //     newATag.appendChild(newli)
    //     newli.appendChild(newImg)
    //     newli.appendChild(divOuter)
    //     divOuter.appendChild(nameDiv)
    //     divOuter.appendChild(descriptionDiv)

    //     ul.appendChild(newATag)
    // }

    // innerContainer.appendChild(ul)
    // middleContainer.appendChild(innerContainer)
    // outerContainer.appendChild(middleContainer)
})
