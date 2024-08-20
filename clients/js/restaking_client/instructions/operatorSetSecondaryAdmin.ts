/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { JITO_RESTAKING_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getOperatorAdminRoleDecoder,
  getOperatorAdminRoleEncoder,
  type OperatorAdminRole,
  type OperatorAdminRoleArgs,
} from '../types';

export const OPERATOR_SET_SECONDARY_ADMIN_DISCRIMINATOR = 20;

export function getOperatorSetSecondaryAdminDiscriminatorBytes() {
  return getU8Encoder().encode(OPERATOR_SET_SECONDARY_ADMIN_DISCRIMINATOR);
}

export type OperatorSetSecondaryAdminInstruction<
  TProgram extends string = typeof JITO_RESTAKING_PROGRAM_PROGRAM_ADDRESS,
  TAccountOperator extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountNewAdmin extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountOperator extends string
        ? WritableAccount<TAccountOperator>
        : TAccountOperator,
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountNewAdmin extends string
        ? ReadonlyAccount<TAccountNewAdmin>
        : TAccountNewAdmin,
      ...TRemainingAccounts,
    ]
  >;

export type OperatorSetSecondaryAdminInstructionData = {
  discriminator: number;
  operatorAdminRole: OperatorAdminRole;
};

export type OperatorSetSecondaryAdminInstructionDataArgs = {
  operatorAdminRole: OperatorAdminRoleArgs;
};

export function getOperatorSetSecondaryAdminInstructionDataEncoder(): Encoder<OperatorSetSecondaryAdminInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['operatorAdminRole', getOperatorAdminRoleEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: OPERATOR_SET_SECONDARY_ADMIN_DISCRIMINATOR,
    })
  );
}

export function getOperatorSetSecondaryAdminInstructionDataDecoder(): Decoder<OperatorSetSecondaryAdminInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['operatorAdminRole', getOperatorAdminRoleDecoder()],
  ]);
}

export function getOperatorSetSecondaryAdminInstructionDataCodec(): Codec<
  OperatorSetSecondaryAdminInstructionDataArgs,
  OperatorSetSecondaryAdminInstructionData
> {
  return combineCodec(
    getOperatorSetSecondaryAdminInstructionDataEncoder(),
    getOperatorSetSecondaryAdminInstructionDataDecoder()
  );
}

export type OperatorSetSecondaryAdminInput<
  TAccountOperator extends string = string,
  TAccountAdmin extends string = string,
  TAccountNewAdmin extends string = string,
> = {
  operator: Address<TAccountOperator>;
  admin: TransactionSigner<TAccountAdmin>;
  newAdmin: Address<TAccountNewAdmin>;
  operatorAdminRole: OperatorSetSecondaryAdminInstructionDataArgs['operatorAdminRole'];
};

export function getOperatorSetSecondaryAdminInstruction<
  TAccountOperator extends string,
  TAccountAdmin extends string,
  TAccountNewAdmin extends string,
>(
  input: OperatorSetSecondaryAdminInput<
    TAccountOperator,
    TAccountAdmin,
    TAccountNewAdmin
  >
): OperatorSetSecondaryAdminInstruction<
  typeof JITO_RESTAKING_PROGRAM_PROGRAM_ADDRESS,
  TAccountOperator,
  TAccountAdmin,
  TAccountNewAdmin
> {
  // Program address.
  const programAddress = JITO_RESTAKING_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    operator: { value: input.operator ?? null, isWritable: true },
    admin: { value: input.admin ?? null, isWritable: false },
    newAdmin: { value: input.newAdmin ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.operator),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.newAdmin),
    ],
    programAddress,
    data: getOperatorSetSecondaryAdminInstructionDataEncoder().encode(
      args as OperatorSetSecondaryAdminInstructionDataArgs
    ),
  } as OperatorSetSecondaryAdminInstruction<
    typeof JITO_RESTAKING_PROGRAM_PROGRAM_ADDRESS,
    TAccountOperator,
    TAccountAdmin,
    TAccountNewAdmin
  >;

  return instruction;
}

export type ParsedOperatorSetSecondaryAdminInstruction<
  TProgram extends string = typeof JITO_RESTAKING_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    operator: TAccountMetas[0];
    admin: TAccountMetas[1];
    newAdmin: TAccountMetas[2];
  };
  data: OperatorSetSecondaryAdminInstructionData;
};

export function parseOperatorSetSecondaryAdminInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedOperatorSetSecondaryAdminInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      operator: getNextAccount(),
      admin: getNextAccount(),
      newAdmin: getNextAccount(),
    },
    data: getOperatorSetSecondaryAdminInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}