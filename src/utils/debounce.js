export const debounce = (callback, delay = 500) => {
    let timer // gán giá trị của setTimeout vào biến timer
    return (...args) => {
        clearTimeout(timer) // xóa timer trước đó nếu có
        timer = setTimeout(() => {
            callback(...args) // gọi hàm callback với các tham số đã truyền vào
        }, delay) // thiết lập timer mới với thời gian trễ
    }
}


// Hàm debounce giúp hạn chế việc gọi hàm quá nhiều lần trong một khoảng thời gian ngắn
// func: Hàm cần debounce
// delay: Thời gian trễ (ms) trước khi gọi hàm