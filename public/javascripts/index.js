document.addEventListener('DOMContentLoaded', event => {
    const showMoreContentBtns = document.getElementsByClassName('productList_moreButton')

    for (let i = 0; i < showMoreContentBtns.length; i++) {
        const days = ['Today', 'Yesterday', 'Last Week', 'Last Month']
        showMoreContentBtns[i].addEventListener('click', async event => {
            try {
                const content = await fetch(`/api/products/${days[i]}`)
                console.log(content)
                const json = await content.json()
                console.log(json)
            } catch (err) {
                console.error(error)
            }
        })
    }
})
