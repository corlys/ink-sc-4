/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/marketplace';
import type * as ReturnTypes from '../types-returns/marketplace';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* getMarketFee
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMarketFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMarketFee", [], __options, (result) => { return handleReturnType(result, getTypeDescription(7, 'marketplace')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { void }
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "marketplace");
		}, [], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { void }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "marketplace");
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(12, 'marketplace')); });
	}

	/**
	* run
	*
	* @param { ArgumentTypes.Detail } detail,
	* @param { Array<(number | string | BN)> } sigDetail,
	* @returns { void }
	*/
	"run" (
		detail: ArgumentTypes.Detail,
		sigDetail: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "inventoryManagement::run", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "marketplace");
		}, [detail, sigDetail], __options);
	}

	/**
	* hash
	*
	* @param { ArgumentTypes.Detail } detail,
	* @returns { void }
	*/
	"hash" (
		detail: ArgumentTypes.Detail,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "inventoryManagement::hash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "marketplace");
		}, [detail], __options);
	}

	/**
	* verify
	*
	* @param { ArgumentTypes.Detail } detail,
	* @param { ArgumentTypes.AccountId } signer,
	* @param { Array<(number | string | BN)> } signature,
	* @returns { void }
	*/
	"verify" (
		detail: ArgumentTypes.Detail,
		signer: ArgumentTypes.AccountId,
		signature: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "inventoryManagement::verify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "marketplace");
		}, [detail, signer, signature], __options);
	}

}