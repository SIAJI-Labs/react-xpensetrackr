// For Service Worker registration purpose
import axios from 'axios';
import route from 'ziggy-js';

const loggedIn = false;
const swBase = import.meta.env.VITE_APP_URL;
const subscribeBase = route('public.notification.subscribe');
const vapid_pubkey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Initialize Service Worker
initSW();

function initSW(){
    // console.log('Init SW');
    // console.log(swBase);
    // console.log("serviceWorker" in navigator);

    if(!"serviceWorker" in navigator){
        // Service worker not supported
        console.warn('Service worker not supported');
        return;
    }

    // Check if swBase variable exists
    if(typeof swBase !== 'undefined' && swBase){
        // Register SW
        navigator.serviceWorker.register(`${swBase}/sw.js`)
            .then((registration) => {
                registration.update();
            
                if(loggedIn){
                    // Call for Notification Permission
                    initPush();
                }
            })
            .catch((err) => {
                console.warn(err);
            });
    }
}

// Ask for Notification Permission
function initPush(){
    if (!navigator.serviceWorker.ready) {
        console.warn(`Service worker isn't ready`);
        return;
    }

    new Promise(function (resolve, reject) {
        // Request Permission
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then((permissionResult) => {
        if (permissionResult !== 'granted') {
            // alert('We weren\'t granted permission.');
            throw new Error('We weren\'t granted permission.');
        }

        subscribeUser();
    });
}

function subscribeUser() {
    if(typeof vapid_pubkey !== 'undefined' && vapid_pubkey){
        navigator.serviceWorker.ready
            .then((registration) => {
                const subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapid_pubkey)
                };
    
                return registration.pushManager.subscribe(subscribeOptions);
            })
            .then((pushSubscription) => {
                // console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                storePushSubscription(pushSubscription);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    }
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function storePushSubscription(pushSubscription) {
    const token = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    let formData = new FormData();
    formData.append('_token', token);

    let pushString = JSON.stringify(pushSubscription);
    let data = JSON.parse(pushString);
    for(const key in data){
        if(typeof data[key] === 'object'){
            let dynamicKey = key;
            let value = data[key];

            if(data[key] !== null){
                let child = data[key];
                for(const childKey in child){
                    dynamicKey = `${key}[${childKey}]`;
                    value = child[childKey];

                    formData.append(dynamicKey, value);
                }
            } else {
                formData.append(dynamicKey, value);
            }

        } else if(typeof data[key] === 'string'){
            formData.append(key, data[key]);
        }
    }

    // axios.post(`${subscribeBase}`, formData)
    //     .then(function (response) {
    //         // console.log(response);
    //     })
    //     .catch(function (error) {
    //         // console.log(error);
    //     })
    //     .then(function (response) {
    //         // console.log(response);
    //     });
}