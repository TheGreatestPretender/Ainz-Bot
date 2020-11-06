const convertArrayToObj = (array, key) => {
    const initVal = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initVal);
};

module.exports = {
    convertArrayToObj: convertArrayToObj
}