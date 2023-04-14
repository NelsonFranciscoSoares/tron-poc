// eslint-disable-next-line @typescript-eslint/no-var-requires
const TronWeb = require('tronweb');
import { Account } from './types/account.d';
import * as dotenv from 'dotenv';
dotenv.config();

const tronWeb = new TronWeb({
    fullHost: process.env.TRON_BLOCKCHAIN_NETWORK,
    headers: {"TRON-PRO-API-KEY": process.env.TRON_GRID_API_KEY }
});

const createAccount = async function (){
    const account = await tronWeb.createAccount();
    console.log("Account data: ", account);
};

const getAccountDetails = async function() {
    const account: Account = await tronWeb.trx.getAccount('TRCyQz9WimicH2jRNpmhuW82auYC4L91Lz');
    console.log("Account data - balance: ", tronWeb.fromSun(account.balance));
}

const createTransaction = async function(fromAddress: string, toAddress: string, value: number) : Promise<any>{
    const transactionData = await tronWeb.transactionBuilder.sendTrx(toAddress, tronWeb.toSun(value), fromAddress);
    console.log('UnsignedTxn: ', JSON.stringify(transactionData));
    return transactionData;
}

const signTransaction = async function (unsignedTxn: any, privateKey: string) : Promise<any>{
     const signedTxn = await tronWeb.trx.sign(unsignedTxn, privateKey);
     console.log('SignedTxn: ', JSON.stringify(signedTxn));
     return signedTxn;
}

const sendRawTransaction = async function(signedTxn: any):Promise<any>{
    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);
    console.log('Receipt: ', JSON.stringify(receipt));
    return receipt;
}

const convertHexAddressToBase58 = function(hexAddress:string): any {
    return tronWeb.address.fromHex(hexAddress);
}

async function createAndSignTxn(){
    const unsignedTxn = await createTransaction('TRCyQz9WimicH2jRNpmhuW82auYC4L91Lz','TUhopvB5mYRDabtzcqXWfYe1NuxMki5yt9', 10);
    const signedTxn = await signTransaction(unsignedTxn, '1dc74218ba8fa430bafb3e99444ac464e63417a70ded48f17efef9819e0cb0bc');
    const receipt = await sendRawTransaction(signedTxn);
}

createAndSignTxn();





//console.log(convertHexAddressToBase58('41d3136787e667d1e055d2cd5db4b5f6c880563049'));