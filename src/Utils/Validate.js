export const checkValidateData = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /^[A-Za-z]+([\ A-Za-z]+)*/.test(password);

    // if (!isNameValid) return "Invalid Name";
    if (!isEmailValid) return "Invalid email address";
    if (!isPasswordValid) return "Invalid password";
    return null;
}