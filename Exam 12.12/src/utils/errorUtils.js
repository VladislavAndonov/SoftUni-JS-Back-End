export const getErrorMessage = (err) => {
    switch (err.name) {
        case 'ValidationError':
            console.log(Object.values(err.errors).map(e => e.message).join('\n'));
            return Object.values(err.errors).map(e => e.message).join(' / ');
        default:
          return err.message;
    }
}
