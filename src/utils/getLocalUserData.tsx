const nickname = localStorage.getItem('nickname');
const campus = localStorage.getItem('campus');
const email = localStorage.getItem('email');
const userphoto = localStorage.getItem('avatar');

const localData = {
    nickname,
    campus,
    email,
    userphoto
}
export default localData;