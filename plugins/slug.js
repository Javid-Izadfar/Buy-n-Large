export default ({ app }, inject) => {
    inject('slugify', (string) => {
        return string.replace(/\s/g, '-');
    });
};
