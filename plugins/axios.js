export default function ({ app, redirect }) {
    app.$axios.defaults.headers.common.token = 'mpfKW9ghVTCSuBZ7qTkSmEyvL38ShZxv';

    app.$axios.interceptors.response.use(response => {
        return response;
    }, error => {
        // if (error.response && error.response.status === 403) {
        //     redirect('/forbidden');
        // }
        return Promise.reject(error);
    });
}
