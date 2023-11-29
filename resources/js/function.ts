"use strict";
import moment, { Moment } from 'moment-timezone';
import { User } from './types';
import { createAvatar } from '@dicebear/core';
import * as diceCollection from '@dicebear/collection';

/**
 * Print Indonesia default amount format
 * 
 * @param {*} angka 
 * @param {*} short 
 * @param {*} prefix 
 * @returns 
 */
export function formatRupiah(angka: any, short:boolean = false, prefix:string = 'Rp'){
    let negative = angka < 0 ? true : false;

    // let balanceHide_state = false;
    // if(balanceHide_state !== null && balanceHide_state === 'true'){
    //     var rupiah = '---';
    //     return prefix == undefined ? rupiah : prefix+" "+rupiah;
    // }

    // Check if short parameter is true
    if(short){
        if(angka < 0){
            angka *= -1;
        }
        rupiah = shortenNumber(angka);
    } else {
        angka = Math.round(angka * 100) / 100;

        let split = angka.toString().split('.');
        let decimal = 0;
        if(split.length > 1){
            angka = split[0];
            decimal = split[1];
        }
        var	reverse = angka.toString().split('').reverse().join(''),
        rupiah 	= reverse.match(/\d{1,3}/g);
        rupiah	= rupiah.join('.').split('').reverse().join('');
        if(split.length > 1){
            rupiah += `,${decimal}`;
        }
    }
    
    return `${prefix == undefined ? (`${negative ? '(-' : ''}${rupiah}${negative ? ')' : ''}`) : (`${prefix} ${negative ? '(-' : ''}${rupiah}${negative ? ')' : ''}`)}`;
}

/**
 * 
 */
export function shortenNumber(number: any) {
    const suffixes = ["", "k", "M", "B", "T", "Q"];

    let suffixIndex = 0;
    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
        number /= 1000;
        suffixIndex++;
    }

    const roundedNumber = Math.round(number * 10) / 10; // Round to one decimal place

    return roundedNumber.toString() + suffixes[suffixIndex];
}

/**
 * Replace word with Snake Case
 * 
 */
export function ucwords(str: string){
    str = str.toLowerCase().replace(/\b[a-z]/g, (letter) => {
        return letter.toUpperCase();
    });

    return str;
}

/**
 * Convert raw date to formated date
 * 
 */
export function momentFormated(format: string, date: string | Moment | null = null, tz: string | null = null){
    let abbr = null;

    if(date === null){
        date = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    if(tz !== null){
        let dateInUtc = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');
        date = dateInUtc.clone().tz(tz);
    }

    let result = moment(date).format(format);
    if(tz !== null){
        if(abbr){
            result = `${moment(date).format(format)} ${moment().tz(tz).zoneAbbr()}`;
        } else {
            result = `${moment(date).format(format)}`;
        }
    }

    return result;
}

/**
 * Fetch period based on key
 * 
 */
export function fetchPeriod(string: string){
    let result = '';
    switch(string){
        case 'daily': {
            result = 'day(s)';
            break;
        }
        case 'weekly': {
            result = 'week(s)';
            break;
        }
        case 'monthly': {
            result = 'month(s)';
            break;
        }
        case 'yearly': {
            result = 'year(s)';
            break;
        }
    }

    return result;
}

/**
 * Fetch User Avatar
 * 
 */
type DiceCollectionMapping = {
    [key in keyof typeof diceCollection]: typeof diceCollection[key];
};
function getAvatar<T extends keyof DiceCollectionMapping>(value: T): DiceCollectionMapping[T] {
    return diceCollection[value];
}
export const getDicebearAvatar = (style: any = 'initials', name?: string) => {
    let result = '';
    if(!name){
        name = import.meta.env.VITE_APP_NAME;
    }

    if(style in diceCollection){
        let avatarConf = getAvatar(style)
        const avatar = createAvatar(avatarConf, {
            seed: name,
            // ... other options
        });
        result = avatar.toDataUriSync();
    }

    return result;
}
export const handleUserAvatar = (user?: User, avatarStyle: any = 'initials', userName: string = import.meta.env.VITE_APP_NAME) => {
    if(user){
        if(user !== undefined){
            // Override name of the user
            if(user.name){
                userName = user.name;
            }

            // Override default avatar of the user
            if(user.avatar){
                avatarStyle = user.avatar;
            }
        }
    }

    let result = '';
    if(avatarStyle in diceCollection){
        result = getDicebearAvatar(avatarStyle, userName); 
    } else {
        result = `/${avatarStyle}`;
    }
    
    return result;
}

/**
 * Convert CamelCase to Title
 */
export function camel2title(camelCase: string){
    const string = camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();

    return string;
}