

document.addEventListener('DOMContentLoaded', event => {
    console.log("hello")
    const comBtn = document.getElementById("sbmtBtn");
    const comText = document.getElementById("text");
    const comList = document.getElementById("commentList");


    comBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log(comText.dataset.userlast);
        const commentRes = await fetch(`/api/products/:id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comText.value,
                productId: comText.dataset.productid,
                userId: comText.dataset.userid,
            })

        })
        const newCom = await commentRes.json();
        console.log(newCom)
        comText.value = "";

        const user1 = comText.dataset.user;
        const newListItem = document.createElement("li");
        const pcomment = document.createElement('p');
        const acomment = document.createElement('a');

        acomment.href = `/users/${comText.dataset.productid}`


        pcomment.innerHTML = newCom.comment
        acomment.innerHTML = `${comText.dataset.userfirst} ${comText.dataset.userlast}`

        newListItem.classList.add("comment");
        pcomment.classList.add("pmargincom");
        acomment.classList.add("links");


        newListItem.appendChild(pcomment);
        newListItem.appendChild(acomment);

        comList.prepend(newListItem);
    })

})