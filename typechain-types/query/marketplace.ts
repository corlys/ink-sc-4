/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/marketplace';
import type * as ReturnTypes from '../types-returns/marketplace';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* getMarketFee
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMarketFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMarketFee", [], __options , (result) => { return handleReturnType(result, getTypeDescription(7, 'marketplace')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'marketplace')); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'marketplace')); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'marketplace')); });
	}

	/**
	* run
	*
	* @param { ArgumentTypes.Detail } detail,
	* @param { Array<(number | string | BN)> } sigDetail,
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"run" (
		detail: ArgumentTypes.Detail,
		sigDetail: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "inventoryManagement::run", [detail, sigDetail], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'marketplace')); });
	}

	/**
	* hash
	*
	* @param { ArgumentTypes.Detail } detail,
	* @returns { Result<Array<number>, ReturnTypes.LangError> }
	*/
	"hash" (
		detail: ArgumentTypes.Detail,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<number>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "inventoryManagement::hash", [detail], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'marketplace')); });
	}

	/**
	* verify
	*
	* @param { ArgumentTypes.Detail } detail,
	* @param { ArgumentTypes.AccountId } signer,
	* @param { Array<(number | string | BN)> } signature,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"verify" (
		detail: ArgumentTypes.Detail,
		signer: ArgumentTypes.AccountId,
		signature: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "inventoryManagement::verify", [detail, signer, signature], __options , (result) => { return handleReturnType(result, getTypeDescription(16, 'marketplace')); });
	}

}