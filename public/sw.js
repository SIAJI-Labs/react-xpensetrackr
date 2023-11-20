// Actual Service Worker
const cacheName = 'xtrackr-pwa-react-v1';
const appShellFiles = [];
const contentToCache = appShellFiles;

// Install Service Worker
self.addEventListener('install', (e) => {
    // console.log("===== Installed =====");
    self.skipWaiting();
});

// Fetch Asset
self.addEventListener('fetch', (e) => {
    // console.log("===== Fetch =====");
});

/**
 * Push Notification
 */
self.addEventListener('push', (e) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    // Validate message
    if (e.data) {
        var msg = e.data.json();

        e.waitUntil(self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: msg.icon,
            actions: msg.actions,
            data: msg.data ?? null
        }));
    }
}); 

// Notification click action
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    console.log('============= Start Notification Action =============');
    console.log("Notification is clicked");
    // console.log(event);
    // clients.openWindow(`${baseUrl}/${event.action}`);

    event.waitUntil((async () => {
        let actionTarget = event.action;

        // Check if notification had page url target
        if(actionTarget !== ''){
            let actionUrl = new URL(actionTarget);
            // Check matching client
            const allClients = await clients.matchAll({
                includeUncontrolled: true
            });

            // Let's see if we already have a chat window open:
            for (const client of allClients) {
                const url = new URL(client.url);
        
                if(url.pathname === actionUrl.pathname){
                    // Window found, set related window to focus
                    return client.focus();
                }
            }

            // Window didn't found, open new window
            clients.openWindow(actionUrl.href);
            return;
        } else if(event.notification.data){
            // Check if data contains url
            if(event.notification.data.url){
                actionUrl = new URL(event.notification.data.url);
                // Check matching client
                const allClients = await clients.matchAll({
                    includeUncontrolled: true
                });
    
                // Let's see if we already have a chat window open:
                for (const client of allClients) {
                    const url = new URL(client.url);

                    if(url.pathname === actionUrl.pathname){
                        if(url.href !== actionUrl.href){
                            // User already open a tab, but in different parameter
                            client.navigate(actionUrl.href);
                            return client.focus();
                        }

                        // Window found, set related window to focus
                        return client.focus();
                    } else {
                        let splitUrl = (url.pathname).split('/');
                        let splitTargetUrl = (actionUrl.pathname).split('/');

                        if(splitUrl[1] === splitTargetUrl[1]){
                            client.navigate(actionUrl.href);
                            return client.focus();
                        }
                    }
                }
    
                console.log(`Open new tab`);
                console.log(actionUrl.href);
                console.log(actionUrl);
                // Window didn't found, open new window
                clients.openWindow(actionUrl.href);
            }
        }
    })());

    console.log('============= End Notification Action =============');
}, false);