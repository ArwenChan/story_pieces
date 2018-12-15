export function avatarPreview(url) {
    if (!url) {
        return ''
    }
    return url + '?imageView2/1/w/70/h/70/q/75|imageslim'
}