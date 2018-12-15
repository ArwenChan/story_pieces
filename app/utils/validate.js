// 验证手机号
export function validate_phone(phone) {
    let num = Number(phone)
    if (isNaN(num)) return
    let reg = /^1\d{10}$/
    return reg.test(num)
}

// 验证密码
export function validate_password(password) {
    let has_number = /\d+/
    let has_letter = /\w+/
    let no_space = /^\S{8,12}$/
    return has_number.test(password) &&
    has_letter.test(password) && no_space.test(password)
}

// 验证昵称
export function validate_nickname(name) {
    let is_name = /^\S{1,20}$/
    return is_name.test(name)
}

// 验证码
export function validate_verify_code(name) {
    let right_code = /^\d{4}$/
    return right_code.test(name)
}