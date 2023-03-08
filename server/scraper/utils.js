
function formatPrice(price) {
    let formatted = price.split(' ')[0]
    formatted = formatted.replace('.', '')
    return parseInt(formatted)
}

function formatDiscount(discount) {
    return parseInt(discount.replace('-','').replace('%',''))
}

function formatAuthor(author) {
    return author.split(':')[1].trim()

}


export {
    formatPrice,
    formatDiscount,
    formatAuthor
}