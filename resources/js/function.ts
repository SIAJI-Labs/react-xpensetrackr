"use strict";
import moment, { Moment } from 'moment-timezone';

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
        // rupiah = shortNumber(angka);
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