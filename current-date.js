//formated date
exports.getCurrentDate = () => {
    const time = new Date();
    const options = {
        day: 'numeric',
        year: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    return time.toLocaleDateString('uk-UA', options);
}