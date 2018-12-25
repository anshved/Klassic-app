import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


exports.newSubscriberNotification = functions.database.ref('stockList/{itemID}')
.onWrite(async (change, context) => {

    const itemID = context.params.itemID;

    const item = change.after.val();

    const payload = {
        notification: {
            title: 'Item is Edited',
            body: 'Item Name: '+item.itemName
        }
    }

    const tokensSnapshot = await admin.database().ref('/notification-tokens').once('value');

    const tokens = Object.keys(tokensSnapshot.val());

    return admin.messaging().sendToDevice(tokens, payload);

})
