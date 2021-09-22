function changeCharCode(source, regex, offset) {
    try {
        return source.toString().replace(new RegExp(regex, 'g'), (match) => {
            return String.fromCharCode(match.charCodeAt(0) + offset);
        });
    } catch {
        return source;
    }
};

export function addCommas(value) {
    if (value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } else {
        return value;
    }
}

export function toFarsiDigits(value = '') {
    return changeCharCode(value, '[0-9]', 1728);
};
