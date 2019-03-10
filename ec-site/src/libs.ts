import * as bip32 from 'bip32';
import { networks, payments } from 'bitcoinjs-lib';

const extPubKeys = [
    "tpubD6NzVbkrYhZ4YRFt1EaUDtnGvAKWMPjmKuXgQ2Dj4bynvLEbGZcGVfbH6Pc8rdpqXxSzXzAgHqq1oSKLzMozUihPumP7mdxtbSuYaDFsKkX",
    "tpubD6NzVbkrYhZ4XdqgPVgvwKxQr8TtFERmnnZgjrnZ6LRSVdcfvoZixh42hWnuLTPd9t5x1qFDkjbmXRoijJDV8vRBCqscpuxFKjgpMk6zW7o",
    "tpubD6NzVbkrYhZ4WsfMdmUWeFcZEEQusJAQ7xqDkFrPqubHGs3SbqMLJFN75swZNyjG1G2ijmL9t2TAW5oip88srgENh3Uxm7oTZjDkFLsaxc9"
];

export const generatePayment = (orderId: number):string => {
    const pubkeys = extPubKeys.map((tpub) => {
        return bip32.fromBase58(tpub, networks.testnet).derive(orderId).publicKey;
    });
    //p2shはクライアント互換性のためwrapしておく。
    //SegWitに対応したクライアントはまだ普及しきっていない
    return payments.p2sh({
        network: networks.testnet,
        redeem: payments.p2wsh({
            network: networks.testnet,
            redeem: payments.p2ms({
                network: networks.testnet,
                m:2,
                pubkeys,
            }),
        }),
    }).address;
}
