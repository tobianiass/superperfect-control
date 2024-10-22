import { v4 as uuidv4 } from 'uuid';

export const FooterLinksColumnOne = [
    {
        id: uuidv4(),
        title: 'Controler',
        url: '/controler'
    },
    {
        id: uuidv4(),
        title: 'Prices',
        url: '/prices'
    },
    {
        id: uuidv4(),
        title: 'Learn',
        url: '/learn'
    }
]

export const FooterLinksColumnTwo = [
    {
        id: uuidv4(),
        title: 'Email us',
        url: 'mailto:info@superperfect.io'
    }
]

export const FooterDesignedByText = {
    title: 'Designed by',
    urlTitle: 'superperfect.io',
    url: 'https://www.superperfect.io/'
}