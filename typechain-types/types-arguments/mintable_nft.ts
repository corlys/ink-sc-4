import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface Error {
	fundIsNotEnough ? : Array<(number | string | BN)>,
	withdrawFailed ? : Array<(number | string | BN)>,
	mintAmountExceed ? : Array<(number | string | BN)>,
	psp34Error ? : PSP34Error,
	ownableError ? : OwnableError,
	custom ? : Array<(number | string | BN)>
}

export class ErrorBuilder {
	static FundIsNotEnough(value: Array<(number | string | BN)>): Error {
		return {
			fundIsNotEnough: value,
		};
	}
	static WithdrawFailed(value: Array<(number | string | BN)>): Error {
		return {
			withdrawFailed: value,
		};
	}
	static MintAmountExceed(value: Array<(number | string | BN)>): Error {
		return {
			mintAmountExceed: value,
		};
	}
	static PSP34Error(value: PSP34Error): Error {
		return {
			psp34Error: value,
		};
	}
	static OwnableError(value: OwnableError): Error {
		return {
			ownableError: value,
		};
	}
	static Custom(value: Array<(number | string | BN)>): Error {
		return {
			custom: value,
		};
	}
}

export interface PSP34Error {
	custom ? : Array<(number | string | BN)>,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : Array<(number | string | BN)>
}

export class PSP34ErrorBuilder {
	static Custom(value: Array<(number | string | BN)>): PSP34Error {
		return {
			custom: value,
		};
	}
	static SelfApprove(): PSP34Error {
		return {
			selfApprove: null,
		};
	}
	static NotApproved(): PSP34Error {
		return {
			notApproved: null,
		};
	}
	static TokenExists(): PSP34Error {
		return {
			tokenExists: null,
		};
	}
	static TokenNotExists(): PSP34Error {
		return {
			tokenNotExists: null,
		};
	}
	static SafeTransferCheckFailed(value: Array<(number | string | BN)>): PSP34Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export interface Id {
	u8 ? : (number | string | BN),
	u16 ? : (number | string | BN),
	u32 ? : (number | string | BN),
	u64 ? : (number | string | BN),
	u128 ? : (string | number | BN),
	bytes ? : Array<(number | string | BN)>
}

export class IdBuilder {
	static U8(value: (number | string | BN)): Id {
		return {
			u8: value,
		};
	}
	static U16(value: (number | string | BN)): Id {
		return {
			u16: value,
		};
	}
	static U32(value: (number | string | BN)): Id {
		return {
			u32: value,
		};
	}
	static U64(value: (number | string | BN)): Id {
		return {
			u64: value,
		};
	}
	static U128(value: (string | number | BN)): Id {
		return {
			u128: value,
		};
	}
	static Bytes(value: Array<(number | string | BN)>): Id {
		return {
			bytes: value,
		};
	}
}

