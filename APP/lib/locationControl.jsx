export function getSearch(key) {
    const search = window.location.search.slice(1).split('&');
    for (let item of search) {
        const content = item.split('=');
        if (content[0] === key) {
            return content[1]
        }
    }
}