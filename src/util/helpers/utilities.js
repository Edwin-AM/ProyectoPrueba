function compareObjects(object1, object2){
    return Object.keys(object1).length === Object.keys(object2).length && Object.keys(object1).every(p => object1[p] === object2[p]);
}

function compareArrays(array1, array2){
    return array1.length === array2.length && array1.every((o, idx) => compareObjects(o, array2[idx]));
}

function formatDate (date) { return new Intl.DateTimeFormat('es-es').format(new Date(date)) }

export {
    compareObjects,
    compareArrays,
    formatDate,
}


