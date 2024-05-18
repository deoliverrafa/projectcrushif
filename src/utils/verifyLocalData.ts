export default function verifyLocalData() {
    if (
        localStorage.getItem('nickname') &&
        localStorage.getItem('campus') &&
        localStorage.getItem('email') &&
        localStorage.getItem('avatar')
    ) {
        return true
    } else {
        return false
    }
}