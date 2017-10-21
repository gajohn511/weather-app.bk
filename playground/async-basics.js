console.log('Starting app...');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);


setTimeout(() => {
    console.log('another callback inside timeout func');
}, 0);

console.log('closing app.');