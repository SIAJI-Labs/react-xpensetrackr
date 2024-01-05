// For Service Worker registration purpose
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import route from 'ziggy-js';

let loggedIn = false;
const swBase = import.meta.env.VITE_APP_URL;
const subscribeBase = route('api.notification.v1.subscribe');
const vapid_pubkey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Initialize Service Worker
initSW();

function initSW(){
    console.log('Init SW');
    // console.log(swBase);
    console.log("serviceWorker" in navigator);

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
            
                // Fetch Inertia Data
                let app = document.getElementById('app');
                if(app && app.dataset.page){
                    let parse = JSON.parse(app.dataset.page);
                    let props = parse.props;
                    // console.log(props);

                    // Check if auth props exists at inertia
                    if(props && props.auth && props.auth.user){
                        loggedIn = true;
                    }
                }
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

// Listen to Notification Permission
function initPush(){
    // console.log('Init Push at Service Worker');
    if (!navigator.serviceWorker.ready) {
        console.warn(`Service worker isn't ready`);
        return;
    }

    if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
            notificationPerm.onchange = () => {
                // console.log('Notification permission got changed');
                // handleUserNotification(notificationPerm);

                if('state' in notificationPerm && notificationPerm.state === 'granted'){
                    subscribeUser();
                }
            }
        });
    }
    // new Promise(function (resolve, reject) {
    //     // Request Permission
    //     const permissionResult = Notification.requestPermission(function (result) {
    //         resolve(result);
    //     });

    //     if (permissionResult) {
    //         permissionResult.then(resolve, reject);
    //     }
    // }).then((permissionResult) => {
    //     if (permissionResult !== 'granted') {
    //         // alert('We weren\'t granted permission.');
    //         throw new Error('We weren\'t granted permission.');
    //     }

    //     subscribeUser();
    // });
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
    let formData = new FormData();

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

    // console.log("Action to store user push notification");
    axios.post(`${subscribeBase}`, formData)
        .then(function (response) {
            // console.log(response);
        })
        .catch(function (error) {
            // console.log(error);
        })
        .then(function (response) {
            // console.log(response);
        });
}