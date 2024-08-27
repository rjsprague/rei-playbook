export function splitName(name: string): [firstName: string, lastName: string] {
    let firstName
    let lastName
    // check if data.name has a space in it
    // uppercase first letter of first name and last name
    if (name.includes(' ')) {
        firstName = name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[0].slice(1);
        lastName = name.split(' ')[1].charAt(0).toUpperCase() + name.split(' ')[1].slice(1);
    } else {
        firstName = name.charAt(0).toUpperCase() + name.slice(1);
        lastName = '';
    }
    return [firstName, lastName];
}