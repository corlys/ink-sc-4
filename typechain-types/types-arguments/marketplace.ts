import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export type Detail = {
	inventoryId: (string | number | BN),
	opcode: (number | string | BN),
	caller: AccountId,
	price: (string | number | BN)
}

