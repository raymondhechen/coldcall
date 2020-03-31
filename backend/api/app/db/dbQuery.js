import pool from './pool';

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
    */
    query(quertText, params) {
        console.log("request received");
        console.log(params);
        return new Promise((resolve, reject) => {
        pool.query(quertText, params)
            // resolved
            .then((res) => {
                console.log("resolved");
                resolve(res);
            })
            // error, reject
            .catch((err) => {
                console.log("rejected");
                console.log(err);
                reject(err);
            });
        });
    },
};