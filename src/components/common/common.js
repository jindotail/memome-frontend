export const currentTime = () => {
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    if (month < 10) {
        month = `0${month}`;
    }
    let date = today.getDate();  // 날짜
    
    let current = `${year}-${month}-${date}`;

    return current;
}